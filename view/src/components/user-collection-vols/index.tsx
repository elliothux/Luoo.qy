import * as React from "react";
import { userStore } from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import { VolInfo } from "../../@types";
import { VolItem } from "../vol-item";
import "./index.scss";

function renderVols(vols: ReadonlyArray<VolInfo>) {
  return vols.map((vol, index) => (
    <VolItem volInfo={vol} key={vol.id} index={index} isPlaying={false} isLiked={false} />
  ));
}

function UserCollectionVols() {
  const { isFetching, likedVols } = userStore;

  if (isFetching) {
    return <Loading />;
  }

  if (likedVols.length === 0) {
    return <Empty />;
  }

  return (
      <div id="user-collection-vols">
          {renderVols(likedVols)}
      </div>
  );
}


export {
    UserCollectionVols
}
