import * as React from "react";
import anime from "animejs";
import { observer } from "mobx-react";
import { playerStore, singleStore } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { events, EventTypes, px } from "../../utils";
import {
  ViewTypes,
  ElementPosition,
} from "../../@types";
import "./index.scss";

let coverRef: HTMLDivElement;
let coverPos: ElementPosition;

function getCoverRef(i: HTMLImageElement | null) {
  coverRef = i as HTMLDivElement;
}

function formatDate(date: number): string {
  const d = date.toString();
  return `${d.slice(0, 4)}/${d.slice(4, 6)}/${d.slice(6, 8)}`;
}

function formatRecommender(recommender: string): string {
  if (!recommender.trim()) return "LUO";
  return recommender.replace(/-/g, "").trim();
}

function ISingle() {
  const { selectedSingle: single } = singleStore;
  if (!single) return null;
  return (
    <div id="single" className={`page view-${ViewTypes.SINGLE_INFO}`}>
      <div
        id="single-bg"
        ref={getCoverRef}
        style={{
          backgroundImage: `url(${single.cover})`
        }}
      />
      <div id="single-bg-mask" />
      <div id="single-info">
        <p id="single-info-name">
          {single.name}
          <Icon type={IconTypes.LIKE} />
          {playerStore.isSinglePlaying(single.id) ? (
            <Icon
              preventDefault
              type={IconTypes.PAUSE}
              onClick={playerStore.pause}
            />
          ) : (
            <Icon
              preventDefault
              type={IconTypes.PLAY}
              onClick={() => playerStore.playSingle(single.id)}
            />
          )}
        </p>
        <p id="single-info-artist">{single.artist}</p>
        <div
          id="single-info-desc"
          dangerouslySetInnerHTML={{
            __html: single.desc
          }}
        />
        <div id="single-info-date">
          <Icon type={IconTypes.LOGO} />
          <span id="vol-info-recommender">
            推荐人：
            {formatRecommender(single.recommender)} ·{" "}
          </span>
          <span id="vol-info-date">{formatDate(single.date)}</span>
        </div>
      </div>
    </div>
  );
}

const Single = observer(ISingle);

events.on(EventTypes.ShowSingleBackground, (src, cover, callback) => {
  const { top, right, bottom, left } = cover.getBoundingClientRect();
  coverPos = { top, right, bottom, left } as ElementPosition;

  coverRef.style.backgroundImage = `url(${src})`;
  coverRef.style.opacity = "1";
  coverRef.style.top = px(top);
  coverRef.style.left = px(left);
  coverRef.style.width = px(right - left);
  coverRef.style.height = px(bottom - top);

  anime({
    targets: coverRef,
    easing: "easeInOutExpo",
    width: "100%",
    height: "100%",
    duration: 500,
    top: 0,
    left: 0,
    begin: callback
  });
});

export { Single };
