import * as React from "react";
import {ViewTypes, VolTypeItem, VolTypesList} from "../../types";
import "./index.scss";
import {volStore} from "../../store";

function renderCategoryItem(i: VolTypeItem) {
  const { type, name, img, value } = i;
  const onClick = () => volStore.changeVolType(value);
  return (
    <div key={type} className="category-item" onClick={onClick}>
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

function Category() {
  return (
    <div id="vol-types" className={`page view-${ViewTypes.VOLS_TYPE}`}>
        {VolTypesList.map(renderCategoryItem)}
    </div>
  );
}

export { Category };
