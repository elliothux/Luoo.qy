import {
  getUserInfo,
  getUserLikedArticleIds,
  getUserLikedTrackIds,
  getUserLikedVolIds,
  setUserLikedArticleIds,
  setUserLikedTrackIds,
  setUserLikedVolIds
} from "./info";
import { Forms, postForm } from "../utils";
import { baseHeaders } from "./utils";
import { TrackType } from "../types";

interface LikeResponse {
  status: number;
  msg: string;
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

/*
@desc Vol
 */
async function requestLikeVol(id: ID): Promise<number> {
  const data = { id, res: 1 };
  const res = await postFormWithCookie<LikeResponse>(
    data,
    "http://www.luoo.net/user/like"
  );

  return res.status;
}

async function likeVol(id: ID): Promise<ID[]> {
  const retCode = await requestLikeVol(id);
  if (retCode !== 1) {
    throw new Error(`Like vol failed with response: res.status = ${retCode}`);
  }

  const likedVolIds = getUserLikedVolIds();
  likedVolIds.push(id);
  setUserLikedVolIds(likedVolIds);
  return likedVolIds;
}

async function unlikeVol(id: ID): Promise<ID[]> {
  const retCode = await requestLikeVol(id);
  if (retCode !== 2) {
    throw new Error(`Unlike vol failed with response: res.status = ${retCode}`);
  }

  const likedVolIds = getUserLikedVolIds().filter(i => i !== id);
  setUserLikedVolIds(likedVolIds);
  return likedVolIds;
}

/*
@desc Article
 */
async function requestLikeArticle(id: ID): Promise<number> {
  const data = { id, res: 2 };
  const res = await postFormWithCookie<LikeResponse>(
    data,
    "http://www.luoo.net/user/like"
  );

  return res.status;
}

async function likeArticle(id: ID): Promise<ID[]> {
  const retCode = await requestLikeArticle(id);
  if (retCode !== 1) {
    throw new Error(
      `Like article failed with response: res.status = ${retCode}`
    );
  }

  const likedArticleIds = getUserLikedArticleIds();
  likedArticleIds.push(id);
  setUserLikedArticleIds(likedArticleIds);
  return likedArticleIds;
}

async function unlikeArticle(id: ID): Promise<ID[]> {
  const retCode = await requestLikeVol(id);
  if (retCode !== 2) {
    throw new Error(
      `Unlike article failed with response: res.status = ${retCode}`
    );
  }

  const likedArticleIds = getUserLikedArticleIds().filter(i => i !== id);
  setUserLikedVolIds(likedArticleIds);
  return likedArticleIds;
}

/*
@desc Track
 */
async function requestLikeTrack(type: TrackType, id: ID, fromID: ID) {
  const data = {
    id,
    res: 3,
    "form[0][res_id]": fromID,
    "form[0][app_id]": 0
  };
  const appIdKey = "form[0][app_id]";

  switch (type) {
    case TrackType.VOL_TRACK:
      data[appIdKey] = 1;
      break;
    case TrackType.SINGLE:
      data[appIdKey] = 14;
      break;
    case TrackType.ARTICLE_TRACK:
      data[appIdKey] = 2;
      break;
    default:
      throw new Error(`Invalid track type`);
  }

  const res = await postFormWithCookie<LikeResponse>(
    data,
    "http://www.luoo.net/user/like"
  );

  return res.status;
}

async function likeTrack(type: TrackType, id: ID, fromID: ID): Promise<ID[]> {
  const retCode = await requestLikeTrack(type, id, fromID);
  if (retCode !== 1) {
    throw new Error(
      `Like ${type} failed with response: res.status = ${retCode}`
    );
  }

  const likedTrackIds = getUserLikedTrackIds();
  likedTrackIds.push(id);
  setUserLikedTrackIds(likedTrackIds);
  return likedTrackIds;
}

async function unlikeTrack(type: TrackType, id: ID, fromID: ID): Promise<ID[]> {
  const retCode = await requestLikeTrack(type, id, fromID);
  if (retCode !== 2) {
    throw new Error(
      `Unlike ${type} failed with response: res.status = ${retCode}`
    );
  }

  const likedTrackIds = getUserLikedTrackIds().filter(i => i !== id);
  setUserLikedTrackIds(likedTrackIds);
  return likedTrackIds;
}

export {
  likeVol,
  unlikeVol,
  likeArticle,
  unlikeArticle,
  likeTrack,
  unlikeTrack
};
