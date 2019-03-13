import * as React from "react";
import { volStore } from "../../store";
import { ViewTypes, VolType, VolTypeItem, VolTypesMap } from "../../types";
import { Route } from "../../components/Route";
import "./index.scss";

let volTypesRef: HTMLDivElement;

function getVolTypesRef(i: Maybe<HTMLDivElement>) {
  volTypesRef = i as HTMLDivElement;
}

function renderVolTypeItem(type: VolType) {
  const { name, img } = VolTypesMap.get(type) as VolTypeItem;
  return (
    <div
      key={type}
      className="category-item"
      onClick={() => volStore.setType(type)}
    >
      <p className="category-item-name">{name}</p>
      <p className="category-item-type">{type}</p>
      <div
        className="category-item-bg"
        style={{
          backgroundImage: `url(${img})`
        }}
      />
    </div>
  );
}

function VolTypes() {
  const keys = Array.from<VolType>(VolTypesMap.keys());
  return (
    <Route
      view={ViewTypes.VOLS_TYPE}
      id="vol-types"
      getRef={getVolTypesRef}
    >
      {keys.map(type => renderVolTypeItem(type))}
    </Route>
  );
}

export { VolTypes };
