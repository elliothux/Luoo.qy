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
        margin: '30px calc(50% - 50px)',
        backgroundColor: 'white',
        border: '1px solid gray',
        fontSize: '1.2em',
        fontWeight: 'bold',
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
        this.hiddenVolView = this.hiddenVolView.bind(this);
        this.showVolInViewport = this.showVolInViewport.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.playNextTrack = this.playNextTrack.bind(this);


        this.state = {
            background: '../static/pic/5877de4c96b3d.jpg',
            vol: [],
            volList: null,
            trackList: null,
            showVolView: false,
            volViewData: null,
            wheelTimes: 0,
            playingTrackData: null,
            playingTrack: new Audio(),
            playingList: null,
            playingListData: null,
            playingIndex: 0
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
                return({wheelTimes: prevState++})
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
        this.setState({
            volViewData: data,
            background: data.cover,
            showVolView: true
        });
        ReactDOM.findDOMNode(this.volView).style.display = 'absolute';
        this.getTrackList(data.vol);
    }

    hiddenVolView() {
        this.setState({
            showVolView: false
        });
        setTimeout(function () {
            ReactDOM.findDOMNode(this.volView).style.position = 'fixed';
        }.bind(this), 1500)
    }

    getTrackList(vol) {
        this.setState((prevState, porps) => {
            return {
                trackList: null
            }
        });
        this.methods.getTrackList(vol).then((data) => {
            let trackData = data.data;
            let tracks = [];
            for (let i=0, len=trackData.length; i<len; i++) {
                tracks.push(<Track key={i} data={trackData[i]} index={i} play={this.playTrack}/>)
            }
            this.setState((prevState, props) => {
                return {
                    trackList: tracks,
                    playingListData: trackData
                }
            })
        })
    }

    playTrack(data, index) {
        this.setState((prevState, props) => {
            return({
                playingTrackData: data,
                playingIndex: index
            })
        });
        this.state.playingTrack.src = data.url;
        this.state.playingTrack.play();
    }

    playNextTrack() {
        if (this.state.playingIndex == this.state.playingListData.length - 1)
            this.playTrack(this.state.playingListData[0], 0);
        else {
            this.playTrack(this.state.playingListData[this.state.playingIndex + 1], this.state.playingIndex + 1)
            this.setState((prevState, props) => {
                return({
                    playingIndex: parseInt(prevState) + 1
                })
            })
        }
    }

    togglePlay() {
        this.state.playingTrack.paused ? this.state.playingTrack.play() : this.state.playingTrack.pause()
    }

    render() {
        return(
            <div id="luoo">
                <div style={style.appContainer}>
                    <img src={this.state.background} style={style.img}/>
                    <div style={style.logo} onClick={this.props.hiddenVolView}><Logo/></div>
                    <div style={style.volContainer} onWheel={this.showVolInViewport}>
                        {this.state.vol}
                    </div>
                    <button ref={(button) => {this.loadMoreVolButton = button}} onClick={this.showMoreVol} style={style.button}>更多</button>
                </div>

                <Playing data={this.state.playingTrackData} togglePlay={this.togglePlay} next={this.playNextTrack}/>

                <VolView ref={(volView) => {this.volView = volView}} data={this.state.volViewData} tracks={this.state.trackList} hiddenVolView={this.hiddenVolView} show={this.state.showVolView}/> :
            </div>
        )
    }
}


export default App;