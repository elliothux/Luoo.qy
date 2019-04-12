import * as React from "react";
import "./index.scss";

interface EmptyProps {
  id?: string;
}
function Empty(props: EmptyProps) {
  return (
    <div className="empty" id={props.id || ""}>
      Empty
    </div>
  );
}

export { Empty };
