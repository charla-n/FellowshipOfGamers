declare var require;

import * as React from "react";
//import * as Multiselect from 'react-widgets/lib/Multiselect';
var Multiselect = require('react-widgets/lib/Multiselect');
import Label from './Label';

const renderMultiselect = ({ input, label,
    meta: { asyncValidating, touched, error, warning, dirty },
    data, valueField, textField, onSearch, onCreate, onToggle,
    id, hasHelp, help, emptyMessage, placeholder, busy }) => {

    let inputContent;
    let labelContent;
    const helpIconStyle = {
        marginLeft: "5px"
    };

    let messages = {
        emptyList: emptyMessage,
    };

    inputContent = (
        <Multiselect {...input}
            data={data}
            valueField={valueField}
            textField={textField}
            value={input.value || []}
            onSearch={onSearch}
            onBlur={() => input.onBlur()}
            onCreate={onCreate}
            messages={messages}
            onToggle={onToggle}
            placeholder={placeholder}
            busy={busy}
            />
    );
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

export default renderMultiselect;