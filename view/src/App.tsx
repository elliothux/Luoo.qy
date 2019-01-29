
import * as React from 'react';
// import store from './store';
import { Nav } from './components/nav';
import { Background } from './components/background';


function App() {
    return (
        <>
            <Background key={0} />
            <Nav key={1} />
        </>
    )
}

export {
    App
};
