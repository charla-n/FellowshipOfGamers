import * as React from "react";
import Separator from "./Separator";

const RefineButton = ({onFilterClick, loading, Resource}) =>
    <div>
        <Separator/>
        <button disabled={loading}
            onClick={onFilterClick}
            className={'btn btn-primary'}>
            <i className={"fa fa-filter"} aria-hidden="true"></i>
            <span> {Resource ? Resource.refine : ''}</span>
        </button>
    </div>
    ;

export default RefineButton;