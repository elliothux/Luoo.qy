import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export default class Types extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
        this.toggleType = this.toggleType.bind(this);
        this.typeList = ['全部', '摇滚', '另类', '民谣', '流行', '电子', '古典',
            '爵士', '金属', '朋克', '说唱', '世界音乐', '氛围', '原声', '雷鬼',
            '乡村', '蓝调', '实验', '英伦', '后摇', '迷幻', '暗潮', '华语流行',
            '硬核', '后朋克'];

        this.state = {
            type: '全部'
        }
    }

    toggleType(type) {
        this.props.update(type);
        this.setState((prevState, props) => ({
            type: type
        }))
    }

    render() {return(
        <div style={this.style().typesContainer}>
            <div style={this.style().types}>
                {this.typeList.map((type, index) => (
                    <Type
                        type={type}
                        key={index}
                        chosen={this.state.type==type}
                        toggle={this.toggleType}
                    />
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
                width: '2310px',
                height: '70%',
                marginTop: '10px'
            }
        }
    }, this.props, this.state))}
}


class Type extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div
            ref={type => this.type = type}
            className="type"
            onClick={this.props.toggle.bind(null, this.props.type)}
            style={this.style().type}
        >
            {this.props.type}
        </div>
    )}

    style() {return(reactCSS({
        default: {
            type: {
                height: '100%',
                padding: '0 15px',
                display: 'inline-block',
                margin: '0 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '1.2em',
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '43px',
            }
        },
        'chosen-false': {
            type: {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white'
            }
        },
        'chosen-true': {
            type: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                color: '#e06979',
                fontWeight: 'bold'
            }
        }
    }, this.props, this.state))}
}