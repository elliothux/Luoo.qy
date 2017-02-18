import React from 'react';


const style = {
    div: {
        margin: '30px 0 15px 0',
        filter: 'drop-shadow(rgba(34, 34, 34, 0.3) 2px 2px 2px)'
    },

    img: {
        width: '35px',
        height: 'auto',
    },

    span: {
        fontSize: '2em',
        fontWeight: 'bold',
        letterSpacing: '1px',
        fontFamily: 'Savoye LET',
        marginLeft: '15px',
        position: 'relative',
        top: '-6px',
        color: 'white'
    }
};


class Logo extends React.Component {
    render() {
        return(
            <div id="logo" style={style.div}>
                <img src="../static/pic/logo_white.png" style={style.img}/>
                <span style={style.span}>Luoo.qy</span>
            </div>
        )
    }
}


export default Logo;