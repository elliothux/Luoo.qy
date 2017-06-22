
export default {
    updateData: (state, options) =>
        state[options.type].data = Object.freeze(options.data),
    updateUserData: (state, data) => state.user = data,
    changeView: (state, {view, getters}) => {
        const prevView = getters.view;
        if (prevView === view) return;
        if (view === 'prev') state.view._.pop();
        else state.view._.push(view);

        document.getElementById(getters.view).style.zIndex = 2;
        setTimeout(() => {
            document.getElementById(prevView).style.zIndex = -2
        }, 500);
    },
    changeUserView: (state, view) => state.view.user = view,
    changeViewVol: (state, vol) => {
        !vol.type && (vol = Object.assign({
            type: state.play.type === 'likedVol' ?
                'likedVol' : 'vol'
        }, vol));
        state.view.vol = vol
    },
    changeVolType: (state, type) => state.vols.type = type,
    loadMoreVols: (state, {options, getters}) => {
        if (options.init) {
            document.getElementById('vols').scrollTop = 0;
            return state.vols.index = 18;
        }
        const max = getters._vols.length;
        const preIndex = state.vols.index;
        if (preIndex + 18 >= max)
            state.vols.index = max;
        else state.vols.index = preIndex + 18
    },
    loadMoreSingles: (state, {options, getters}) => {
        if (options.init)
            return state.singles.index = 18;
        const max = state.singles.data.length;
        const preIndex = state.singles.index;
        if (preIndex + 18 >= max)
            state.singles.index = max;
        else state.singles.index = preIndex + 18
    },
    play: (state, {options, getters, commit}) => {
        if (options.type) {
            state.play.type = options.type;
            if (options.type === 'vol' || options.type === 'likedVol')
                state.play.vol = options.data;
        }
        state.play.index = options.index;
        state.play.playing = true;

        if (!state.play.audio) {
            state.play.audio = new Audio();
            addAudioEvent.bind(this)(state.play.audio, getters, commit);
        }
        const audio = state.play.audio;
        audio.pause();
        audio.src = getters.playData.url;
        audio.volume = state.play.volume / 100;
        audio.load();
    },
    toggle: state => {
        if (!state.play.audio) return;
        if (state.play.playing) {
            state.play.playing = false;
            state.play.audio.pause();
        }
        else
            (state.play.playing = true) && state.play.audio.play();
    },
    control: (state, {type, getters, commit}) => {
        if (!state.play.audio) return;
        let index = state.play.index;
        if (state.play.mode === 1) do {
            index = (index + Math.ceil(Math.random() * 30)) % getters.playList.length;
        } while (index === state.play.index);
        else if (type === 'next')
            index = index + 1 === getters.playList.length ?
                0 : index + 1;
        else index = index - 1 === -1 ?
                getters.playList.length - 1 : index - 1;
        const options = {index: index};
        commit('play', {options, getters})
    },
    changePlayMode: state => state.play.mode === 2 ?
        state.play.mode = 0 : state.play.mode++,
    changePlayRatio: (state, ratio) => state.play.audio.currentTime =
        state.play.audio.duration * ratio / 100,
    changePlayVolume: (state, volume) => {
        state.play.audio.volume = volume / 100;
        state.play.volume = volume;
    },
    updateTime: (state, {type, value}) => state.play.time[type] = value,
    addTask: (state, {task, commit}) => {
        state.tasks.push(task);
        commit('execTask', {task, commit})
    },
    doneTask: (state, task) => {
        const tasks = state.tasks;
        const index = findTask(tasks, task.id);
        state.tasks = tasks.slice(0, index).concat(tasks.slice(index + 1, tasks.length))
    },
    execTask: (state, {task, commit}) => {
        !task && (task = state.tasks[state.tasks.length - 1]);
        task.failed = false;
        task.exec()
            .then(setTimeout(() => commit('doneTask', task), 3000))
            .catch((e) => (task.failed = true) && console.error(e))
    },
    updateFromDb: (state, {remote, commit, callback}) => {
        state.user = remote.config.get();
        remote.db.vol.get().then(data => state.vols.data = Object.freeze(data.slice(0, 15)));
        remote.db.single.get().then(data => state.singles.data = Object.freeze(data.slice(0, 15)));
        remote.db.vol.getLiked().then(data => state.vols.liked = Object.freeze(data));
        remote.db.single.getLiked().then(data => state.singles.liked = Object.freeze(data));
        remote.db.track.getLiked().then(data => state.tracks.liked = Object.freeze(data)).then(() => {
            callback && callback();
            if (document.getElementById('bootScreen').style.display === 'none') return;
            setTimeout(() => document.getElementById('bootScreen').className = 'bootImageHidden', 1000);
            setTimeout(() => document.getElementById('bootScreen').style.display = 'none', 2000)
        });
    },
    updateFromServer: (state, {remote, commit}) => {
        commit('addTask', {
            task: {
                exec: () => Promise.all([
                    remote.sync.vol.update(),
                    remote.sync.single.update()
                ]).then(commit('updateFromDb', {remote, commit})),
                text: '更新期刊',
                failed: false
            },
            commit: commit
        });
        commit('addTask', {
            task: {
                exec: () => remote.user.getCollection()
                    .then(commit('updateFromDb', {remote, commit})),
                text: '更新用户数据',
                failed: false
            },
            commit: commit
        })
    },
    like: (state, {type, data, remote, commit, getters}) => commit('addTask', {
        task: {
            exec: async () => {
                let callback;
                if (getters.playData && !data.liked) {
                    let id;
                    if (getters.playData.hasOwnProperty('vol_id'))
                        id = getters.playData.vol_id;
                    else if (getters.playData.hasOwnProperty('track_id'))
                        id = getters.playData.track_id;
                    else id = getters.playData.single_id;

                    data.id === id && (callback = function () {
                        commit('play',
                            {options: {index: state.play.index}, getters, commit})
                    }.bind(this))
                }

                type === 'vol' ?
                    await remote.sync.vol.like(data.vol, data.id, data.liked) :
                    await remote.sync.single.like(data.id, data.from, data.liked);
                commit('updateFromDb', {remote, commit, callback});
            },
            text: '同步收藏',
            failed: false
        },
        commit: commit
    })
}



function addAudioEvent(audio, getters, commit) {
    audio.addEventListener('canplay', event => event.target.play());
    audio.addEventListener('durationchange', event =>
        commit('updateTime', {
            type: 'total',
            value: event.target.duration
        })
    );
    audio.addEventListener('timeupdate', event =>
        commit('updateTime', {
            type: 'current',
            value: event.target.currentTime,
        })
    );
    audio.addEventListener('ended', () =>
        commit('control', {type: 'next', getters, commit}));
}


function findTask(tasks, id) {
    for (let i=0; i<tasks.length; i++)
        if (tasks[i].id === id) return i
}
