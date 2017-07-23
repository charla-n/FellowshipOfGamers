import * as React from "react";
import Label from './Label';

const renderField = ({ input, label, type,
    meta: { asyncValidating, touched, error, warning, dirty },
    placeholder, id, disableCP, hasHelp, help, hasRightGroup, rightGroupHtml, onBlur, min, max, disabled }) => {

    let options = {};

    if (type === "range") {
        options["min"] = min;
        options["max"] = max;
    } else {
        options['className'] = "form-control";
    }
    options["placeholder"] = placeholder;
    options["type"] = type;
    options["id"] = id;
    options["disabled"] = asyncValidating || disabled;
    if (disableCP) {
        options["onPaste"] = (e) => { e.preventDefault(); };
    }
    options["onBlur"] = (event) => {
        input.onBlur(event);
        if (onBlur) {
            onBlur(event);
        }
    };

    let inputContent = (
        <input {...input} {...options} />
    );

    if (hasRightGroup) {
        inputContent = (
            <div className={"input-group"}>
                {inputContent}
                <span className={"input-group-addon"}>
                    {rightGroupHtml}
                </span>
            </div>    
        );
    }
    let labelContent;

    if (label) {
        labelContent = (
            <Label hasHelp={hasHelp} help={help} id={id} label={label} />
        );
    }

    return (
        <div className={asyncValidating ? 'async-validating' : ''}>
            {labelContent}
            {inputContent}
            {touched && ((error && <span className={"validation-message"}>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    )
}

export default renderField;