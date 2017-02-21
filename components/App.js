import React from 'react';
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

    img: {
        width: '200%',
        height: '200%',
        position: 'fixed',
        marginLeft: '-50%',
        marginTop: '-50%',
        filter: 'blur(10px)',
        zIndex: -1
    },

    volContainer: {
        width: '100%'
    }
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
            childrenToAdd.push(<Vol key={prevLength+i} index={prevLength+i} data={dataToAdd[i]} showVolView={this.showVolView}/>)

        return this.setState((prevState, props) => {
            return {
                vol: prevState.vol.concat(childrenToAdd)
            }
        })
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
                    <Logo/>
                    <div style={style.volContainer}>
                        {this.state.vol}
                    </div>
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