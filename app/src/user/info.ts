import * as path from "path";
import * as fs from "fs";
import { UserCollections, UserInfo, UserSettings } from "../types";
import { isElectron, runPath, aseEncode, aseDecode } from "../utils";

const infoPath = path.resolve(
  runPath,
  isElectron ? "./dist/user/info.json" : "./static/user/info.json"
);
let info: Maybe<UserInfo> = readUserInfoFromFile();

const defaultInfo = {
  mail: null,
  password: null,
  name: null,
  id: null,
  avatar: null,
  session: null,
  lult: null
};
const defaultSettings = {
  autoUpdate: true,
  autoSync: true
};
const defaultCollections = {
  tracks: [],
  vols: [],
  articles: []
};
const fsOptions = { encoding: "utf-8" };

/*
@desc Sync user info with config.json
 */
function readUserInfoFromFile(): UserInfo {
  const iInfo = JSON.parse(fs.readFileSync(infoPath, fsOptions)) as UserInfo;
  iInfo.settings = { ...defaultSettings, ...iInfo.settings };

  if (iInfo.mail) {
    iInfo.mail = aseDecode(iInfo.mail);
  }
  if (iInfo.password) {
    iInfo.password = aseDecode(iInfo.password);
  }

  return { ...defaultInfo, ...iInfo } as UserInfo;
}

function writeUserInfoToFile(info: UserInfo): void {
  const { mail, password } = info;
  return fs.writeFileSync(
    infoPath,
    JSON.stringify(
      {
        ...info,
        mail: mail ? aseEncode(mail) : null,
        password: password ? aseEncode(password) : null
      },
      null,
      4
    ),
    fsOptions
  );
}

function clearUserInfos(): void {
  return writeUserInfoToFile({
    ...defaultInfo,
    settings: defaultSettings,
    collections: defaultCollections
  });
}

/*
@desc User basic info
 */
function getUserInfos(): UserInfo {
  return info || readUserInfoFromFile();
}

function setUserInfo(key: keyof UserInfo, value: string): void {
  const info = getUserInfos();
  return writeUserInfoToFile(info);
}

interface UserInfoParams {
  mail?: string;
  password?: string;
  id?: number;
  name?: string;
  avatar?: string;
  session?: string;
  lult?: string;
}
function setUserInfos(infos: UserInfoParams): UserInfo {
  const info = getUserInfos();
  writeUserInfoToFile({
    ...info,
    ...infos
  });
  return info;
}

function getUserInfo(key: keyof UserInfo): Maybe<string> {
  const info = getUserInfos();
  return (info[key] as string) || null;
}

/*
@desc User collections
 */
function getUserCollections(): UserCollections {
  const info = getUserInfos();
  const { collections } = info;
  return collections;
}

function getUserLikedVolIds(): number[] {
  const { vols } = getUserCollections();
  return vols;
}

function getUserLikedTrackIds(): number[] {
  const { tracks } = getUserCollections();
  return tracks;
}

function getUserLikedArticleIds(): number[] {
  const { articles } = getUserCollections();
  return articles;
}

function setUserLikedVolIds(vols: number[]): void {
  const collections = getUserCollections();
  collections.vols = vols;
  return writeUserInfoToFile(info as UserInfo);
}

function setUserLikedTrackIds(tracks: number[]): void {
  const collections = getUserCollections();
  collections.tracks = tracks;
  return writeUserInfoToFile(info as UserInfo);
}

function setUserLikedArticleIds(articles: number[]): void {
  const collections = getUserCollections();
  collections.articles = articles;
  return writeUserInfoToFile(info as UserInfo);
}

/*
@desc User settings
 */
function setUserSetting(key: keyof UserSettings, value: boolean): void {
  const info = getUserInfos();
  const { settings } = info;
  settings[key] = value;
  return writeUserInfoToFile(info);
}

function getUserSetting(key: keyof UserSettings): boolean {
  const info = getUserInfos();
  const { settings } = info;
  return !!settings[key];
}

export {
  setUserInfo,
  setUserInfos,
  getUserInfo,
  getUserInfos,
  getUserCollections,
  getUserLikedVolIds,
  getUserLikedTrackIds,
  getUserLikedArticleIds,
  setUserLikedVolIds,
  setUserLikedTrackIds,
  setUserLikedArticleIds,
  setUserSetting,
  getUserSetting,
  clearUserInfos
};
