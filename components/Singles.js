import React from 'react';
import reactCSS from 'reactcss';


export default class Singles extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().singles}>

        </div>
    )}

    style() {return(reactCSS({
        default: {
            singles: {
                width: 'calc(100% - 80px)',
                height: '100%',
                position: 'fixed',
                overflow: 'auto',
                backgroundColor: 'red',
                top: '0',
                transition: 'all ease-out 400ms'
            }
        },
        'menu-vol': {
            singles: {
                transform: 'translateY(100%)',
            },
        },
        'menu-user': {
            user: {
                transform: 'translateY(100%)',
            },
        },
        'menu-single': {
            singles: {
                transform: 'translateY(0)',
            },
        }
    }, this.props, this.state))}
}