import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import NavBar from './NavBar';
import Vols from './Vols';
import VolView from './VolView';
import Track from './Track';
import Playing from './Playing';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.showVolView = this.showVolView.bind(this);
        this.hideVolView = this.hideVolView.bind(this);

        this.state = {
            showVolView: false,
            displayVolViewData: null,
        }
    }

    showVolView(data) {
        this.setState((prevState, props) => ({
            showVolView: true,
            displayVolViewData: data
        }))
    }

    hideVolView() {
        this.setState((prevState, props) => ({
            showVolView: false
        }))
    }

    render() {return(
        <div style={this.style().app}>
            <div style={this.style().background}/>
            <NavBar hideVolView={this.hideVolView}/>
            <div style={this.style().content}>
                <Vols getVolList={this.props.getVolList} showVolView={this.showVolView}/>
                <div style={this.style().volViewContainer}>
                    <VolView
                        show={this.state.showVolView}
                        data={this.state.displayVolViewData}
                        tracks={this.state.displayVolViewData ?
                            this.state.displayVolViewData.tracks.map((data, index) => (
                                <Track data={data} volData={this.state.displayVolViewData} index={index} key={index} />
                            )) :
                            false
                        }
                    />
                </div>
            </div>
            <Playing/>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            app: {
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'fixed',
                top: 0
            },
            background: {
                width: '120%',
                height: '120%',
                overflow: 'hidden',
                position: 'relative',
                backgroundImage: `url('../static/pic/bg.jpg')`,
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                margin: '-20px'
            },
            content: {
                width: 'calc(100% - 80px)',
                height: '100%',
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                right: 0
            },
            volViewContainer: {
                position: 'static'
            }
        }
    }, this.props, this.state))}
}