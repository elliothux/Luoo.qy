import * as React from "react";
import {observer} from "mobx-react";
import {store} from "../../store";
import {Icon, IconTypes} from "../../components/icon";
import { VolTrackItem } from '../../components/vol-track-item';
import "./index.scss";

@observer
class Vol extends React.Component {
  async componentDidMount() {
    console.log(await store.getVols());
  }

  render() {
    const { selectedVol: vol } = store;
    if (!vol) return null;
    return (
      <div id="vol">
        <div
          id="vol-bg"
          style={{
            backgroundImage: `url(${vol.cover})`
          }}
        />
        <div id="vol-bg-mask" />
        <div id="vol-info">
          <div id="vol-info-tags">
            {vol.tags.map(t => (
              <span key={t}>#{t}</span>
            ))}
          </div>
          <p id="vol-info-index">
            vol.
            {vol.vol}
          </p>
          <p id="vol-info-title">
            {vol.title}
          </p>
          <div
            id="vol-info-desc"
            dangerouslySetInnerHTML={{ __html: vol.desc }}
          />
          <div id="vol-info-date">
              <Icon type={IconTypes.LOGO} />
              <span id="vol-info-author">{vol.author} · </span>
              <span id="vol-info-date">{vol.date}</span>
          </div>
        </div>
        <div id="vol-tracks">
            {vol.tracks.map(t => (
                <VolTrackItem key={t.id} trackInfo={t} />
            ))}
        </div>
      </div>
    );
  }
}

export { Vol };
