const request = require('request-promise-native').defaults({jar: true});
const config = require('./config');
const tough = require('tough-cookie');


const cookieJar = request.jar();


async function login() {
    let resCookie = _formatCookie((await request.head('http://www.luoo.net/'))['set-cookie'][0]);
    let cookie = new tough.Cookie({
        key: "LUOOSESS",
        value: resCookie.LUOOSESS,
        domain: resCookie.domain,
        path: resCookie.path
    });
    config.set({ cookies: [ cookie ] });
    cookieJar.setCookie(cookie, 'http://www.luoo.net');

    const option = {
        method: 'POST',
        uri: 'http://www.luoo.net/login/',
        jar: cookieJar,
        form: {
            name: '2458554791@qq.com',
            password: 'hqy5345',
            remember: 'on'
        },
        headers: {
            'Host': 'www.luoo.net',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'zh,en-US;q=0.7,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': 'http://www.luoo.net/',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Length': '41',
            'DNT': 1,
            'Connection': 'keep-alive'
        },
        gzip: true,
        resolveWithFullResponse: true
    };

    resCookie = _formatCookie((await request(option)).headers['set-cookie'][0]);
    cookie = new tough.Cookie({
        key: "LUOOSESS",
        value: resCookie.LUOOSESS,
        domain: resCookie.domain,
        path: resCookie.path
    });
    config.set({ cookies: [ cookie ] });
    cookieJar.setCookie(cookie, 'http://www.luoo.net');
    // console.log(resCookie);

    console.log(JSON.parse(await request({
        method: 'GET',
        uri: 'http://www.luoo.net/login/user',
        jar: cookieJar,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,fr;q=0.2',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            // 'Cookie': `LUOOSESS=gq6icvesh4601e5jl73gbgd2p6`,
            'Host': 'www.luoo.net',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        },
        gzip: true
    })))
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


login().then(a => {});