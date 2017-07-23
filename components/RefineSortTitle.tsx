import * as React from "react";

const RefineSortTitle = ({Resource}) =>
    <h5>
        <u>
            {Resource ? Resource.sort : ''}
        </u>
    </h5>
    ;

export default RefineSortTitle;