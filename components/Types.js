// 按分类筛选 vol

import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export default class Types extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
        this.toggleType = this.toggleType.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.setMax = this.setMax.bind(this);
        this.toggleController = this.toggleController.bind(this);

        this.typeList = ['全部', '摇滚', '另类', '民谣', '流行', '电子', '古典',
            '爵士', '金属', '朋克', '说唱', '世界音乐', '氛围', '原声', '雷鬼',
            '乡村', '蓝调', '实验', '英伦', '后摇', '迷幻', '暗潮', '华语流行',
            '硬核', '后朋克'];

        this.state = {
            type: '全部',
            translateX: 0,
            translateMax: 0,
            showController: false
        }
    }

    // 设置用于 Windows 和 Linux 的横向滚动的最远距离
    setMax() {
        this.setState((prevState, props) => ({
            translateMax: 2290 - (window.innerWidth - 80) * 0.935
        }))
    }

    componentDidMount() {
        this.setMax();
        // 缩放窗口时重新设置最远滚动距离
        window.addEventListener('resize', this.setMax);
        this.refs.types.addEventListener('mouseover', this.toggleController.bind(null, true));
        this.refs.types.addEventListener('mouseout', this.toggleController.bind(null, false));
    }

    // 切换 vol 的分类
    toggleType(type) {
        this.props.update(type);
        this.setState((prevState, props) => ({
            type: type
        }))
    }

    // 切换用于 Windows 和 Linux 的横向滚动控制器的显示和隐藏
    toggleController(show) {
        this.setState((prevSTate, props) => ({
            showController: !!show
        }))
    }

    // 用于 Windows 和 Linux 的向后滚动
    next() {
        this.setState((prevState, props) => ({
            translateX: prevState.translateX-530 <= -this.state.translateMax ?
                -this.state.translateMax : prevState.translateX-530
        }))
    }

    // 用于 Windows 和 Linux 的向前滚动
    prev() {
        this.setState((prevState, props) => ({
            translateX: prevState.translateX+530 >= 0 ?
                0 : prevState.translateX+530
        }))
    }

    render() {return(
        <div
            ref={'types'}
            style={this.style().container}
        >
            {this.props.platform === 'darwin' ?
                false :
                <div style={this.style().controllerContainer}>
                    {this.state.translateX === 0 ?
                        false :
                        <img
                            className="typesController"
                            src="../pic/Triangle.svg"
                            style={this.style().controllerLeft}
                            onClick={this.prev}
                        />
                    }
                    {this.state.translateX === -this.state.translateMax ?
                        false :
                        <img
                            className="typesController"
                            src="../pic/Triangle.svg"
                            style={this.style().controllerRight}
                            onClick={this.next}
                        />
                    }
                </div>
            }
            <div style={this.style().typesContainer}>
                <div style={this.style().types}>
                    {this.typeList.map((type, index) => (
                        <Type
                            type={type}
                            key={index}
                            chosen={this.state.type==type}
                            toggle={this.toggleType}
                            isLast={index === this.typeList.length-1}
                        />
                    ))}
                </div>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                position: 'relative',
            },
            controllerContainer: {
                display: this.state.showController ? 'block' : 'none',
                width: '100%',
                height: '42px',
                top: '10px',
                position: 'absolute',
            },
            controllerLeft: {
                position: 'relative',
                cursor: 'pointer',
                float: 'left',
                transform: 'rotate(180deg)',
                marginLeft: '5px',
                height: '100%',
                width: 'auto'
            },
            controllerRight: {
                position: 'relative',
                cursor: 'pointer',
                float: 'right',
                marginRight: '5px',
                height: '100%',
                width: 'auto'
            },
            typesContainer: {
                width: '93.5%',
                height: '60px',
                overflow: 'auto',
                margin: '0 auto',
                position: 'relative'
            },
            types: {
                width: '2290px',
                height: '70%',
                marginTop: '10px',
                transition: 'all ease 0.5s',
                transform: `translateX(${this.state.translateX}px)`
            }
        }
    }, this.props, this.state))}
}


// 每一个分类
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
                margin: `0 ${this.props.isLast ? 0 : 20}px  0 0`,
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