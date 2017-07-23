import * as React from 'react'

const Alert = ({
    Message,
    AlertType
}) => {

    let hasError = false;

    let content = Message.map((val, idx) => {
        if (val) {
            return val.map((val2, idx2) => {
                hasError = true;
                return (
                    <div key={`alert_${idx2}`}>
                        <span dangerouslySetInnerHTML={{ __html: val2 }}></span>
                    </div>
                );
            });
        }
    });

    return (
        <div className={`alert alert-${AlertType} ${hasError ? '' : 'collapse'}`}>
            {content}
        </div>    
    );
}

export default Alert;