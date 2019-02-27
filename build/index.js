const packager = require('electron-packager');
const open = require('open');
const path = require('path');
// const fs = require('fs');
// const cp = require('child_process');

async function launch() {
  const appPaths = await packager({
    dir: path.join(__dirname, '../'),
    out: path.join(__dirname, '../out'),
    overwrite: true,
    osxSign: false,
    icon: path.join(__dirname, './icon.icns'),
    ignore: [
      /^\/app/,
      /^\/build/,
      /^\/design/,
      /^\/node_modules/,
      /^\/out/,
      /^\/static/,
      /^\/view/,
      /\/README/,
      /\/yarn/,
      /\/.git/,
      /\/.eslint/,
      /\/.idea/,
      /\/.npmrc/,
      /\/.compilerc/,
      /\/.cache/,
    ],
    download: {
      mirror: 'http://npm.taobao.org/mirrors/electron/',
    },
  });
  console.log(`Pack done at: ${appPaths.join('\n')}`);

  // const toPath = path.join(appPaths[0], './luoo.qy.app/Contents/Resources/app/');
  // fs.copyFileSync(
  //   path.join(__dirname, '../package.json'),
  //   path.join(toPath, './package.json'),
  // );
  // console.log('Install node_modules');
  // cp.execSync(`cd ${toPath}; tnpm i --production`);
  open(`file://${appPaths}`);
}

launch().then(() => {
  console.log('Done');
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
