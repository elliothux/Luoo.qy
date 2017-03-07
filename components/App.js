import React from 'react';
import reactCSS from 'reactcss';
import NavBar from './NavBar';
import Vols from './Vols';
import VolView from './VolView';
import Singles from './Singles';
import User from './User';
import Track from './Track';
import Playing from './Playing';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.toggleActivateMenu = this.toggleActivateMenu.bind(this);
        this.showVolView = this.showVolView.bind(this);
        this.hideVolView = this.hideVolView.bind(this);
        this.showPlayingVolView = this.showPlayingVolView.bind(this);
        this.play = this.play.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);

        this.state = {
            activateMenu: 'vol',
            showVolView: false,
            displayVolData: null,
            playingIndex: 0,
            playingVolData: null,
            playingTrack: new Audio()
        };
    }

    toggleActivateMenu(menu) {
        if (menu === this.state.activateMenu)
            return;
        this.setState((prevState, props) => ({
            activateMenu: menu
        }))
    }

    showVolView(data) {
        this.setState((prevState, props) => ({
            showVolView: true,
            displayVolData: data
        }))
    }

    hideVolView() {
        this.setState((prevState, props) => ({
            showVolView: false
        }))
    }

    showPlayingVolView() {
        if (this.state.displayVolData === this.state.playingVolData &&
            this.state.showVolView === true &&
            this.state.activateMenu === 'vol')
            return;
        if (this.state.activateMenu !== 'vol')
            this.toggleActivateMenu('vol');
        if (this.state.displayVolData !== this.state.playingVolData &&
            this.state.showVolView === true) {
            this.hideVolView();
            setTimeout((function () {
                this.showVolView(this.state.playingVolData);
            }).bind(this), 300)
        } else {
            this.showVolView(this.state.playingVolData);
        }
    }

    play(playingVolData, playingIndex) {
        const next = this.next;
        this.setState((prevState, props) => ({
            playingVolData: playingVolData,
            playingIndex: playingIndex,
            playingTrack: (() => {
                prevState.playingTrack.src = playingVolData.tracks[playingIndex].url;
                prevState.playingTrack.addEventListener('ended', next);
                prevState.playingTrack.play();
                return prevState.playingTrack;
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
            <NavBar
                hideVolView={this.hideVolView}
                menu={this.state.activateMenu}
                toggle={this.toggleActivateMenu}
            />
            <div style={this.style().content}>
                <Vols
                    getVolList={this.props.getVolList}
                    showVolView={this.showVolView}
                    menu={this.state.activateMenu}
                />
                <div style={this.style().volViewContainer}>
                    <VolView
                        show={this.state.showVolView}
                        data={this.state.displayVolData}
                        tracks={this.state.displayVolData ?
                            this.state.displayVolData.tracks.map((data, index) => (
                                <Track
                                    data={data}
                                    volData={this.state.displayVolData}
                                    index={index} key={index}
                                    play={this.play}
                                />
                            )) :
                            false
                        }
                    />
                </div>
                <div style={this.style().singlesContainer}>
                    <Singles menu={this.state.activateMenu} singles={this.props.getSingleList}/>
                </div>
                <div style={this.style().userContainer}>
                    <User menu={this.state.activateMenu}/>
                </div>
                </div>
            <Playing
                isPlaying={!this.state.playingTrack.paused}
                data={this.state.playingVolData ?
                    this.state.playingVolData.tracks[this.state.playingIndex] :
                    null}
                next={this.next}
                prev={this.prev}
                toggle={this.togglePlay}
                showPlayingVolView={this.showPlayingVolView}
            /> : false
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
            },
            singlesContainer: {
                position: 'static'
            },
            userContainer: {
                position: 'static'
            },
        }
    }, this.props, this.state))}
}