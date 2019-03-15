import {
  getUserInfo,
  setUserLikedArticleIds,
  setUserLikedTrackIds,
  setUserLikedVolIds
} from "./info";
import { getHTMLDOM } from "../utils";
import {baseHeaders} from "./utils";

async function getCollectionHTMLDOM(url: string): Promise<Document> {
  const { session, lult } = getUserInfo();
  if (!session || !lult) {
    throw new Error(`Failed to get user collection without cookies`);
  }

  return getHTMLDOM({
    url,
    cookies: {
      session,
      lult
    },
    headers: baseHeaders
  });
}

function getLastPageFromDoc(page: Document): Maybe<number> {
  const paginator = Array.from(
    page.querySelectorAll(".paginator > .page")
  ).pop();
  if (!paginator) {
    return null;
  }
  return parseInt(paginator.innerHTML, 10);
}

/*
@desc Get user liked tracks id
 */
type TrackId = number;
async function getLikedTracksFromCGI(): Promise<TrackId[]> {
  const firstPage = await getCollectionHTMLDOM(url(1));

  let liked = getLikedTrackFromDoc(firstPage);
  const lastPage = getLastPageFromDoc(firstPage);
  if (lastPage) {
    for (let i = 2; i <= lastPage; i++) {
      const page = await getCollectionHTMLDOM(url(i));
      const likedOfPage = getLikedTrackFromDoc(page);
      liked = [...liked, ...likedOfPage];
    }
  }

  return liked;

  function url(page: number) {
    return `http://www.luoo.net/user/singles?p=${page}`;
  }
}

function getLikedTrackFromDoc(page: Document): TrackId[] {
  return Array.from<Element>(
    page.querySelectorAll(".fav-singles li.track-item")
  )
    .map<TrackId>((i: Element) => {
      const id = (i as HTMLElement).getAttribute("id");
      if (!id) return 0;
      return parseInt(id.replace("track", "").trim(), 10);
    })
    .filter(i => !!i);
}

async function fetchAndSaveLikedTracks(): Promise<number[]> {
  const tracks = await getLikedTracksFromCGI();
  setUserLikedTrackIds(tracks);
  return tracks;
}

/*
@desc Get user liked vols id
 */
type VolId = number;
async function getLikedVolsFromCGI(): Promise<VolId[]> {
  const firstPage = await getCollectionHTMLDOM(url(1));

  let liked = getLikedVolFromDoc(firstPage);
  const lastPage = getLastPageFromDoc(firstPage);
  if (lastPage) {
    for (let i = 2; i <= lastPage; i++) {
      const page = await getCollectionHTMLDOM(url(i));
      const likedOfPage = getLikedVolFromDoc(page);
      liked = [...liked, ...likedOfPage];
    }
  }

  return liked;

  function url(page: number) {
    return `http://www.luoo.net/user/vols?p=${page}`;
  }
}

function getLikedVolFromDoc(page: Document): VolId[] {
  return Array.from<Element>(page.querySelectorAll(".fav-vols a.cover-wrapper"))
    .map<VolId>((i: Element) => {
      const href = (i as HTMLElement).getAttribute("href");
      if (!href) return 0;
      const id = href.split("/").pop();
      if (!id) return 0;
      return parseInt(id, 10);
    })
    .filter(i => !!i);
}

async function fetchAndSaveLikedVols(): Promise<number[]> {
  const vols = await getLikedVolsFromCGI();
  setUserLikedVolIds(vols);
  return vols;
}

/*
@desc Get user liked articles id
 */
type ArticleId = number;
async function getLikedArticlesFromCGI(): Promise<ArticleId[]> {
  const firstPage = await getCollectionHTMLDOM(url(1));

  let liked = getLikedArticleFromDoc(firstPage);
  const lastPage = getLastPageFromDoc(firstPage);
  if (lastPage) {
    for (let i = 2; i <= lastPage; i++) {
      const page = await getCollectionHTMLDOM(url(i));
      const likedOfPage = getLikedArticleFromDoc(page);
      liked = [...liked, ...likedOfPage];
    }
  }

  return liked;

  function url(page: number) {
    return `http://www.luoo.net/user/essays?p=${page}`;
  }
}

function getLikedArticleFromDoc(page: Document): ArticleId[] {
  return Array.from<Element>(
    page.querySelectorAll(".fav-essays a.cover-wrapper")
  )
    .map<ArticleId>((i: Element) => {
      const href = (i as HTMLElement).getAttribute("href");
      if (!href) return 0;
      const id = href.split("/").pop();
      if (!id) return 0;
      return parseInt(id, 10);
    })
    .filter(i => !!i);
}

async function fetchAndSaveLikedArticles(): Promise<number[]> {
  const articles = await getLikedArticlesFromCGI();
  setUserLikedArticleIds(articles);
  return articles;
}

export {
  fetchAndSaveLikedVols,
  fetchAndSaveLikedTracks,
  fetchAndSaveLikedArticles
};
