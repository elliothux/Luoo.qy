import {action, computed, observable} from "mobx";
import {ViewTypes, VolInfo} from "../@types";
import {events, EventTypes, genRange} from "../utils";
import {volStore} from "./vol";
import {store, userStore} from "./index";


class UserCollectionVolsStore {
    @observable
    public likedVols: ReadonlyArray<VolInfo> = [];

    protected volPageScale = 3 * 4;

    @observable
    public volCurrentPage: number = 0;

    @computed
    public get volTotalPage(): number {
        return Math.ceil(this.likedVols.length / this.volPageScale);
    }

    @computed
    public get displayLikedVols(): VolInfo[] {
        const start = this.volCurrentPage * this.volPageScale;
        const end = Math.min(
            (this.volCurrentPage + 1) * this.volPageScale,
            this.likedVols.length
        );
        return this.likedVols.slice(start, end);
    }

    @action
    public toggleVolIndex = (page: number) => {
        events.emit(EventTypes.ScrollBackVols, true);
        this.volCurrentPage = page;
    };

    protected paginationScale = 9;

    @observable
    public volPaginationCurrentIndex: number = 0;

    @computed
    public get volPaginationTotalIndex(): number {
        return Math.ceil(this.volTotalPage / this.paginationScale);
    }

    @computed
    public get displayVolPaginations(): number[] {
        const start = this.volPaginationCurrentIndex * this.paginationScale;
        const end = Math.min(
            (this.volPaginationCurrentIndex + 1) * this.paginationScale,
            this.volTotalPage
        );
        return genRange(start, end);
    }

    @action
    public nextVolPagination = () => {
        this.volPaginationCurrentIndex += 1;
    };

    @action
    public preVolPagination = () => {
        this.volPaginationCurrentIndex -= 1;
    };

    @observable
    public selectedLikedVolIndex: number = 0;

    @computed
    public get selectedLikedVol(): VolInfo {
        return this.displayLikedVols[this.selectedLikedVolIndex];
    }

    @action
    public selectLikedVol = (volIndex: number) => {
        volStore.isShowCollection = true;
        this.selectedLikedVolIndex = volIndex;
        store.changeView(ViewTypes.VOL_INFO);
        store.changeBackground(ViewTypes.USER);
    };
}


const userCollectionVolsStore = new UserCollectionVolsStore();

export {
    userCollectionVolsStore
}
