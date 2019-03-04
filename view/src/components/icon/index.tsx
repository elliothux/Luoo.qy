import * as React from "react";
import LOGO from "../../static/icon/logo.png";
import BACK from "../../static/icon/back.svg";
import CATEGORY from "../../static/icon/cate.svg";
import SEARCH from "../../static/icon/search.svg";
import SHARE from "../../static/icon/share.svg";
import SOURCE from "../../static/icon/source.svg";
import ARTICLE from "../../static/icon/article.svg";
import ARTICLE_SOLID from "../../static/icon/article-solid.svg";
import SINGLE from "../../static/icon/single.svg";
import SINGLE_SOLID from "../../static/icon/single-solid.svg";
import USER from "../../static/icon/user.svg";
import USER_SOLID from "../../static/icon/user-solid.svg";
import VOL from "../../static/icon/vol.svg";
import VOL_SOLID from "../../static/icon/vol-solid.svg";
import LIKE from "../../static/icon/like.svg";
import LIKE2 from "../../static/icon/like2.svg";
import PLAY from "../../static/icon/play.svg";
import PLAY_SOLID from "../../static/icon/play-solid.svg";
import PAUSE from "../../static/icon/pause.svg";
import PAUSE_SOLID from "../../static/icon/pause-solid.svg";
import CLOUD from "../../static/icon/cloud.svg";
import WAVE from "../../static/icon/wave.svg";
import PRE from "../../static/icon/pre.svg";
import NEXT from "../../static/icon/next.svg";
import RANDOM from "../../static/icon/random.svg";
import ARROW_LEFT from "../../static/icon/arrow-left.svg";
import ARROW_RIGHT from "../../static/icon/arrow-right.svg";
import PRE2 from "../../static/icon/pre2.svg";
import NEXT2 from "../../static/icon/next2.svg";
import SHUFFLE from "../../static/icon/shuffle.svg";
import LOOP from "../../static/icon/loop.svg";
import ORDER from "../../static/icon/order.svg";
import EXPAND from "../../static/icon/expand.svg";

import "./index.scss";
import { preventSyntheticEvent } from "../../utils";

export enum IconTypes {
  BACK,
  CATEGORY,
  SEARCH,
  SHARE,
  SOURCE,
  ARTICLE,
  ARTICLE_SOLID,
  SINGLE,
  SINGLE_SOLID,
  USER,
  USER_SOLID,
  VOL,
  VOL_SOLID,
  LIKE,
  LIKE2,
  PLAY,
  PLAY_SOLID,
  PAUSE,
  PAUSE_SOLID,
  LOGO,
  CLOUD,
  WAVE,
  PRE,
  PRE2,
  NEXT,
  NEXT2,
  RANDOM,
  ARROW_LEFT,
  ARROW_RIGHT,
  SHUFFLE,
  LOOP,
  ORDER,
  EXPAND
}

export interface Props {
  type: IconTypes;
  className?: string;
  onClick?: (e: any) => void;
  preventDefault?: boolean;
}

function Icon(props: Props) {
  const { type, className, onClick, preventDefault } = props;

  let src;
  switch (type) {
    case IconTypes.BACK:
      src = BACK;
      break;
    case IconTypes.CATEGORY:
      src = CATEGORY;
      break;
    case IconTypes.SEARCH:
      src = SEARCH;
      break;
    case IconTypes.SHARE:
      src = SHARE;
      break;
    case IconTypes.SOURCE:
      src = SOURCE;
      break;
    case IconTypes.ARTICLE:
      src = ARTICLE;
      break;
    case IconTypes.ARTICLE_SOLID:
      src = ARTICLE_SOLID;
      break;
    case IconTypes.SINGLE:
      src = SINGLE;
      break;
    case IconTypes.SINGLE_SOLID:
      src = SINGLE_SOLID;
      break;
    case IconTypes.USER:
      src = USER;
      break;
    case IconTypes.USER_SOLID:
      src = USER_SOLID;
      break;
    case IconTypes.VOL:
      src = VOL;
      break;
    case IconTypes.VOL_SOLID:
      src = VOL_SOLID;
      break;
    case IconTypes.PLAY:
      src = PLAY;
      break;
    case IconTypes.PLAY_SOLID:
      src = PLAY_SOLID;
      break;
    case IconTypes.PAUSE:
      src = PAUSE;
      break;
    case IconTypes.PAUSE_SOLID:
      src = PAUSE_SOLID;
      break;
    case IconTypes.LIKE:
      src = LIKE;
      break;
    case IconTypes.LIKE2:
      src = LIKE2;
      break;
    case IconTypes.LOGO:
      src = LOGO;
      break;
    case IconTypes.CLOUD:
      src = CLOUD;
      break;
    case IconTypes.WAVE:
      src = WAVE;
      break;
    case IconTypes.PRE:
      src = PRE;
      break;
    case IconTypes.NEXT:
      src = NEXT;
      break;
    case IconTypes.PRE2:
      src = PRE2;
      break;
    case IconTypes.NEXT2:
      src = NEXT2;
      break;
    case IconTypes.RANDOM:
      src = RANDOM;
      break;
    case IconTypes.ARROW_LEFT:
      src = ARROW_LEFT;
      break;
    case IconTypes.ARROW_RIGHT:
      src = ARROW_RIGHT;
      break;
    case IconTypes.SHUFFLE:
      src = SHUFFLE;
      break;
    case IconTypes.ORDER:
      src = ORDER;
      break;
    case IconTypes.LOOP:
      src = LOOP;
      break;
    case IconTypes.EXPAND:
      src = EXPAND;
      break;
    default:
      throw "Invalid icon type";
  }

  const handleClick = (e: React.FormEvent<HTMLImageElement>) => {
    if (preventDefault) {
      preventSyntheticEvent(e);
    }
    if (typeof onClick === "function") {
      onClick(e);
    }
    return false;
  };

  return (
    <img
      className={className ? `icon ${className}` : "icon"}
      src={src}
      onClick={handleClick}
      alt="icon"
    />
  );
}

export { Icon };
