import React from 'react';
import reactCSS from 'reactcss';


export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().user}>

        </div>
    )}

    style() {return(reactCSS({
        default: {
            user: {
                width: 'calc(100% - 80px)',
                height: '100%',
                position: 'fixed',
                overflow: 'auto',
                backgroundColor: 'blue',
                top: '0',
                transition: 'all ease-out 400ms'
            }
        },
        'menu-vol': {
            user: {
                transform: 'translateY(100%)',
            },
        },
        'menu-single': {
            user: {
                transform: 'translateY(100%)',
            },
        },
        'menu-user': {
            user: {
                transform: 'translateY(0)',
            },
        }
    }, this.props, this.state))}
}