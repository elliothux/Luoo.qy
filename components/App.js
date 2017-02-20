import React from 'react';
import Logo from './Logo';
import Vol from './Vol';
import Playing from './Playing';
import VolView from './VolView';


const style = {
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
        this.showVol = this.showVol.bind(this);
        this.showVolView = this.showVolView.bind(this);
        this.state = {
            vol: [],
            volList: null,
            showVolView: false,
            volViewData: null
        };
        this.methods = {
            getVolList: props.getVolList,
            getTrackList: props.getTrackList
        }
    }

    componentWillMount() {
        this.methods.getVolList().then((data) => {
            this.setState((prevState, props) => {
                return {volList: data}
            })
        }).then(this.showVol)
    }

    showVol() {
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
            volViewData: data
        })
    }

    render() {
        return(
            <div id="luoo">
                <img src="../static/pic/5877de4c96b3d.jpg" style={style.img}/>
                <Logo/>
                <div style={style.volContainer}>
                    {this.state.vol}
                </div>
                {/*<Playing />*/}
                <VolView data={this.state.volViewData} getTrackList={this.methods.getTrackList}/>
            </div>
        )
    }
}


export default App;