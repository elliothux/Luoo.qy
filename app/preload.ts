import * as fs from "fs";
import * as path from "path";
import { ArticleInfo, Single, VolInfo } from "./types";

enum PreloadType {
  VOLS,
  SINGLES,
  TRACKS
}

function getPreloadFile(type: PreloadType): string {
  let fileName: string;
  switch (type) {
    case PreloadType.VOLS: {
      fileName = "vols.json";
      break;
    }
    case PreloadType.SINGLES: {
      fileName = "singles.json";
      break;
    }
    case PreloadType.TRACKS: {
      fileName = "articles.json";
      break;
    }
    default: {
      throw new Error("Invalid type");
    }
  }
  const filePath = path.join(__dirname, "../static/preload/", fileName);
  return fs.readFileSync(filePath, { encoding: "utf-8" });
}

function getPreloadVols(): VolInfo[] {
  const volsStr = getPreloadFile(PreloadType.VOLS);
  return JSON.parse(volsStr) as VolInfo[];
}

function getPreloadSingles(): Single[] {
  const singlesStr = getPreloadFile(PreloadType.SINGLES);
  return JSON.parse(singlesStr) as Single[];
}

function getPreloadArticles(): ArticleInfo[] {
  const articlesStr = getPreloadFile(PreloadType.SINGLES);
  return JSON.parse(articlesStr) as ArticleInfo[];
}

export { getPreloadVols, getPreloadSingles, getPreloadArticles };
