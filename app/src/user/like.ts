import {getUserInfo} from "./info";
import {Forms, postForm} from "../utils";
import {baseHeaders} from "./utils";
import {TrackType} from "../../../view/src/types";


interface LikeResponse {
  status: number,
  msg: string
}

function postFormWithCookie<T>(data: Forms, url: string): Promise<T> {
  const { session, lult } = getUserInfo();
  if (!session || !lult) {
    throw new Error(`Failed to get user collection without cookies`);
  }

  return postForm<T>(data, {
    url,
    cookies: {
      session,
      lult
    },
    headers: baseHeaders
  });
}

async function likeVol(id: ID): Promise<void> {
  const data = { id, res: 1 };
  const res = await postFormWithCookie<LikeResponse>(data, 'http://www.luoo.net/user/like');

  if (res.status !== 1) {
    throw new Error(`Like vol failed with response: ${JSON.stringify(res)}`);
  }
}

async function likeArticle(id: ID): Promise<void> {
  const data = { id, res: 2 };
  const res = await postFormWithCookie<LikeResponse>(data, 'http://www.luoo.net/user/like');

  if (res.status !== 1) {
    throw new Error(`Like vol failed with response: ${JSON.stringify(res)}`);
  }
}

async function likeTrack(type: TrackType, id: ID, fromID: ID) {
  const data = {
    id,
    'res': 3,
    'form[0][res_id]': fromID
  };
  const appIdKey = 'form[0][app_id]';

  switch (type) {
    case TrackType.VOL_TRACK: data[appIdKey] = 1; break;
    case TrackType.SINGLE: data[appIdKey] = 14; break;
    case TrackType.ARTICLE_TRACK: data[appIdKey] = 2; break;
    default: throw new Error(`Invalid track type`);
  }

  const res = await postFormWithCookie<LikeResponse>(data, 'http://www.luoo.net/user/like');

  if (res.status !== 1) {
    throw new Error(`Like vol track failed with response: ${JSON.stringify(res)}`);
  }
}


// likeVol(1382).then(console.log).catch(console.error);
