import React from 'react';


const style = {
    div: {
        width: '50%',
        display: 'inline-block',
        marginTop: '-10px',
        color: 'white'
    },

    img: {
        width: '100%',
        height: 'auto',
    },

    detail: {
        height: '60px',
        marginTop: '-60px',
        marginLeft: '15px',
        textShadow: 'rgba(34, 34, 34, 0.8) 2px 2px 2px',
        lineHeight: '18px'
    },

    volNumber: {
        fontFamily: 'Savoye LET',
        fontSize: '1.6em'
    }
};


class Vol extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="vol" style={style.div}>
                <img src={this.props.cover || '../static/pic/5877de4c96b3d.jpg'} style={style.img}/>
                <div style={style.detail}>
                    <p style={style.volNumber}>{'Vol. ' + (this.props.vol || '899')}</p>
                    <p>{this.props.title || '无心深究的生活庸常'}</p>
                </div>
            </div>
        )
    }
}


export default Vol;