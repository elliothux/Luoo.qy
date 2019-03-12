import {action, computed, observable} from "mobx";
import {genRange} from "../utils";


const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;


class Pagination {
    static from = (total: number): Pagination => {
        return new Pagination(total)
    };

    private constructor(total: number) {
        this.total = total;
    }

    @observable
    private readonly total: number = 0;

    @observable
    private currentPage: number = 0;

    @action
    public changeCurrentPage = (page: number) => {
        this.currentPage = page;
    };

    @computed
    public get totalPage(): number {
        return Math.ceil(this.total / PAGE_SCALE);
    }

    @observable
    public paginationCurrentIndex: number = 0;

    @computed
    public get paginationTotalIndex(): number {
        return Math.ceil(this.totalPage / PAGINATION_SCALE);
    }

    @computed
    public get displayPaginations(): number[] {
        const start = this.paginationCurrentIndex * PAGINATION_SCALE;
        const end = Math.min(
            (this.paginationCurrentIndex + 1) * PAGINATION_SCALE,
            this.totalPage
        );
        return genRange(start, end);
    }

    @action
    public nextPagination = () => {
        this.paginationCurrentIndex += 1;
    };

    @action
    public prePagination = () => {
        this.paginationCurrentIndex -= 1;
    };
}

export {
    Pagination
}
