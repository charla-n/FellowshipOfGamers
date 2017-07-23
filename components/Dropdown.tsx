import * as React from "react";
import * as DropdownList from 'react-widgets/lib/DropdownList';
import Label from './Label';

const renderDropdown = ({ input, label,
    meta: { asyncValidating, touched, error, warning, dirty },
    data, onToggle, valueField, textField, onSearch,
    id, hasHelp, help, hasRightGroup, rightGroupHtml, emptyMessage, placeholder, busy }) => {

    let inputContent;
    let labelContent;
    const helpIconStyle = {
        marginLeft: "5px"
    };
    let options = {};
    let messages = {
        emptyList: emptyMessage,
    };

    if (onSearch) {
        options['filter'] = "contains";
    }

    inputContent = (
        <DropdownList {...input}
            data={data}
            onToggle={onToggle}
            valueField={valueField}
            textField={textField}
            value={input.value}
            onSearch={onSearch}
            {...options}
            messages={messages}
            placeholder={placeholder}
            busy={busy}
            />
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

export default renderDropdown;