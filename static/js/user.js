const request = require('request-promise-native').defaults({jar: true});
const fs = require('node-fs-extra');
const path = require('path');
const config = require('./config');
const tough = require('tough-cookie');


const cookieJar = request.jar();
const headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,fr;q=0.2',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Host': 'www.luoo.net',
    'Save-Data': 'on',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
};


async function login() {
    await _getLoginCookie();
    const resCookie = _formatCookie((await request({
        method: 'POST',
        uri: 'http://www.luoo.net/login/',
        jar: cookieJar,
        form: {
            name: config.get('mail'),
            password: config.get('password'),
            remember: 'on'
        },
        headers: Object.assign(headers, {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Referer': 'http://www.luoo.net/',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'DNT': 1,
        }),
        gzip: true,
        resolveWithFullResponse: true
    })).headers['set-cookie'][0]);

    cookie = new tough.Cookie({
        key: "LUOOSESS",
        value: resCookie.LUOOSESS,
        domain: resCookie.domain,
        path: resCookie.path
    });
    config.set({ cookie: cookie });
    cookieJar.setCookie(cookie, 'http://www.luoo.net');

    await _getUserData(JSON.parse(await request({
        method: 'GET',
        uri: 'http://www.luoo.net/login/user',
        jar: cookieJar,
        headers: Object.assign(headers, {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }),
        gzip: true
    })).data)
}


async function _getUserData(data) {
    typeof data === 'string' &&
        (data = JSON.parse(data));
    console.log(data)
    config.set({
        name: data.user_name,
        id: data.uid,
        avatar: data.user_avatar
    });
    await new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: data.user_avatar,
            jar: cookieJar,
        }).pipe(
            fs.createWriteStream(
                path.join(__dirname, '../../user/avatar.jpg'))
        ).on('close', resolve)
    })
}


async function _getLoginCookie() {
    let resCookie = _formatCookie((await request.head('http://www.luoo.net/'))['set-cookie'][0]);
    let cookie = new tough.Cookie({
        key: "LUOOSESS",
        value: resCookie.LUOOSESS,
        domain: resCookie.domain,
        path: resCookie.path
    });
    config.set({ cookie: cookie });
}


function _formatCookie(cookies) {
    if (typeof cookies === 'string')
        return _format(cookies);
    for (let i of cookies.keys())
        cookies[i] = _format(cookies[i]);
    return cookies;

    function _format(cookie) {
        const result = { };
        for (let each of cookie.split('; '))
            result[each.split('=')[0]] = each.split('=')[1];
        return result
    }
}


data = `{ "uid": "260625",
  "user_name": "抖腿侠",
  "user_avatar": "http://img-cdn2.luoo.net/pics/avatars/u2606251453952663.jpg!/fwfh/128x128" }
`;
// login().then(a => {}).catch(e => console.error(e))