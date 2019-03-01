import * as path from "path";
import * as fs from "fs";
import { UserInfo, UserSettings } from "../types";
import { runPath } from "../utils/env";

let info: Maybe<UserInfo> = null;
const infoPath = path.resolve(runPath, "./dist/user/info.json");

const fsOptions = { encoding: "utf-8" };

function readUserInfoFromFile(): UserInfo {
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
  const iInfo = JSON.parse(fs.readFileSync(infoPath, fsOptions)) as UserInfo;
  iInfo.settings = { ...defaultSettings, ...iInfo.settings };
  return { ...defaultInfo, ...iInfo } as UserInfo;
}

function writeUserInfoToFile(info: UserInfo): void {
  fs.writeFileSync(infoPath, JSON.stringify(info, null, 4), fsOptions);
}

function getUserInfos(): UserInfo {
  return info || readUserInfoFromFile();
}

function setUserInfo(key: keyof UserInfo, value: string): void {
  if (key === "settings") {
    throw new Error("Using setUserSetting");
  }
  const info = getUserInfos();
  info[key] = value;
  writeUserInfoToFile(info);
}

function getUserInfo(key: keyof UserInfo): Maybe<string> {
  if (key === "settings") {
    throw new Error("Using getUserSetting");
  }
  const info = getUserInfos();
  return (info[key] as string) || null;
}

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

export { setUserInfo, getUserInfo, setUserSetting, getUserSetting };
