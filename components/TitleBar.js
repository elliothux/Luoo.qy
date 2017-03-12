import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export default class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {return(
        <div style={this.style().titleBar}/>
    )}

    style() {return(reactCSS({
        'default': {
            titleBar: {
                width: '100%',
                height: '26px',
                position: 'fixed',
                top: 0,
                left: 0,
                webkitAppRegion: 'drag',
            }
        }
    }, this.props, this.state))}
}