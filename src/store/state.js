
const volsTypes =  Object.freeze([['全部', 'All'], ['摇滚', 'Rock and Roll'],
    ['另类', 'Alternative'], ['民谣', 'Ballad'], ['流行', 'Pop'],
    ['电子', 'Electronic'], ['古典', 'Classical'], ['爵士', 'Jazz'],
    ['金属', 'Metal'], ['朋克', 'Punk'], ['说唱', 'Rap'],
    ['世界音乐', 'World'], ['氛围', 'Atmosphere'], ['原声', 'Soundtrack'],
    ['雷鬼', 'Reggae'], ['乡村', 'Country'], ['蓝调', 'Blues'],
    ['实验', 'Experimental'], ['英伦', 'England'], ['后摇', 'Post-rock'],
    ['迷幻摇滚', 'Psychedelic-rock'], ['暗潮', 'Dark Wave'], ['华语流行', 'Mandopop'],
    ['硬核', 'Hardcore'], ['后朋克', 'Post Punk']]
);


export default {
    view: {
        pre: 'vols',
        prev: '',
        vol: null
    },
    play: {
        type: null,
        mode: 0,
        list: [],
        index: 0,
        date: { },
        audio: null,
        time: {
            current: '00:00',
            total: '00:00',
            ratio: 0,
        },
        volume: 80,
        playing: false
    },
    user: { },
    vols: {
        data: [],
        index: 18,
        type: 0,
        types: volsTypes
    },
    singles: {
        data: [],
        index: 18
    },
    tracks: {
        data: []
    }
}