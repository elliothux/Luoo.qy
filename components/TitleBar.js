import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export default class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.refs.titleBar.style.WebkitAppRegion = 'drag';
    }

    render() {return(
        <div ref={"titleBar"} style={this.style().titleBar}/>
    )}

    style() {return(reactCSS({
        'default': {
            titleBar: {
                width: '100%',
                height: '26px',
                position: 'fixed',
                top: 0,
                left: 0,
            }
        }
    }, this.props, this.state))}
}