import * as React from "react";

const RefineFilterTitle = ({ Resource }) =>
    <h5>
        <u>
            {Resource ? Resource.filter : ''}
        </u>
    </h5>
    ;

export default RefineFilterTitle;