import * as React from "react";

const ListEmpty = ({
    Message
}) =>
    <div className={"align-center"}>
        <i className={"fa fa-meh-o fa-4x"}></i>
        <h4>
            {Message}
        </h4>
    </div>;

export default ListEmpty;