import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        width: '50%',
        display: 'inline-block',
        marginTop: '-10px',
        color: 'white',
        cursor: 'pointer'
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
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }


    render() {
        return(
            <div className="vol" style={style.div} onClick={this.props.showVolView.bind(null, this.props.data)}>
                <img src={this.props.data.cover || '../static/pic/5877de4c96b3d.jpg'} style={style.img}/>
                <div style={style.detail}>
                    <p style={style.volNumber}>{'Vol. ' + (this.props.data.vol || '899')}</p>
                    <p>{this.props.data.title || '无心深究的生活庸常'}</p>
                </div>
            </div>
        )
    }
}


export default Vol;