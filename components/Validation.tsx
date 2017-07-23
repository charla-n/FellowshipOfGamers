import * as React from "react";
import * as DropdownList from 'react-widgets/lib/DropdownList';
import Label from './Label';

const renderValidation = ({
    meta: { asyncValidating, touched, error, warning, dirty },
    }) => {

    return (
        <div className={asyncValidating ? 'async-validating' : ''}>
            {touched && ((error && <span className={"validation-message"}>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    )
}

export default renderValidation;