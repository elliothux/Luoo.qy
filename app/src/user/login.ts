import { getHeader, getJSON, RequestParams } from "../utils";
import {clearUserInfos, getUserInfo, setUserInfos} from "./info";
import {baseHeaders} from "./utils";

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

async function login(mail: string, password: string): Promise<void> {
    const session: Maybe<string> =
        getUserInfo("session") || (await getSessionFromCGI());
    if (!session) {
        throw new Error(`Get session failed`);
    }

    const lult: Maybe<string> =
        getUserInfo("lult") || (await getLultFromCGI(mail, password, session));
    if (!lult) {
        throw new Error(`Get lult failed`);
    }

    const basicInfo = await getUserInfoFromCGI(session, lult);
    if (!basicInfo) {
        throw new Error(`Get user info failed`);
    }

    setUserInfos({
        lult,
        mail,
        password,
        ...basicInfo
    });
}

function logout() {
    clearUserInfos();
}

// login("534559077@qq.com", "hqy5345")
//     .then(i => {
//         console.log(i);
//         process.exit();
//     })
//     .catch(e => {
//         console.error(e);
//         process.exit();
//     });

export {
    login,
    logout
}
