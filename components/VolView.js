import React from 'react';
import Logo from './Logo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        zIndex: 3,
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'auto',
    },

    container: {
        position: 'absolute'
    },

    logo: {
        marginLeft: '4%'
    },

    cover: {
        width: '50%',
        height: 'auto',
        display: 'inline-block',
        marginLeft: '4%',
        marginRight: '2%',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px'
    },

    background: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        filter: 'blur(10px)',
        zIndex: -1
    },

    detail: {
        container: {
            color: 'white',
            width: '40%',
            overflow: 'auto',
            display: 'inline-block',
            marginRight: '4%',
            height: 0,
            paddingBottom: '35%',
            letterSpacing: '0.2em',
            lineHeight: '1.2em',
            textShadow: '0px 0px 5px rgba(34, 34, 34, 0.3)'
},

        tag: {
            display: 'inline-block',
            float: 'right'
        },

        title: {
            fontSize: '2em',
            marginTop: '20px',
            fontWeight: 'bold',
            lineHeight: '1.3em'
        },

        description: {
            fontSize: '0.8em',
            margin: '30px 0',
            fontWeight: 'bold'
        },

        time: {
            display: 'block',
            fontSize: '0.8em',
            fontStyle: 'italic'
        }
    },

    tracks: {
        width: '92%',
        marginLeft: '4%',
        marginBottom: '100px'
    }
};


class VolView extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return(
            <div  style={style.div} className={`volView ${this.props.show ? ' volViewActivated' : ' volViewUnactivated'}`}>
                <img src={this.props.data ? this.props.data.cover : '../static/pic/5877de4c96b3d.jpg'} style={style.background}/>

                <div style={style.container}>
                    <div style={style.logo} onClick={this.props.hiddenVolView}><Logo/></div>

                    <img ref={(cover) => {this.cover = cover}} src={this.props.data ? this.props.data.cover : '../static/pic/5877de4c96b3d.jpg'} style={style.cover}/>
                    <div style={style.detail.container}>
                        <span>{this.props.data ? `Vol.${this.props.data.vol}` : 'Vol.000'}</span>
                        <span style={style.detail.tag}>{this.props.data ? this.props.data.tag : '#...'}</span>
                        <p style={style.detail.title}>{this.props.data ? this.props.data.title  : '你所渴望的真实存在'}</p>
                        <p style={style.detail.description}>{this.props.data ? this.props.data.description : '当你直视这恒定而起伏、克制而丰沛的时光时，你发现除了在照片和镜子里，或许从未见过真正的自己。随之而来的幻灭感让人感觉生活有时如同鸡肋般，平淡中有欲望，简单中有是非，乏味中有温情。你该如何追随内心？如何追随这皮囊所渴望的真实存在？本期音乐为挪威独立音乐专题，前面简单随意、中间率性自然、后面飘然流动，像一壶用青春时光酿的老酒。就像之前写的：挪威的音乐既具有梦幻色彩、又透露着不食人间烟火的虚无和不真实，总让人念念不忘，总让人感觉到一种与生俱来的疼痛与孤独。如果你喜欢本期音乐，推荐试听落网之前推出的挪威独立音乐专题《Vol.679 念念不忘》。Cover From Isaac Gautschi    '}</p>
                        <span style={style.detail.time}>{this.props.data ? this.props.data.time : '1995 / 10 / 05'}</span>
                    </div>

                    <div style={style.tracks}>
                        {this.props.tracks}
                    </div>
                </div>
            </div>
        )
    }
}


export default VolView;