import React from 'react';
import reactCSS from 'reactcss';
import Types from './Types';
import Vol from './Vol';


export default class Vols extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.getVolList = this.getVolList.bind(this);
        this.showMoreVol = this.showMoreVol.bind(this);

        this.state = {
            allTypesVolListData: [],
            volListData: [],
            volListDom: []
        }
    }

    componentWillMount() {
        this.getVolList();
    }

    showMoreVol() {
        const prevVolNum = this.state.volListDom.length;
        const volListDom = this.state.volListDom;
        for (let i=0, len=10; i<len; i++) {
            volListDom.push(
                <Vol
                    data={this.state.volListData[prevVolNum+i]}
                    key={prevVolNum+i}
                    showVolView={this.props.showVolView}
                />
            )
        }
        this.setState((prevState, props) => ({
            volListDom: volListDom
        }))
    }

    async getVolList() {
        const data = await this.props.getVolList;
        this.setState((prevState, props) => ({
            volListData: data,
            allTypesVolListData: data
        }));
        this.showMoreVol();
    }

    render() {return(
        <div style={this.style().volsContainer}>
            <Types/>
            <div style={this.style().vols}>
                {this.state.volListDom}
            </div>
            <button style={this.style().loadMoreButton} onClick={this.showMoreVol}>More</button>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            volsContainer: {
                width: '100%',
                height: '100%',
                overflow: 'auto'
            },
            vols: {
                position: 'relative',
                top: '20px',
                padding: '0 15px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
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
                cursor: 'pointer'
            }
        }
    },this.props, this.state))}
}
