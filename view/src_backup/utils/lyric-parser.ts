export interface LrcLine {
  timestamp: number;
  text: string;
}

interface MetaInfo {
  [key: string]: string;
}

interface IdTag {
  name: string;
  id: string;
  re: RegExp;
  handler?: (...args: any[]) => any;
}

function isEmpty(obj: object) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

class LyricParser {
  private timestampOffset: number = 0;

  private lyricsAll: LrcLine[] = [];

  private metaInfo: MetaInfo = {};

  private ID_TAGS: IdTag[] = [
    { name: "artist", id: "ar", re: /\[ar:(.*)]$/g },
    { name: "album", id: "al", re: /\[al:(.*)]$/g },
    { name: "title", id: "ti", re: /\[ti:(.*)]$/g },
    { name: "author", id: "au", re: /\[au:(.*)]$/g },
    { name: "length", id: "length", re: /\[length:(.*)]$/g },
    { name: "by", id: "by", re: /\[by:(.*)]$/g },
    { name: "offset", id: "offset", re: /\[offset:(.*)]$/g },
    { name: "createdBy", id: "re", re: /\[re:(.*)]$/g },
    { name: "createdByVersion", id: "ve", re: /\[ve:(.*)]$/g }
  ];

  public constructor(text: string) {
    if (text) {
      this.load(text);
    }
    const offset = this.ID_TAGS.find(i => i.name === "offset");
    if (offset) {
      offset.handler = this.setTimestampOffset;
    }
  }

  private load = (text: string) => {
    const linesAll = text.split("\n");
    for (let i = 0; i < linesAll.length; i++) {
      let line = linesAll[i].replace(/(^\s*)|(\s*$)/g, "");
      if (!line) {
        continue;
      }

      //Parse ID Tags
      let isIdTag = false;
      for (let j = 0; j < this.ID_TAGS.length; j++) {
        const match = this.ID_TAGS[j].re.exec(line);
        if (!match || match.length < 2) {
          continue;
        }

        isIdTag = true;
        const value = match[1].replace(/(^\s*)|(\s*$)/g, "");
        const handler = this.ID_TAGS[j].handler;
        if (handler) {
          this.metaInfo[this.ID_TAGS[j].name] = handler.call(this, value);
        } else {
          this.metaInfo[String(this.ID_TAGS[j].name)] = String(value);
        }
      }
      if (isIdTag) {
        continue;
      }

      //Parse lyrics
      const timestamp_all = Array();
      while (true) {
        const match = /^(\[\d+:\d+(.\d+)?\])(.*)/g.exec(line);
        if (match) {
          timestamp_all.push(match[1]);
          line = match[match.length - 1].replace(/(^\s*)|(\s*$)/g, "");
        } else {
          break;
        }
      }
      for (let j = 0; j < timestamp_all.length; j++) {
        const ts_match = /^\[(\d{1,2}):(\d|[0-5]\d)(\.(\d+))?\]$/g.exec(
          timestamp_all[j]
        );
        if (ts_match && line.trim()) {
          this.lyricsAll.push({
            timestamp:
              Number(ts_match[1]) * 60 +
              Number(ts_match[2]) +
              (ts_match[4] ? Number("0." + ts_match[4]) : 0),
            text: line
          });
        }
      }
    }

    this.lyricsAll.sort(function(a, b) {
      return a.timestamp > b.timestamp ? 1 : -1;
    });
    if (!this.lyricsAll.length) {
      this.lyricsAll = [];
    }
    if (isEmpty(this.metaInfo)) {
      this.metaInfo = {};
    }
    return this.lyricsAll.length !== 0 || !isEmpty(this.metaInfo);
  };

  private setTimestampOffset = (offset: number): number => {
    this.timestampOffset = isNaN(offset) ? 0 : Number(offset) / 1000;
    return Number(offset);
  };

  public getLyrics = () => {
    return this.lyricsAll;
  };

  public getLyric = (index: number): LrcLine | undefined => {
    return this.lyricsAll[index];
  };

  public getIDTags = () => {
    return this.metaInfo;
  };

  public select = (ts: number) => {
    if (isNaN(ts)) {
      return -1;
    }
    const timestamp = Number(ts) + this.timestampOffset;
    if (timestamp < this.lyricsAll[0].timestamp) {
      return -1;
    }
    let i = 0;
    for (i; i < this.lyricsAll.length - 1; i++) {
      if (
        this.lyricsAll[i].timestamp <= timestamp &&
        this.lyricsAll[i + 1].timestamp > timestamp
      ) {
        break;
      }
    }
    return i;
  };
}

export { LyricParser };
