
import * as React from 'react';
import { observer } from 'mobx-react';
import { store } from '../../store';
import './index.scss';


@observer
class Vols extends React.Component {
    async componentDidMount() {
        console.log(await store.getVols());
    }
    renderEmpty = () => {
        return (
            <h1>EMPTY</h1>
        );
    };
    render() {
        const { vols } = store;
        if (!vols.length) {
            return this.renderEmpty();
        }
        return (
            <div id="vols">
                Hello
            </div>
        )
    }
}


export {
    Vols
}
