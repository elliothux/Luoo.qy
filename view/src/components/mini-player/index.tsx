import * as React from 'react';
import {observer} from 'mobx-react';
import {store} from '../../store';
import "./index.scss";
import {Icon, IconTypes} from "../icon";


function IMiniPlayer() {
    const { playingInfo: info } = store;
    return (
        <div id="mini-player">
            <div id="mini-player-operation">
                <Icon type={IconTypes.CLOUD}/>
                <Icon type={IconTypes.LIKE}/>
            </div>
            <div id="mini-player-cover" style={{ backgroundImage: `url(${info.cover})`}} />
            <div id="mini-player-info">
                <p id="mini-player-info-name">{info.name}</p>
                <p id="mini-player-info-album">{info.album} - {info.artist}</p>
            </div>
        </div>
    )
}

const MiniPlayer = observer(IMiniPlayer);


export {
    MiniPlayer
}
