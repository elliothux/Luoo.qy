import {action, computed, observable} from "mobx";
import {ViewTypes, VolInfo, VolTrack} from "../@types";
import {events, EventTypes, genRange} from "../utils";
import {volStore} from "./vol";
import {store, userStore} from "./index";


class UserCollectionVolTracksStore {
    @observable
    public likedVolTracks: ReadonlyArray<VolTrack> = [];

    protected trackPageScale = 3 * 4;

    @observable
    public trackCurrentPage: number = 0;

    @computed
    public get trackTotalPage(): number {
        return Math.ceil(this.likedVolTracks.length / this.trackPageScale);
    }

    @computed
    public get displayLikedTracks(): VolTrack[] {
        const start = this.trackCurrentPage * this.trackPageScale;
        const end = Math.min(
            (this.trackCurrentPage + 1) * this.trackPageScale,
            this.likedVolTracks.length
        );
        return this.likedVolTracks.slice(start, end);
    }

    @action
    public toggleTrackIndex = (page: number) => {
        events.emit(EventTypes.ScrollBackVols, true);
        this.trackCurrentPage = page;
    };

    protected paginationScale = 9;

    @observable
    public trackPaginationCurrentIndex: number = 0;

    @computed
    public get trackPaginationTotalIndex(): number {
        return Math.ceil(this.trackTotalPage / this.paginationScale);
    }

    @computed
    public get displayTrackPaginations(): number[] {
        const start = this.trackPaginationCurrentIndex * this.paginationScale;
        const end = Math.min(
            (this.trackPaginationCurrentIndex + 1) * this.paginationScale,
            this.trackTotalPage
        );
        return genRange(start, end);
    }

    @action
    public nextTrackPagination = () => {
        this.trackPaginationCurrentIndex += 1;
    };

    @action
    public preTrackPagination = () => {
        this.trackPaginationCurrentIndex -= 1;
    };

    @observable
    public selectedLikedVolTrackIndex: number = 0;

    @computed
    public get selectedLikedVol(): VolTrack {
        return this.displayLikedTracks[this.selectedLikedVolTrackIndex];
    }

    @action
    public selectLikedVolTrack = (trackIndex: number) => {
        volStore.isShowCollection = true;
        this.selectedLikedVolTrackIndex = trackIndex;
        store.changeView(ViewTypes.PLAYING);
        store.changeBackground(ViewTypes.USER);
    };
}


const userCollectionVolTracksStore = new UserCollectionVolTracksStore();

export {
    userCollectionVolTracksStore
}
