import { action, computed, observable, reaction } from "mobx";
import { Pagination } from "../pagination";
import {FindOptions, Track, TrackType} from "../../types";
import {getIPC} from "../../utils";

const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;


const ipc = getIPC();

class SearchTrack {
  constructor() {
    this.initReaction();
  }

  private initReaction = () => {
    reaction(() => {
      const { start } = this.pagination;
      return [this.total, start];
    }, this.updateDisplayedItems);
  };

  @observable
  private ids: Maybe<ID[]> = null;

  public getIds = (): ID[] => {
    return this.ids || [];
  };

  @action
  public setIds = (ids: Maybe<ID[]>) => {
    this.ids = ids
  };

  @computed
  public get isLoading(): boolean {
    return !this.ids;
  }

  @computed
  private get total(): number {
    return (this.ids || []).length;
  }

  @computed
  public get pagination(): Pagination {
    return Pagination.from(this.total, PAGE_SCALE, PAGINATION_SCALE);
  }

  /*
    @desc DisplayedItems
     */
  @observable
  public displayedItems: Track[] = [];

  @action
  private updateDisplayedItems = async () => {
    if (!this.ids) {
      return;
    }

    const from = this.pagination.start;
    const to = from + PAGE_SCALE;
    const options: FindOptions = {
      query: { id: { $in: this.ids.slice(from, to) } },
      sort: { id: -1 }
    };

    const [iVolTracks, iSingles, iArticleTracks] = await Promise.all([
      ipc.db.volTrack.find<Track>(options),
      ipc.db.single.find<Track>(options),
      ipc.db.articleTrack.find<Track>(options)
    ]);

    const volTracks = iVolTracks.map(i => ({
      ...i,
      type: TrackType.VOL_TRACK
    }));
    let volTrackIds = volTracks.map(i => i.id);

    const singles = iSingles
        .filter(i => !volTrackIds.includes(i.id))
        .map(i => ({ ...i, type: TrackType.SINGLE }));
    const singleAndVolTrackIds = [...volTrackIds, ...singles.map(i => i.id)];

    const articleTracks = iArticleTracks
        .filter(i => !singleAndVolTrackIds.includes(i.id))
        .map(i => ({ ...i, type: TrackType.ARTICLE_TRACK }));

    this.displayedItems = [...volTracks, ...singles, ...articleTracks];
  };
}

const searchTrackStore = new SearchTrack();

export { searchTrackStore };
