import React from 'react';
import reactCSS from 'reactcss';
import Single from './Single';


export default class Singles extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.getSingleList = this.getSingleList.bind(this);
        this.showMoreSingle = this.showMoreSingle.bind(this);

        this.state = {
            singleListData: [],
            singleListDom: [],
        }
    }

    componentWillMount() {
        this.getSingleList();
    }

    componentDidMount() {
        this.props.getSinglesContainerDom(this.container)
    }

    showMoreSingle() {
        const singleListDom = this.state.singleListDom;
        const max = this.state.singleListDom.length+10 >= this.state.singleListData.length ?
            this.state.singleListData.length :
            this.state.singleListDom.length+10;
        for (let i=this.state.singleListDom.length; i<max; i++) {
            singleListDom.push(
                <Single
                    data={this.state.singleListData[i]}
                    key={i}
                    index={i%10}
                    play={this.props.play.bind(null, this.state.singleListData, i)}
                />
            )
        }
        this.setState((prevState, props) => ({
            singleListDom: singleListDom
        }))
    }

    async getSingleList() {
        let data = await this.props.singles;
        this.setState((prevState, props) => ({
            singleListData: data,
            background: data[0].cover
        }));
        this.showMoreSingle();
    }

    render() {return(
        <div style={this.style().singles}>
            <div style={this.style().background}/>
            <div
                ref={container => this.container = container}
                style={this.style().content}
            >
                {this.state.singleListDom}
                <button
                    onClick={this.showMoreSingle}
                    style={this.style().loadMoreButton}
                    className="loadMore"
                >
                    More
                </button>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            singles: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                overflow: 'hidden',
                top: 0,
                transition: 'all ease-out 400ms',
                backgroundColor: 'black'
            },
            background: {
                width: '120%',
                height: '120%',
                overflow: 'hidden',
                position: 'relative',
                backgroundImage: `url('${this.props.background}')`,
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                margin: '-20px',
                zIndex: 1,
                transition: 'background-image 1.2s ease-in-out',
                opacity: 0.9
            },
            content: {
                zIndex: 2,
                width: '100%',
                height: '100%',
                overflow: 'auto',
                position: 'absolute',
                top: 0
            },
            loadMoreButton: {
                width:'100px',
                height: '40px',
                borderRadius: '40px',
                margin: '30px calc(50% - 50px) 80px calc(50% - 50px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                cursor: 'pointer',
                zIndex: 2,
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