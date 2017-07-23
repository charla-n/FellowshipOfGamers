import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import Loading from "../components/Loading";
import Stars from "./Stars";

export interface PlayerAverageReputationProps {
    AverageReputation: number;
}

export class PlayerAverageReputation extends React.Component<PlayerAverageReputationProps, {}> {

    constructor() {
        super();
    }

    render() {

        var content;

        content = (
            <div>
                <div className={"align-center"}>
                    <h3>{this.props.AverageReputation}/5</h3>
                </div>
                <Stars
                    Classes={"align-center player-average-reputation-star"}
                    Value={this.props.AverageReputation}
                    />
            </div>
        );

        return (
            <div>
                {content}
            </div>    
        );
    }
}

export default PlayerAverageReputation;