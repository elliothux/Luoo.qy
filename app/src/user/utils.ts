import { getHeader, RequestParams } from "../utils";
import {getUserInfo, setUserInfo, setUserInfos} from "./info";

const baseHeaders = {
  "Accept-Encoding": "gzip, deflate",
  "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,fr;q=0.2",
  "Cache-Control": "max-age=0",
  Connection: "keep-alive",
  Host: "www.luoo.net",
  Referer: "http://www.luoo.net/",
  "Save-Data": "on",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
};


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

async function login(mail: string, password: string): Promise<void> {
  const session = getUserInfo("session") || (await getSessionFromCGI());
  if (!session) {
    throw new Error(`Get session failed`);
  }
  setUserInfo('session', session);

  const lult = getUserInfo("lult") || await getLultFromCGI(mail, password, session);
  if (!lult) {
    throw new Error(`Get lult failed`);
  }
  setUserInfos({
    lult,
    mail,
    password
  });
}

login("534559077@qq.com", "hqy5345")
  .then((i) => {
    console.log(i);
    process.exit()
  })
  .catch(e => {
    console.error(e);
    process.exit();
  });
