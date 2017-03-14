// 上方的可拖动区域

import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export default class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        // 设置 reactCSS 不支持的 CSS 属性
        this.refs.titleBar.style.WebkitAppRegion = 'drag';
    }

    render() {return(
        <div ref={"titleBar"} style={this.style().titleBar}/>
    )}

    style() {return(reactCSS({
        'default': {
            titleBar: {
                width: '100%',
                height: '30px',
                position: 'fixed',
                top: 0,
                left: 0,
            }
        }
    }, this.props, this.state))}
}