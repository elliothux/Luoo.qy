import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const An = ReactCSSTransitionGroup;


import Logo from './Logo';
import Vol from './Vol';
import Playing from './Playing';
import VolView from './VolView';
import Track from './Track';


const style = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    appContainer: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        overflow: 'auto',
    },

    logo: {
        marginLeft: 'calc(50% - 60px)'
    },

    img: {
        width: '200%',
        height: '200%',
        position: 'fixed',
        marginLeft: '-50%',
        marginTop: '-50%',
        filter: 'blur(10px)',
        zIndex: -1
    },

    button: {
        width:'100px',
        height: '40px',
        borderRadius: '40px',
        margin: '30px calc(50% - 50px) 80px calc(50% - 50px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: 'white',
        cursor: 'pointer'
    },

    volContainer: {
        width: '100%',
        zIndex: 5
    },

    track: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-center'
    }
};


const transition = {
    transitionName: "vol",
    transitionEnterTimeout: 5000,
    transitionLeave: false
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.getVolList = this.getVolList.bind(this);
        this.showMoreVol = this.showMoreVol.bind(this);
        this.showVolView = this.showVolView.bind(this);
        this.showPlayingVolView = this.showPlayingVolView.bind(this);
        this.hiddenVolView = this.hiddenVolView.bind(this);
        this.showVolInViewport = this.showVolInViewport.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.getPlayList = this.getPlayList.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.playNextTrack = this.playNextTrack.bind(this);
        this.playPrevTrack = this.playPrevTrack.bind(this);


        this.state = {
            background: '../static/pic/5877de4c96b3d.jpg',
            vol: [],
            volList: null,
            trackListData: null,
            showVolView: false,
            volViewData: null,
            isPlaying: false,
            playingVolData: null,
            playingTrackData: null,
            playingTrackListData: null,
            playingTrack: new Audio(),
            playingIndex: 0,
            wheelTimes: 0,
        };

        this.methods = {
            getVolList: props.getVolList,
            getTrackList: props.getTrackList,
            isElementInViewport: props.isElementInViewport
        };
    }

    componentWillMount() {
        this.getVolList()
    }

    componentDidUpdate() {
        this.showVolInViewport()
    }

    componentDidMount() {
        this.showVolInViewport()
    }

    getVolList() {
        this.methods.getVolList().then((data) => {
            this.setState((prevState, props) => {
                return {volList: data}
            })
        }).then(this.showMoreVol)
    }

    showMoreVol() {
        let prevLength = this.state.vol.length;
        let dataToAdd = this.state.volList.slice(prevLength, prevLength+10);
        let childrenToAdd = [];
        for (let i=0; i<10; i++)
            childrenToAdd.push(<Vol ref={(index) => {this[`vol${prevLength+i}`] = index}} key={prevLength+i} index={i} data={dataToAdd[i]} showVolView={this.showVolView}/>)

        return this.setState((prevState, props) => {
            return {
                vol: prevState.vol.concat(childrenToAdd)
            }
        })
    }

    showVolInViewport() {
        if (this.state.wheelTimes <= 1000) {
            this.setState((prevState, props) => {
                return({wheelTimes: prevState.wheelTimes + 1})
            });
            return;
        }

        let vols = this.state.vol;
        for (let i=0, len=vols.length; i<len; i++) {
            let vol = ReactDOM.findDOMNode(this[`vol${i}`]);
            if (this.methods.isElementInViewport(vol) && vol.className.length<=8) {
                vol.className += ' volInViewPort'
            }
        }

        let button = ReactDOM.findDOMNode(this.loadMoreVolButton);
        this.methods.isElementInViewport(button) && setTimeout(function () {
            this.methods.isElementInViewport(button) && this.showMoreVol()
        }.bind(this), 1000);
    }

    showVolView(data) {
        this.getTrackList(data.vol);
        this.setState({
            volViewData: data,
            background: data.cover,
            showVolView: true
        });
    }

    showPlayingVolView(introduction) {
        if (this.state.playingVolData.vol == this.state.volViewData.vol &&
            this.state.showVolView == true)
            return;

        ReactDOM.findDOMNode(this.volView).scrollTop = 0;
        const show = function (data) {
            this.getTrackList(data.vol);
            this.setState({
                volViewData: data,
                background: data.cover,
                showVolView: true
            });
        }.bind(this);

        const data = this.state.playingVolData;
        if (this.state.showVolView == false) {
            show(data)
        } else {
            this.hiddenVolView();
            setTimeout(show.bind(null, data), 400);
        }
    }

    hiddenVolView() {
        this.setState({
            showVolView: false
        });
    }

    getTrackList(vol) {
        this.methods.getTrackList(vol).then((data) => {
            this.setState((prevState, props) => {
                return {
                    trackListData: data.data
                }
            })
        })
    }

    getPlayList(data, volData) {
        this.setState((prevState, props) => {
            return({
                playingTrackListData: data,
                playingVolData: volData
            })
        })
    }

    playTrack(index) {
        const play = function () {
            this.state.playingTrack.play();
        }.bind(this);

        if(!this.state.playingTrackData) {
            ReactDOM.findDOMNode(this.playing).className = 'playing';
        }

        return new Promise(function (resolve, reject) {
            this.setState((prevState, props) => {
                return ({
                    playingTrackData: this.state.playingTrackListData ?
                        this.state.playingTrackListData[index] :
                        this.state.trackListData[index],
                    playingIndex: index,
                    isPlaying: true
                })
            });
            this.state.playingTrack.src = this.state.playingTrackListData[index].url;
            this.state.playingTrack.addEventListener('ended', this.playNextTrack);
            resolve(this.state.playingTrack)
        }.bind(this)).then(function (track) {
            if (!track.src)
                this.playTrack(index, volData);
            else
                track.play()
        }.bind(this))
    }

    playNextTrack() {
        if (this.state.playingIndex == this.state.trackListData.length - 1)
            this.playTrack(0);
        else
            this.playTrack(this.state.playingIndex + 1);
    }

    playPrevTrack() {
        if (this.state.playingIndex == 0)
            this.playTrack(this.state.trackListData.length - 1);
        else
            this.playTrack(this.state.playingIndex - 1)
    }

    togglePlay() {
        if (this.state.playingTrack.paused)
            this.state.playingTrack.play();
        else
            this.state.playingTrack.pause();
        this.setState((prevState, props) => {
            return({
                isPlaying: !prevState.isPlaying
            })
        })
    }

    render() {
        return(
            <div id="luoo">
                <div style={style.appContainer}>
                    <img src={this.state.background} style={style.img}/>
                    <div
                        style={style.logo}
                        onClick={this.props.hiddenVolView}
                    >
                        <Logo/>
                    </div>

                    <div style={style.volContainer} onWheel={this.showVolInViewport}>
                        {this.state.vol}
                    </div>
                    <button
                        ref={(button) => {this.loadMoreVolButton = button}}
                        onClick={this.showMoreVol} style={style.button}
                    >
                        Loading
                    </button>
                </div>

                <Playing
                    ref={(playing) => {this.playing = playing}}
                    data={this.state.playingTrackData}
                    togglePlay={this.togglePlay}
                    next={this.playNextTrack}
                    prev={this.playPrevTrack}
                    showPlayingVolView={this.showPlayingVolView}
                    isPlaying={this.state.isPlaying}
                />

                <VolView
                    ref={(volView) => {this.volView = volView}}
                    data={this.state.volViewData}
                    tracks={this.state.trackListData && this.state.trackListData.map((data, index) => {
                        return(
                            <Track
                                key={index}
                                data={data}
                                index={index}
                                play={this.playTrack}
                                getPlayList={this.getPlayList}
                                volData={this.state.volViewData}
                                trackListData={this.state.trackListData}
                            />
                        )
                    })}
                    hiddenVolView={this.hiddenVolView}
                    show={this.state.showVolView}
                />
            </div>
        )
    }
}


export default App;
