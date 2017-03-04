import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export default class Types extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
        this.typeList = ['全部','摇滚','另类','民谣','流行','电子','古典','爵士','金属','朋克','说唱','世界音乐','氛围','原声','雷鬼','乡村','蓝调','实验','英伦','后摇','迷幻','暗潮','华语','流行','硬核','后朋克','人声','品牌']
    }

    render() {return(
        <div style={this.style().typesContainer}>
            <div style={this.style().types}>
                {this.typeList.map((type, index) => (
                    <div style={this.style().type} key={index}>{type}</div>
                ))}
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            typesContainer: {
                width: 'calc(100% - 70px)',
                height: '60px',
                overflow: 'auto',
                padding: '10px 20px',
                position: 'relative',
                margin: 0
            },
            types: {
                width: '2540px',
                height: '70%',
                marginTop: '10px'
            },
            type: {
                height: '100%',
                padding: '0 15px',
                display: 'inline-block',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                margin: '0 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '1.2em',
                color: 'white',
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '40px',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px 1px'
            }
        }
    }, this.props, this.state))}
}