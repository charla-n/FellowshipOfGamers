declare var require;

import * as React from "react";
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import renderField from "../components/Field";
var ReduxForm = require('redux-form');

export interface YoureSpecialProps {
    Resource: any;
    editing: boolean;
}

export class YoureSpecial extends React.Component<YoureSpecialProps, {}> {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h4>{this.props.Resource ? this.props.Resource.yourespecial : ""}</h4>
                <div>
                    <span>
                        {this.props.Resource ? this.props.Resource.howdescribeyou : ""}
                    </span>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <ReduxForm.Field name="strength"
                            id={"strength-input"}
                            type="range"
                            label={this.props.Resource ? this.props.Resource.strength : ""}
                            component={renderField}
                            min="0"
                            max="10"
                            disabled={!this.props.editing}
                            />
                    </div>
                    <div className={"col-md-6"}>
                        <ReduxForm.Field name="perception"
                            id={"perception-input"}
                            type="range"
                            label={this.props.Resource ? this.props.Resource.perception : ""}
                            component={renderField}
                            min="0"
                            max="10"
                            disabled={!this.props.editing}
                            />
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"col-md-6"}>
                        <ReduxForm.Field name="endurance"
                            id={"endurance-input"}
                            type="range"
                            label={this.props.Resource ? this.props.Resource.endurance : ""}
                            component={renderField}
                            min="0"
                            max="10"
                            disabled={!this.props.editing}
                            />
                    </div>
                    <div className={"col-md-6"}>
                        <ReduxForm.Field name="charisma"
                            id={"charisma-input"}
                            type="range"
                            label={this.props.Resource ? this.props.Resource.charisma : ""}
                            component={renderField}
                            min="0"
                            max="10"
                            disabled={!this.props.editing}
                            />
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"col-md-6"}>
                        <ReduxForm.Field name="intelligence"
                            id={"intelligence-input"}
                            type="range"
                            label={this.props.Resource ? this.props.Resource.intelligence : ""}
                            component={renderField}
                            min="0"
                            max="10"
                            disabled={!this.props.editing}
                            />
                    </div>
                    <div className={"col-md-6"}>
                        <ReduxForm.Field name="agility"
                            id={"agility-input"}
                            type="range"
                            label={this.props.Resource ? this.props.Resource.agility : ""}
                            component={renderField}
                            min="0"
                            max="10"
                            disabled={!this.props.editing}
                            />
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"col-md-6"}>
                        <ReduxForm.Field name="luck"
                            id={"luck-input"}
                            type="range"
                            label={this.props.Resource ? this.props.Resource.luck : ""}
                            component={renderField}
                            min="0"
                            max="10"
                            disabled={!this.props.editing}
                            />
                    </div>
                </div>
                <div className={"clearfix"}></div>
            </div>    
        );
    }
}

export default YoureSpecial;