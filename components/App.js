import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const An = ReactCSSTransitionGroup;
import Lib from '../static/lib';


import Logo from './Logo';
import Vol from './Vol';
import Playing from './Playing';
import VolView from './VolView';
import Track from './Track';


const style = {
    appContainer: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        overflow: 'auto'
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
        width: '100%'
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

        this.state = {
            background: '../static/pic/5877de4c96b3d.jpg',
            vol: [],
            volList: null,
            trackList: null,
            showVolView: false,
            volViewData: null,
        };

        this.methods = {
            getVolList: props.getVolList,
            getTrackList: props.getTrackList
        }
    }

    componentWillMount() {
        this.getVolList()
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
            childrenToAdd.push(<Vol ref={(index) => {this[`vol${prevLength+i}`] = index}} key={prevLength+i} index={i+1} data={dataToAdd[i]} showVolView={this.showVolView}/>)

        return this.setState((prevState, props) => {
            return {
                vol: prevState.vol.concat(childrenToAdd)
            }
        })
    }

    showVolInViewport() {
        for(let i=0, len=this.state.volList.length; i<len; i++) {
            let vol = this[`vol${i}`];
            if (Lib.isElementInViewport(vol)) {
                vol.className += 'volInViewport'
            }
        }
    }

    showVolView(data) {
        this.setState({
            volViewData: data,
            background: data.cover,
            showVolView: true
        });
        this.getTrackList(data.vol);
    }

    hiddenVolView() {
        this.setState({
            showVolView: false
        })
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
                tracks.push(<Track
                    key={i}
                    name={trackData[i].name}
                    artist={trackData[i].artist}
                    album={trackData[i].album}
                    cover={trackData[i].cover}
                    order={trackData[i].order}
                    url={trackData[i].url}
                    vol={trackData[i].vol}/>)
            }
            this.setState((prevState, props) => {
                return {
                    trackList: tracks
                }
            })
        })
    }

    render() {
        return(
            <div id="luoo">
                <div style={Object.assign(style.appContainer, {top: (this.state.showVolView ? '100%' : '0%')})}>
                    <img src={this.state.background} style={style.img}/>
                    <div style={style.logo} onClick={this.props.hiddenVolView}><Logo/></div>
                    <div style={style.volContainer} onWheel={}>
                        <An {...transition}>{this.state.vol}</An>>
                    </div>
                    <button onClick={this.showMoreVol} style={style.button}>更多</button>
                    {/*<Playing />*/}
                </div>
                {this.state.showVolView ?
                    <VolView data={this.state.volViewData} tracks={this.state.trackList} hiddenVolView={this.hiddenVolView}/> :
                    false
                }
            </div>
        )
    }
}


export default App;