import React from 'react';
import Logo from './Logo';
import Track from './Track';


const style = {
    div: {
        zIndex: 3,
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: 'red',
    },

    logo: {
        width: '100%',
    },

    cover: {
        width: '45%',
        height: 'auto',
        display: 'inline-block',
        marginLeft: '4%',
        marginRight: '2%'
    },

    detail: {
        width: '45%',
        display: 'inline-block',
        marginRight: '4%'
    },

    tracks: {
        width: '92%',
        marginLeft: '4%'
    }
};


class VolView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div style={style.div}>
                <div style={style.logo}><Logo/></div>
                <img src={this.props.cover || '../static/pic/5877de4c96b3d.jpg'} style={style.cover}/>
                <div style={style.detail}>
                    <span>{this.props.tag || '#...'}</span>
                    <h1>{this.props.title || '你所渴望的真实存在'}</h1>
                    <p>{this.props.description || '当你直视这恒定而起伏、克制而丰沛的时光时，你发现除了在照片和镜子里，或许从未见过真正的自己。随之而来的幻灭感让人感觉生活有时如同鸡肋般，平淡中有欲望，简单中有是非，乏味中有温情。你该如何追随内心？如何追随这皮囊所渴望的真实存在？本期音乐为挪威独立音乐专题，前面简单随意、中间率性自然、后面飘然流动，像一壶用青春时光酿的老酒。就像之前写的：挪威的音乐既具有梦幻色彩、又透露着不食人间烟火的虚无和不真实，总让人念念不忘，总让人感觉到一种与生俱来的疼痛与孤独。如果你喜欢本期音乐，推荐试听落网之前推出的挪威独立音乐专题《Vol.679 念念不忘》。Cover From Isaac Gautschi    '}</p>
                    <span>{this.props.time || '1995 / 10 / 05'}</span>
                </div>

                <div style={style.tracks}>
                    <Track/><Track/><Track/><Track/>
                </div>
            </div>
        )
    }
}


export default VolView;