const packager = require('electron-packager');
const open = require('open');
const path = require('path');

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
  open(`file://${appPaths}`);
}

launch().then(() => {
  console.log('Done');
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
