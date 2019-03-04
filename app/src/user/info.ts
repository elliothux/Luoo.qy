import * as path from "path";
import * as fs from "fs";
import { UserCollections, UserInfo, UserSettings } from "../types";
import { isElectron, runPath } from "../utils";
import { aseDecode, aseEncode } from "./crypto";

let info: Maybe<UserInfo> = null;
const infoPath = path.resolve(
  runPath,
  isElectron ? "./dist/user/info.json" : "./static/user/info.json"
);

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
  fs.writeFileSync(
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
  writeUserInfoToFile({
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
  if (key === "settings") {
    throw new Error("Using setUserSetting");
  }
  const info = getUserInfos();
  writeUserInfoToFile(info);
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
function setUserInfos(infos: UserInfoParams): void {
  const info = getUserInfos();
  writeUserInfoToFile({
    ...info,
    ...infos
  });
}

function getUserInfo(key: keyof UserInfo): Maybe<string> {
  if (key === "settings") {
    throw new Error("Using getUserSetting");
  }
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

function setUserCollectionVols(vols: number[]): void {
  const collections = getUserCollections();
  collections.vols = vols;
  writeUserInfoToFile(info);
}

function setUserCollectionTracks(tracks: number[]): void {
  const collections = getUserCollections();
  collections.tracks = tracks;
  writeUserInfoToFile(info);
}

function setUserCollectionArticles(articles: number[]): void {
  const collections = getUserCollections();
  collections.articles = articles;
  writeUserInfoToFile(info);
}

/*
@desc User settings
 */
function setUserSetting(key: keyof UserSettings, value: boolean): void {
  const info = getUserInfos();
  const { settings } = info;
  settings[key] = value;
  writeUserInfoToFile(info);
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
  getUserCollections,
  setUserCollectionVols,
  setUserCollectionTracks,
  setUserCollectionArticles,
  setUserSetting,
  getUserSetting,
  clearUserInfos
};
