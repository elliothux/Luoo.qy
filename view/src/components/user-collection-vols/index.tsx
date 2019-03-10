import * as React from "react";
import { observer } from "mobx-react";
import {playerStore, userStore} from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import { VolInfo } from "../../@types";
import { VolItem } from "../vol-item";
import "./index.scss";
import {Pagination} from "../pagination";

function renderVols(vols: ReadonlyArray<VolInfo>) {
  return vols.map((vol, index) => (
    <VolItem
      volInfo={vol}
      key={vol.id}
      index={index}
      isPlaying={playerStore.isVolPlaying(vol.id)}
      isLiked={false}
      isInUserCollection
    />
  ));
}

function IUserCollectionVols() {
  const { isFetching, likedVols, displayLikedVols } = userStore;

  if (isFetching) {
    return <Loading />;
  }

  if (likedVols.length === 0) {
    return <Empty />;
  }

  return <div id="user-collection-vols">
    {renderVols(displayLikedVols)}
    <Pagination
        pages={userStore.displayVolPaginations}
        currentPage={userStore.volCurrentPage}
        togglePage={userStore.toggleVolIndex}
        paginationCurrentIndex={userStore.volPaginationCurrentIndex}
        paginationTotalIndex={userStore.volPaginationTotalIndex}
        onNext={userStore.nextVolPagination}
        onPre={userStore.preVolPagination}
    />
  </div>;
}

const UserCollectionVols = observer(IUserCollectionVols);

export { UserCollectionVols };
