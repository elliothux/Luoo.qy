const content = document.getElementById('content');
const background = document.getElementById('background');
const downloadButton = document.getElementById('download');



document.getElementById('github').addEventListener('click', () => {
    require('electron').shell.openExternal("https://github.com/HuQingyang/Luoo.qy");
});


// 设置背景
window.addEventListener('load', () => {
    let index = 0;
    setInterval(() => {
        index === 3 ? index = 0 : index++;
        const backgrounds = [
            'http://ojt6rsn4s.bkt.clouddn.com/bg1.jpg',
            'http://ojt6rsn4s.bkt.clouddn.com/bg2.jpg',
            'http://ojt6rsn4s.bkt.clouddn.com/bg3.jpg',
            'http://ojt6rsn4s.bkt.clouddn.com/bg4.jpg'
        ];
        background.style.backgroundImage = `url('${backgrounds[index]}')`
    }, 10000)
});


// 加载完成
window.addEventListener('load', () => {
    document.getElementById('content').style.opacity = 1;
    document.getElementById('logo').className = 'loaded';
    document.getElementById('button').className = 'loaded';
    document.getElementById('desc').className = 'loaded';
});


// 点击按钮
downloadButton.addEventListener('click', () => {
    const forLinux = document.getElementById('linux');
    const forMac = document.getElementById('mac');
    const forWin = document.getElementById('win');

    if (forLinux.className === 'button downloadLinux hide') {
        downloadButton.innerHTML = '选择版本';
        forLinux.className = 'button downloadLinux show';
        forMac.className = 'button downloadMac show';
        forWin.className = 'button downloadWin show';
    } else {
        downloadButton.innerHTML = '下载';
        forLinux.className = 'button downloadLinux hide';
        forMac.className = 'button downloadMac hide';
        forWin.className = 'button downloadWin hide';
    }
});
