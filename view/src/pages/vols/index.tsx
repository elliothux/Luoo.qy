
import * as React from 'react';
import store from '../../store';



class Vols extends React.Component {
    async componentDidMount() {
        console.log(await store.getVols());
    }
    render() {
        return (
            <h1>
                Hello
            </h1>
        )
    }
}


export {
    Vols
}