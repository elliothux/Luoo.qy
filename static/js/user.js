const request = require('request-promise-native').defaults({jar: true});
const config = require('./config');
const tough = require('tough-cookie');


const cookieJar = request.jar();


async function login() {
    const URL = 'http://www.luoo.net/';
    const resCookie = (await request.head(URL))['set-cookie'][0].split('; ')[0];
    config.set('cookies', [resCookie]);
    // console.log(await request({
    //     method: 'GET',
    //     uri: URL,
    //     resolveWithFullResponse: true
    // }));

    const cookie = new tough.Cookie({
        key: "some_key",
        value: "some_value",
        domain: 'api.mydomain.com',
    })


    const option = {
        method: 'POST',
        uri: URL,
        body: {
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
            'Cookie': config.get('cookies').join(' '),
            'DNT': 1,
            'Connection': 'keep-alive'
        },
        resolveWithFullResponse: true
    };
}


login().then(a => {});