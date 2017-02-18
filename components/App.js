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
    }


    render() {
        return(
            <div id="luoo">
                <img src="../static/pic/5877de4c96b3d.jpg" style={style.img}/>
                <Logo/>
                <div style={style.volContainer}>
                    <Vol/><Vol/><Vol/><Vol/><Vol/><Vol/>
                </div>
                <Playing/>
                {/*<VolView/>*/}
            </div>
        )
    }
}


export default App;