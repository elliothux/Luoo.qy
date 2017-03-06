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
            background: null
        }
    }

    componentWillMount() {
        this.getSingleList();
    }

    showMoreSingle() {
        const singleListDom = this.state.singleListDom;
        const max = this.state.singleListDom.length+10 >= this.state.singleListData.length ?
            this.state.singleListData.length :
            this.state.singleListDom.length+10;
        console.log(this.state.singleListData[0]);
        for (let i=this.state.singleListDom.length; i<max; i++) {
            singleListDom.push(
                <Single
                    data={this.state.singleListData[i]}
                    key={i}
                />
            )
        }
        this.setState((prevState, props) => ({
            singleListDom: singleListDom
        }))
    }

    async getSingleList() {
        const data = await this.props.singles;
        // console.log(data);
        this.setState((prevState, props) => ({
            singleListData: data,
            background: data[0].cover
        }));
        this.showMoreSingle();
    }

    render() {return(
        <div style={this.style().singles}>
            {this.state.singleListDom}
        </div>
    )}

    style() {return(reactCSS({
        default: {
            singles: {
                width: 'calc(100% - 80px)',
                height: '100%',
                position: 'fixed',
                overflow: 'auto',
                backgroundImage: this.state.background,
                backgroundSize: 'cover',
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