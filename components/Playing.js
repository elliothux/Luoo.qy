import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class Playing extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.prev = this.prev.bind(this);
        this.toggle = this.toggle.bind(this);
        this.next = this.next.bind(this);

        this.state = {
            isPlaying: true
        }
    }

    componentDidMount() {
        this.refs.detailAlbum.style.webkitLineClamp = 1;
        this.refs.detailName.style.webkitLineClamp = 1;
    }

    prev() {
        const prevButton = this.refs.prevButton;
        const detail = this.refs.detail;
        prevButton.className = 'prevButton clicked';
        detail.className = 'detail prev';
        setTimeout(() => {
            prevButton.className = 'prevButton';
            detail.className = 'detail';
        }, 600);
        this.props.playingMenu === 'vol' ?
            this.props.prevTrack() : this.props.prevSingle();
    }

    toggle() {
        const toggleButton = this.refs.toggleButton;
        const detail = this.refs.detail;
        toggleButton.className = 'toggleButton clicked';
        detail.className = 'detail toggle';
        setTimeout(() => {
            toggleButton.className = 'toggleButton';
            detail.className = 'detail';
        }, 600);
        this.props.toggle();
    }

    next() {
        const nextButton = this.refs.nextButton;
        const detail = this.refs.detail;
        nextButton.className = 'nextButton clicked';
        detail.className = 'detail next';
        setTimeout(() => {
            nextButton.className = 'nextButton';
            detail.className = 'detail';
        }, 600);
        this.props.playingMenu === 'vol' ?
            this.props.nextTrack() : this.props.nextSingle();
    }

    render() {return(
        <div style={this.style().playing}>
            <div ref={'detail'} className="detail">
                <div className="playingCover" style={this.style().coverContainer}>
                    <img
                        onClick={this.props.playingMenu === 'vol' ?
                            this.props.showPlayingVolView :
                            this.props.showPlayingSingle.bind(null, this.container)}
                        style={this.style().cover}
                        src={this.props.data ?
                            this.props.data.cover :
                            '../static/pic/cover.jpg'}
                    />
                </div>
                <div style={this.style().detail}>
                    <p ref={"detailName"} style={this.style().detailName}>
                        {this.props.data ? this.props.data.name : 'Loading...'}
                    </p>
                    <p ref={"detailAlbum"} style={this.style().detailAlbum}>
                        {this.props.data&&this.props.data.album ?
                            <span>{this.props.data.album} - </span>: false}
                        <span>{this.props.data ? this.props.data.artist : 'Artist'}</span>
                    </p>
                </div>
            </div>

            <div style={this.style().controller}>
                <img
                    ref={'prevButton'}
                    className="prevButton"
                    onClick={this.prev}
                    src="../static/pic/Previous.svg"
                    style={this.style().prevButton}
                />
                <img
                    ref={'toggleButton'}
                    className="toggleButton"
                    onClick={this.toggle}
                    src={this.props.isPlaying ?
                        "../static/pic/Pause.svg" :
                        "../static/pic/Play.svg"}
                    style={this.style().playButton}
                />
                <img
                    ref={'nextButton'}
                    className="nextButton"
                    onClick={this.next}
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
            },
            cover: {
                height: 'calc(100% + 10px)',
                width: this.props.playingMenu==='vol' ?
                    'calc(100% + 10px)' : 'auto',
                position: 'relative',
                top: '-5px',
                left: '-5px',
                cursor: 'pointer'
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
                lineHeight: '20px',
                margin: '8px 0 5px 0',
                color: '#E06979',
                fontWeight: 'bold',
                display: '-webkit-box',
                webkitBoxOrient: 'block-axis',
                width: '100%',
                height: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
            detailAlbum: {
                fontSize: '0.9em',
                lineHeight: '20px',
                display: '-webkit-box',
                webkitBoxOrient: 'block-axis',
                width: '100%',
                height: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
            controller: {
                float: 'right',
                color: 'gray',
                marginRight: '30px',
                position: 'relative',
                top: '7px'
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