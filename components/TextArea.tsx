import * as React from "react";
import Label from './Label';

const renderTextArea = ({ input, label,
    meta: { asyncValidating, touched, error, warning, dirty },
    placeholder, id, hasHelp, help, onBlur, disabled }) => {

    let options = {};

    options['className'] = "form-control";
    options["placeholder"] = placeholder;
    options["id"] = id;
    options["disabled"] = asyncValidating || disabled;
    options["onBlur"] = (event) => {
        input.onBlur(event);
        if (onBlur) {
            onBlur(event);
        }
    };

    let inputContent = (
        <textarea rows={5} {...input} {...options} />
    );

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

export default renderTextArea;