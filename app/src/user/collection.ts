import { getUserInfo } from "./info";
import { getHTMLDOM } from "../utils";
import { baseHeaders } from "./utils";

async function getRequestCookies(): Promise<{ session: string; lult: string }> {
  const session = await getUserInfo("session");
  const lult = await getUserInfo("lult");
  if (!session || !lult) {
    throw new Error(`Failed to get user collection without cookies`);
  }
  return {
    session,
    lult
  };
}

type trackId = number;
async function getLikedTracks(): Promise<trackId[]> {
  const page = await getHTMLDOM({
    url: url(1),
    cookies: await getRequestCookies(),
    headers: baseHeaders
  });

  const liked = getLikedTrackFromDOM(page);
  console.log(liked);
  return liked;

  function url(page: number) {
    return `http://www.luoo.net/user/singles?p=${page}`;
  }
}

function getLikedTrackFromDOM(page: Document): trackId[] {
  return Array.from<HTMLLIElement>(
    page.querySelectorAll(".fav-singles > ul > li.track-item.rounded")
  ).map((i: HTMLLIElement) => {
    const id = i
      .getAttribute("id")
      .replace("track", "")
      .trim();
    return parseInt(id, 10);
  });
}

// type volId = number;
// async function getLikedVols(): Promise<volId[]> {
//
// }
//
// type articleId = number;
// async function getLikedArticles(): Promise<articleId[]> {
//
// }


getLikedTracks()
    .then(i => {
        console.log(i);
        process.exit();
    })
    .catch(e => {
        console.error(e);
        process.exit();
    });