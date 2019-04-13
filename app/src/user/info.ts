import * as path from "path";
import * as fs from "fs";
import { UserData, UserInfo, UserSettings } from "../types";
import { isElectron, runPath, aseEncode, aseDecode } from "../utils";
import {getDefaultDownloadFolder} from "./utils";

const defaultUserData: UserData = {
  info: {
    mail: null,
    password: null,
    id: null,
    name: null,
    avatar: null,
    session: null,
    lult: null
  },
  settings: {
    autoUpdate: true,
    pushNotifications: true,
    downloadFolder: getDefaultDownloadFolder()
  },
  collections: {
    tracks: [],
    vols: [],
    articles: []
  }
};
const fsOptions = { encoding: "utf-8" };
const infoPath = path.resolve(
  runPath,
  isElectron ? "./dist/user/info.json" : "./static/user/info.json"
);
const userData: UserData = readUserInfoFromFile();
/*
@desc Sync user info with config.json
 */
function readUserInfoFromFile(): UserData {
  const data = JSON.parse(fs.readFileSync(infoPath, fsOptions)) as UserData;
  data.info = { ...defaultUserData.info, ...data.info };
  data.settings = { ...defaultUserData.settings, ...data.settings };
  data.collections = { ...defaultUserData.collections, ...data.collections };

  data.info.mail = aseDecode(data.info.mail);
  data.info.password = aseDecode(data.info.password);

  return data;
}

function writeUserDataToFile(data?: UserData): void {
  const iData = data || userData;
  const { info } = iData;
  const content = JSON.stringify(
    {
      ...iData,
      info: {
        ...info,
        mail: aseEncode(info.mail),
        password: aseEncode(info.password)
      }
    } as UserData,
    null,
    4
  );

  return fs.writeFileSync(infoPath, content, fsOptions);
}

function clearUserInfo(): void {
  return writeUserDataToFile(defaultUserData);
}

/*
@desc User basic info
 */

interface UserInfoParams {
  mail?: string;
  password?: string;
  id?: number;
  name?: string;
  avatar?: string;
  session?: string;
  lult?: string;
}
function setUserInfo(info: UserInfoParams): UserInfo {
  userData.info = {
    ...userData.info,
    ...info
  } as UserInfo;
  writeUserDataToFile();
  return userData.info;
}

function getUserInfo(): UserInfo {
  return userData.info;
}

/*
@desc User collections
 */

function getUserLikedVolIds(): number[] {
  const { vols } = userData.collections;
  return vols;
}

function getUserLikedTrackIds(): number[] {
  const { tracks } = userData.collections;
  return tracks;
}

function getUserLikedArticleIds(): number[] {
  const { articles } = userData.collections;
  return articles;
}

function setUserLikedVolIds(vols: number[]): void {
  const { collections } = userData;
  collections.vols = vols;
  return writeUserDataToFile();
}

function setUserLikedTrackIds(tracks: number[]): void {
  const { collections } = userData;
  collections.tracks = tracks;
  return writeUserDataToFile();
}

function setUserLikedArticleIds(articles: number[]): void {
  const { collections } = userData;
  collections.articles = articles;
  return writeUserDataToFile();
}

/*
@desc User settings
 */
function setUserSetting(key: keyof UserSettings, value: boolean | string): UserSettings {
  const { settings } = userData;
  settings[key] = value;
  writeUserDataToFile();
  return getUserSettings();
}

function getUserSettings(): UserSettings{
  return userData.settings;
}

export {
  getUserInfo,
  setUserInfo,
  getUserLikedVolIds,
  getUserLikedTrackIds,
  getUserLikedArticleIds,
  setUserLikedVolIds,
  setUserLikedTrackIds,
  setUserLikedArticleIds,
  setUserSetting,
  getUserSettings,
  clearUserInfo
};
