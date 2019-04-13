import * as path from 'path';
import * as fs from 'fs';
import { app } from 'electron';

const baseHeaders = {
  // "Accept-Encoding": "gzip, deflate",
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

function unique<T>(array: T[]): T[] {
  const map: {
    [key: string]: T;
  } = {};
  array.forEach(i => {
    const key = String(i);
    if (map[key]) return;
    map[key] = i;
  });
  return Object.keys(map).map(key => map[key]);
}

function getDefaultDownloadFolder(): string {
  const tryNames: string[] = [
      'music',
      'downloads',
      'home'
  ];
  let basePath: string;
  for (let name of tryNames) {
    try {
      basePath = app.getPath(name)
    } catch (e) {}
  }

  const target = path.join(basePath, './luoo_downloads');
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  return target;
}

export { baseHeaders, unique, getDefaultDownloadFolder };
