import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


class Track extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return(
            <div onClick={this.props.play.bind(null, this.props.volData, this.props.index)} style={this.style().track}>
                <div style={this.style().coverContainer}>
                    <img
                        src={this.props.data.cover || '../static/pic/cover.jpg'}
                        style={this.style().cover}
                    />
                </div>
                <div style={this.style().detailContainer}>
                    <span style={this.style().name}>{this.props.data.name || 'Loading...'}</span>
                    <div style={this.style().album}>
                        <span>{this.props.data.album || 'Album'}</span>
                        <span> - </span>
                        <span>{this.props.data.artist || 'Artist'}</span>
                    </div>
                </div>
            </div>
        )
    }

    style() {return(reactCSS({
        default: {
            track: {
                width: '100%',
                height: '50px',
                margin: '15px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-center',
                alignItems: 'center',
                fontWeight: 'bold',
                backgroundColor: 'white',
                boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
                borderRadius: '4px',
                cursor: 'pointer',
                color: 'rgb(125, 125, 125)',
            },
            coverContainer: {
                width: '45px',
                height: '45px',
                margin: '0 25px 0 4px',
                overflow: 'hidden',
                borderRadius: '4px',
                boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
            },
            cover: {
                height: '100%',
                width: '100%',
            },
            detailContainer: {
                width: 'calc(100% - 100px)',
                position: 'relative',
                top: '-1px',
            },
            name: {
                display: 'inline-block',
                fontSize: '1.2em',
                fontWeight: 'bold',
                marginRight: '30px',
                color: '#E06979'
            },
            album: {
                display: 'inline-block',
                fontSize: '0.85em'
            }
        }
    }, this.props, this.state))}
}


export default Track;