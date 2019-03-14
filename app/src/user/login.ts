import { getHeader, getJSON, RequestParams } from "../utils";
import { clearUserInfo, getUserInfo, setUserInfo } from "./info";
import { baseHeaders } from "./utils";
import { UserInfo } from "../types";

function getCookieValueFromHeaders(
  headers: Maybe<string[]>,
  key: string
): Maybe<string> {
  const reg = new RegExp(key);
  const header = (headers || []).find(i => reg.test(i));
  if (!header) {
    return null;
  }
  return header.split(";")[0].replace(`${key}=`, "");
}

async function getSessionFromCGI(): Promise<Maybe<string>> {
  const params = {
    url: "http://www.luoo.net/login/dialog",
    headers: baseHeaders
  } as RequestParams;
  const headers = await getHeader(params, "set-cookie");
  return getCookieValueFromHeaders(headers, "LUOOSESS");
}

async function getLultFromCGI(
  mail: string,
  password: string,
  session: string
): Promise<Maybe<string>> {
  const params = {
    url: "http://www.luoo.net/login/",
    method: "POST",
    form: {
      name: mail,
      password: password,
      remember: "on"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      DNT: 1,
      ...baseHeaders
    },
    cookies: {
      LUOOSESS: session
    }
  } as RequestParams;
  const headers = await getHeader(params, "set-cookie");
  return getCookieValueFromHeaders(headers, "lult");
}

interface BasicUserInfo {
  name: string;
  id: number;
  avatar: string;
}
interface BasicUserInfoResponse {
  status: number;
  msg: string;
  data: {
    uid: string;
    user_name: string;
    user_avatar: string;
  };
}
async function getUserInfoFromCGI(
  session: string,
  lult: string
): Promise<Maybe<BasicUserInfo>> {
  const response = await getJSON<BasicUserInfoResponse>({
    url: "http://www.luoo.net/login/user",
    cookies: {
      LUOOSESS: session,
      lult
    }
  });
  if (!response || response.status !== 1) {
    throw new Error(`Get user info from CGI failed`);
  }
  const {
    data: { uid, user_avatar: avatar, user_name: name }
  } = response;
  return {
    id: parseInt(uid, 10),
    name,
    avatar
  } as BasicUserInfo;
}

async function login(mail: string, password: string): Promise<UserInfo> {
  const { session: iSession, lult: iLult } = getUserInfo();
  const session: Maybe<string> = iSession || (await getSessionFromCGI());
  if (!session) {
    throw new Error(`Get session failed`);
  }

  const lult: Maybe<string> =
    iLult || (await getLultFromCGI(mail, password, session));
  if (!lult) {
    throw new Error(`Get lult failed`);
  }

  const basicInfo = await getUserInfoFromCGI(session, lult);
  if (!basicInfo) {
    throw new Error(`Get user info failed`);
  }

  return setUserInfo({
    session,
    lult,
    mail,
    password,
    ...basicInfo
  });
}

function logout(): void {
  return clearUserInfo();
}

export { login, logout };
