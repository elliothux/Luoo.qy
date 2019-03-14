import * as React from "react";
import { observer } from "mobx-react";
import { userStore, collectionVolStore } from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import { VolInfo } from "../../types";
import { VolItem } from "../vol-item";
import { Pagination } from "../pagination";
import "./index.scss";

function renderVols(vols: VolInfo[]) {
  return vols.map(vol => (
    <VolItem
      key={vol.id}
      id={vol.id}
      cover={vol.cover}
      title={vol.title}
      tags={vol.tags}
      color={vol.color}
      vol={vol.vol}
      isPlaying={false}
      isLiked={true}
      onToggle={() => {}}
    />
  ));
}

function IUserCollectionVols() {
  const { displayedItems, isFetching, pagination } = collectionVolStore;

  if (isFetching) {
    return <Loading />;
  }

  if (displayedItems.length === 0) {
    return <Empty />;
  }

  return (
    <div id="user-collection-vols">
      {renderVols(displayedItems)}
      <Pagination store={pagination} />
    </div>
  );
}

const UserCollectionVols = observer(IUserCollectionVols);

export { UserCollectionVols };
