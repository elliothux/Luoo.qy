import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class Playing extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.state = {
            isPlaying: true
        }
    }

    render() {return(
        <div style={this.style().playing}>
            <div>
                <div style={this.style().coverContainer}>
                    <img
                        onClick={this.props.showPlayingVolView}
                        style={this.style().cover}
                        src={this.props.data ?
                            this.props.data.cover :
                            '../static/pic/cover.jpg'}
                    />
                </div>
                <div style={this.style().detail}>
                    <p style={this.style().detailName}>{this.props.data ? this.props.data.name : 'Loading...'}</p>
                    <p style={this.style().detailAlbum}>
                        <span>{this.props.data ? this.props.data.album : 'Album'}</span>
                        <span>  -  </span>
                        <span>{this.props.data ? this.props.data.artist : 'Artist'}</span>
                    </p>
                </div>
            </div>

            <div style={this.style().controller}>
                <img
                    onClick={this.props.prev}
                    src="../static/pic/Previous.svg"
                    style={this.style().prevButton}
                />
                <img
                    onClick={this.props.toggle}
                    src={this.props.isPlaying ?
                        "../static/pic/Pause.svg" :
                        "../static/pic/Play.svg"}
                    style={this.style().playButton}
                />
                <img
                    onClick={this.props.next}
                    src="../static/pic/Next.svg"
                    style={this.style().nextButton}
                />
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            playing: {
                position: 'fixed',
                width: 'calc(100% - 80px)',
                height: '60px',
                top: 'calc(100% + 17px)',
                left: '80px',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                lineHeight: '100%',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                transform: `${this.props.data ? 'translateY(-77px)' : 'none'}`,
                transition: 'all ease-out 300ms',
                zIndex: 5
            },
            coverContainer: {
                height: '62px',
                width: '62px',
                float: 'left',
                margin: '5px 30px 5px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                top: '-16px',
                boxShadow: '0px 2px 5px 2px rgba(0,0,0,0.31)'
            },
            cover: {
                height: 'calc(100% + 10px)',
                width: this.props.playingMenu==='vol' ?
                    'calc(100% + 10px)' : 'auto',
                position: 'relative',
                top: '-5px',
                left: '-5px'
            },
            detail: {
                float: 'left',
                color: 'rgb(125, 125, 125)',
                height: '100%',
                width: 'calc(100% - 300px)',
                marginTop: '2px',
            },
            detailName: {
                fontSize: '1.3em',
                margin: '10px 0 5px 0',
                color: '#E06979',
                fontWeight: 'bold'
            },
            detailAlbum: {
                lineHeight: '1.5em',
                fontSize: '0.9em'
            },
            controller: {
                float: 'right',
                color: 'gray',
                marginRight: '30px',
                position: 'relative',
                top: '7px',
                filter: 'drop-shadow(rgba(190, 93, 99, 0.8) 0 5px 5px)',

            },
            playButton: {
                position: 'relative',
                width: '45px',
                height: 'auto',
                cursor: 'pointer',
                margin: '0 20px',
            },
            nextButton: {
                width: '38px',
                height: 'auto',
                cursor: 'pointer'
            },
            prevButton: {
                width: '38px',
                height: 'auto',
                cursor: 'pointer'
            }
        }
    }, this.props, this.state))}
}