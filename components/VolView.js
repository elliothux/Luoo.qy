import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class VolView extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().volView} className="volView hide">
            <div style={this.style().background}/>
            <div style={this.style().content}>
                <p style={this.style().volNum}>Vol.{this.props.data ? this.props.data.vol : '000'}</p>
                <img
                    src={this.props.data ? this.props.data.cover : '../static/pic/bg.jpg'}
                    style={this.style().cover}
                />
                <div style={this.style().detailContainer}>
                    <div style={this.style().detail}>
                        <p style={this.style().title}>
                            {this.props.data ? this.props.data.title : 'Loading...'}
                        </p>
                        <span style={this.style().date}>
                            落在低处·{this.props.data ? this.props.data.date : '1995-10-05'}
                        </span>
                        {this.props.data ?
                            (<span style={this.style().tag}>{this.props.data.tag}</span> || false)  :
                            false}
                        <p
                            style={this.style().desc}
                            dangerouslySetInnerHTML={{__html: this.props.data ? this.props.data.description : 'Loading...'}}
                        />
                    </div>
                </div>
                <div style={this.style().tracks}>
                    {this.props.tracks ? this.props.tracks : false}
                </div>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            volView: {
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'absolute',
                transition: 'all ease-out 300ms',
                top: 0,
                color: 'white'
            },
            background: {
                width: '120%',
                height: '120%',
                overflow: 'hidden',
                position: 'relative',
                backgroundImage: `url(${this.props.data ?
                    this.props.data.cover :
                    '../static/pic/bg.jpg'})`,
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                margin: '-20px',
                zIndex: 1
            },
            content: {
                zIndex: 2,
                width: '100%',
                height: '100%',
                overflow: 'auto',
                position: 'absolute',
                top: 0
            },
            volNum: {
                fontSize: '3em',
                letterSpacing: '2px',
                fontFamily: 'Savoye LET',
                alignSelf: 'flex-start',
                margin: '20px 0px 5px 4%'
            },
            cover: {
                width: '50%',
                height: 'auto',
                display: 'inline-block',
                marginLeft: '4%',
                marginRight: '2%',
                boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
                borderRadius: '4px',
            },
            detailContainer: {
                color: 'white',
                width: '40%',
                overflow: 'auto',
                display: 'inline-block',
                height: 0,
                paddingBottom: '35%',
                marginRight: '4%',
                letterSpacing: '0.2em',
                lineHeight: '1.2em',
                textShadow: '0px 0px 5px rgba(34, 34, 34, 0.3)'
            },
            detail: {
                color: 'white',
                width: '100%',
                marginBottom: '-100%'
            },
            title: {
                fontSize: '2em',
                marginTop: '20px',
                fontWeight: 'bold',
                lineHeight: '1.3em',
                position: 'relative',
                top: '-26px'
            },
            date: {
                display: 'inline-block',
                fontFamily: 'STSongti-SC-Regular',
                fontSize: '0.8em',
                position: 'relative',
                top: '-5px'
            },
            tag: {
                display: 'inline-block',
                fontFamily: 'STSongti-SC-Regular',
                fontSize: '0.8em',
                float: 'right',
                position: 'relative',
                top: '-5px'
            },
            desc: {
                fontSize: '0.8em',
                margin: '0px 0px 30px 0',
                fontWeight: 'bold'
            },
            tracks: {
                width: '92%',
                marginLeft: '4%',
                marginBottom: '80px'
            }
        },
        'show-true': {
            volView: {
                transform: 'translateY(0)'
            }
        },
        'show-false': {
            volView: {
                transform: 'translateY(100%)'
            }
        }
    }, this.props, this.state))}
}