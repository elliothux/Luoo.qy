import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import NavBar from './NavBar';
import Vols from './Vols';
import VolView from './VolView';
import Track from './Track';
import Playing from './Playing';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.showVolView = this.showVolView.bind(this);
        this.hideVolView = this.hideVolView.bind(this);
        this.showPlayingVolView = this.showPlayingVolView.bind(this);
        this.play = this.play.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);

        this.state = {
            showVolView: false,
            displayVolViewData: null,
            playingIndex: 0,
            playingVolData: null,
            playingTrack: new Audio()
        };
    }

    showVolView(data) {
        this.setState((prevState, props) => ({
            showVolView: true,
            displayVolViewData: data
        }))
    }

    hideVolView() {
        this.setState((prevState, props) => ({
            showVolView: false
        }))
    }

    showPlayingVolView() {
        this.setState((prevState, props) => ({
            showVolView: true,
            displayVolViewData: prevState.playingVolData
        }))
    }

    play(playingVolData, playingIndex) {
        const playingTrack = this.state.playingTrack;
        this.setState((prevState, props) => ({
            playingVolData: playingVolData,
            playingIndex: playingIndex,
            playingTrack: (() => {
                playingTrack.src = playingVolData.tracks[playingIndex].url;
                playingTrack.play();
                return playingTrack;
            })()
        }))
    }

    togglePlay() {
        this.setState((prevState, props) => ({
            playingTrack: (() => {
                const track = prevState.playingTrack;
                track.paused ? track.play() : track.pause();
                return track;
            })()
        }))
    }

    next() {
        const playingIndex =
            this.state.playingIndex >= this.state.playingVolData.tracks.length-1 ?
                0 : this.state.playingIndex + 1;

        this.setState((prevState, props) => ({
            playingIndex: playingIndex,
            playingTrack: (() => {
                prevState.playingTrack.src = prevState.playingVolData.tracks[playingIndex].url;
                prevState.playingTrack.play();
                return prevState.playingTrack;
            })()
        }))
    }

    prev() {
        const playingIndex =
            this.state.playingIndex <= 0 ?
                this.state.playingVolData.tracks.length-1 :
                this.state.playingIndex - 1;

        this.setState((prevState, props) => ({
            playingIndex: playingIndex,
            playingTrack: (() => {
                prevState.playingTrack.src = prevState.playingVolData.tracks[playingIndex].url;
                prevState.playingTrack.play();
                return prevState.playingTrack;
            })()
        }))
    }

    render() {return(
        <div style={this.style().app}>
            <div style={this.style().background}/>
            <NavBar hideVolView={this.hideVolView}/>
            <div style={this.style().content}>
                <Vols
                    getVolList={this.props.getVolList}
                    showVolView={this.showVolView}
                />
                <div style={this.style().volViewContainer}>
                    <VolView
                        show={this.state.showVolView}
                        data={this.state.displayVolViewData}
                        tracks={this.state.displayVolViewData ?
                            this.state.displayVolViewData.tracks.map((data, index) => (
                                <Track
                                    data={data}
                                    volData={this.state.displayVolViewData}
                                    index={index} key={index}
                                    play={this.play}
                                />
                            )) :
                            false
                        }
                    />
                </div>
            </div>
            {this.state.playingVolData ?
                <Playing
                    data={this.state.playingVolData.tracks[this.state.playingIndex]}
                    next={this.next}
                    prev={this.prev}
                    toggle={this.togglePlay}
                    showPlayingVolView={this.showPlayingVolView}
                /> : false
            }
        </div>
    )}

    style() {return(reactCSS({
        default: {
            app: {
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'fixed',
                top: 0
            },
            background: {
                width: '120%',
                height: '120%',
                overflow: 'hidden',
                position: 'relative',
                backgroundImage: `url('../static/pic/bg.jpg')`,
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                margin: '-20px'
            },
            content: {
                width: 'calc(100% - 80px)',
                height: '100%',
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                right: 0
            },
            volViewContainer: {
                position: 'static'
            }
        }
    }, this.props, this.state))}
}