import * as React from "react";

const renderCheckbox = ({ input, label, type,
    meta: { touched, error, warning, dirty },
    placeholder, id }) => {

    let inputContent;
    let fullContent;

    inputContent = (
        <input {...input} placeholder={placeholder} type={type} id={id}
            />
    );
    fullContent = (
        <label className={"control-label"} htmlFor={id}>
            {inputContent}
            <span dangerouslySetInnerHTML={{ __html: label }}></span>
        </label>
    );

    return (
        <div>
            {fullContent}
            <br/>
            {touched && ((error && <span className={"validation-message"}>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    )
}

export default renderCheckbox;