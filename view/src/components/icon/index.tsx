import * as React from "react";
import { preventSyntheticEvent } from "../../utils";

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
import LIKED from "../../static/icon/liked.svg";
import LIKED2 from "../../static/icon/liked2.svg";
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
import SYNC from "../../static/icon/sync.svg";
import STAR from "../../static/icon/star.svg";
import RADIO from "../../static/icon/radio.svg";
import LOADING from "../../static/icon/loading.svg";
import SETTING from "../../static/icon/setting.svg";
import DOWNLOAD_FOLDER from "../../static/icon/download-folder.svg";
import LOGOUT from "../../static/icon/logout.svg";
import UPGRADE from "../../static/icon/upgrade.svg";
import WEBSITE from "../../static/icon/website.svg";
import DOWNLOAD from "../../static/icon/download.svg";

import "./index.scss";


export enum IconTypes {
  BACK = "BACK",
  CATEGORY = "CATEGORY",
  SEARCH = "SEARCH",
  SHARE = "SHARE",
  SOURCE = "SOURCE",
  ARTICLE = "ARTICLE",
  ARTICLE_SOLID = "ARTICLE_SOLID",
  SINGLE = "SINGLE",
  SINGLE_SOLID = "SINGLE_SOLID",
  USER = "USER",
  USER_SOLID = "USER_SOLID",
  VOL = "VOL",
  VOL_SOLID = "VOL_SOLID",
  LIKE = "LIKE",
  LIKE2 = "LIKE2",
  LIKED = "LIKED",
  LIKED2 = "LIKED2",
  PLAY = "PLAY",
  PLAY_SOLID = "PLAY_SOLID",
  PAUSE = "PAUSE",
  PAUSE_SOLID = "PAUSE_SOLID",
  LOGO = "LOGO",
  CLOUD = "CLOUD",
  WAVE = "WAVE",
  PRE = "PRE",
  PRE2 = "PRE2",
  NEXT = "NEXT",
  NEXT2 = "NEXT2",
  RANDOM = "RANDOM",
  ARROW_LEFT = "ARROW_LEFT",
  ARROW_RIGHT = "ARROW_RIGHT",
  SHUFFLE = "SHUFFLE",
  LOOP = "LOOP",
  ORDER = "ORDER",
  EXPAND = "EXPAND",
  SYNC = "SYNC",
  STAR = "STAR",
  RADIO = "RADIO",
  LOADING = "LOADING",
  SETTING = "SETTING",
  DOWNLOAD_FOLDER = "DOWNLOAD_FOLDER",
  LOGOUT = "LOGOUT",
  UPGRADE = "UPGRADE",
  WEBSITE = "WEBSITE",
  DOWNLOAD = "DOWNLOAD"
}

export interface Props {
  type: IconTypes;
  className?: string;
  onClick?: (e: any) => void;
  preventDefault?: boolean;
  animate?: boolean;
}

function Icon(props: Props) {
  const { type, className, onClick, preventDefault, animate } = props;

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
    case IconTypes.LIKED:
      src = LIKED;
      break;
    case IconTypes.LIKED2:
      src = LIKED2;
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
    case IconTypes.SYNC:
      src = SYNC;
      break;
    case IconTypes.STAR:
      src = STAR;
      break;
    case IconTypes.RADIO:
      src = RADIO;
      break;
    case IconTypes.LOADING:
      src = LOADING;
      break;
    case IconTypes.SETTING:
      src = SETTING;
      break;
    case IconTypes.DOWNLOAD_FOLDER:
      src = DOWNLOAD_FOLDER;
      break;
    case IconTypes.LOGOUT:
      src = LOGOUT;
      break;
    case IconTypes.UPGRADE:
      src = UPGRADE;
      break;
    case IconTypes.WEBSITE:
      src = WEBSITE;
      break;
    case IconTypes.DOWNLOAD:
      src = DOWNLOAD;
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

  let classNames = `icon ${type}`;
  if (animate) {
    classNames += " animate";
  }
  if (className) {
    classNames += " " + className;
  }

  return (
    <img className={classNames} src={src} onClick={handleClick} alt="icon" />
  );
}

export { Icon };
