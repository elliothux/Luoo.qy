import React from 'react';
import reactCSS from 'reactcss';


export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);

        this.state = {
            background: '../static/pic/singleCover.jpg'
        }
    }

    render() {return(
        <div style={this.style().user}>
            <div style={this.style().background}/>

        </div>
    )}

    style() {return(reactCSS({
        default: {
            user: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                overflow: 'hidden',
                top: 0,
                transition: 'all ease-out 400ms',
                zIndex: 3
            },
            background: {
                width: '120%',
                height: '120%',
                overflow: 'hidden',
                position: 'relative',
                backgroundImage: `url(${this.state.background})`,
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                margin: '-20px',
                zIndex: 2
            },
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