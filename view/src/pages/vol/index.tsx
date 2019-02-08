import * as React from "react";
import {observer} from "mobx-react";
import {volStore} from "../../store";
import {Icon, IconTypes} from "../../components/icon";
import {VolTrackItem} from "../../components/vol-track-item";
import "./index.scss";
import {ViewTypes} from "../../types";
import {events, EventTypes} from "../../utils";

let coverRef: HTMLDivElement;

function getCoverRef(i: HTMLImageElement | null) {
    coverRef = i as HTMLDivElement
}

events.on(EventTypes.ShowVolBackground, (src) => {
    console.log(src);
    debugger;
});

function IVol() {
  const { selectedVol: vol } = volStore;
  if (!vol) return null;
  return (
    <div id="vol" className={`page view-${ViewTypes.VOL_INFO}`}>
      <div
        id="vol-bg"
        ref={getCoverRef}
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
          <Icon type={IconTypes.LIKE} />
          <Icon type={IconTypes.PLAY} />
        </p>
        <p id="vol-info-title">{vol.title}</p>
        <div
          id="vol-info-desc"
          dangerouslySetInnerHTML={{
            __html: vol.desc
              .replace(/style="*?"/g, "")
              .replace(/href="*?"/g, "")
          }}
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

const Vol = observer(IVol);

export { Vol };
