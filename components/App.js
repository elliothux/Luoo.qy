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
        this.loadVol = this.loadVol.bind(this);
        this.state = {
            children: [],
            volList: null
        };
        this.methods = {
            getVolList: props.getVolList,
            getTrackList: props.getTrackList
        }
    }

    componentWillMount() {
        console.log('f');
        this.methods.getVolList().then((data) => {
            console.log(data)
        })
    }

    loadVol() {
        let prevLength = this.state.children.length;
        let dataToAdd = this.state.volList.silce(prevLength, prevLength+10);
        let childrenToAdd = [];
        for (let i=0; i<10; i++)
            childrenToAdd.push(<Vol key={prevLength+i} data={dataToAdd[i]}/>)

        this.setState((prevState, props) => {
            children: prevState.children.push(childrenToAdd)
        }, null)
    }


    render() {
        return(
            <div id="luoo">
                <img src="../static/pic/5877de4c96b3d.jpg" style={style.img}/>
                <Logo/>
                <div style={style.volContainer}>
                    {this.state.children}
                </div>
                <Playing/>
                {/*<VolView/>*/}
            </div>
        )
    }
}


export default App;