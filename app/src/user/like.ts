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

async function likeVolTrack(id: ID): Promise<void> {
  const data = { id, res: 3 };
  const res = await postFormWithCookie<LikeResponse>(data, 'http://www.luoo.net/user/like');

  if (res.status !== 1) {
    throw new Error(`Like vol track failed with response: ${JSON.stringify(res)}`);
  }
}

async function likeSingle(id: ID,)

async function likeTrack(id: ID, type: TrackType): Promise<void> {
  const data = {
    id,
    res: 3,
  };
  if (type === TrackType.SINGLE) {
    data['from[0][app_id]'] = 14;
    data['from[0][res_id]'] = 578
  }
  switch (type) {
    case TrackType.VOL_TRACK: res = 3; break;
    case TrackType.SINGLE:
  }
}


likeVol(1382).then(console.log).catch(console.error);
