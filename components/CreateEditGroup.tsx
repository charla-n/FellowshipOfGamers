declare var require;

import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import EmojiPopover from "./EmojiPopover";
import renderField from "../components/Field";
import renderDropdown from "../components/Dropdown";
import renderMultiselect from "../components/Multiselect";
import renderValidation from "../components/Validation";
import * as DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Label from '../components/Label';
//import * as Moment from 'moment';
import { Field } from 'redux-form';
import * as constants from "../utils/Constants";
import CropperModal from "../components/CropperModal";
import MarkdownEditor from "../components/MarkdownEditor";
var Moment = require('Moment');

export interface CreateEditGroupProps {
    ID: number;
    isCreate: boolean;
    Resource: any;
    Games: any;
    FetchGames: any;
    CreateGameTag: any;
    gamesLoading: boolean;
    onEditorChange: any;
    WhenDateChanged: any;
    languages: any;
    FetchLanguages: any;
    languageLoading: boolean;
    FetchCommunications: any;
    communications: any;
    communicationsLoading: boolean;
    FetchPlayStyles: any;
    playStyles: any;
    playStylesLoading: boolean;
    FetchAges: any;
    ages: any;
    agesLoading: boolean;
    loading: boolean;
    description: string;
    when: Date;
    onCropClick: any;
    image: any;
}

export interface CreateEditGroupState {
    showCropperModal: boolean;
    groupImage: any;
}

export class CreateEditGroup extends React.Component<CreateEditGroupProps, CreateEditGroupState> {

    inputGroupImage: HTMLInputElement;
    needArray: Array<any>;
    nextHour: any;
    maxDate: any;
    hoursArray: Array<any>;
    minutesArray: Array<any>;

    constructor() {
        super();

        this.state = {
            showCropperModal: false,
            groupImage: null,
        };

        this.needArray = [];
        this.hoursArray = [];
        this.minutesArray = [{ id: 0, text: '00' }, { id: 30, text: '30' }];

        for (let i = 1; i <= 42; i++) {
            this.needArray.push({ id: i, text: i });
        }
        for (let i = 1; i <= 84; i++) {
            this.hoursArray.push({ id: i, text: i });
        }
        this.nextHour = Moment().add('minute', 30 - Moment().minute() % 30).toDate();
        this.maxDate = Moment().add('d', 90).toDate();
        this.onCropClick = this.onCropClick.bind(this);
        this.onCropperCancel = this.onCropperCancel.bind(this);
        this.onInputGroupImageChange = this.onInputGroupImageChange.bind(this);
        this.onGroupImageEditClick = this.onGroupImageEditClick.bind(this);
    }

    onCropClick(ret) {
        this.inputGroupImage.value = null;
        this.setState(Update(this.state, {
            showCropperModal: { $set: false }
        }));
        this.props.onCropClick(ret);
    }

    onCropperCancel() {
        this.inputGroupImage.value = null;
        this.setState(Update(this.state, {
            showCropperModal: { $set: false }
        }));
    }

    onInputGroupImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e: any) => {
                this.setState(Update(this.state, {
                    groupImage: { $set: e.target.result }
                }), () => {
                    this.setState(Update(this.state, {
                        showCropperModal: { $set: true }
                    }));
                });
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onGroupImageEditClick() {
        this.inputGroupImage.click();
    }

    render() {

        let btnContent;

        if (this.props.isCreate) {
            btnContent = (
                <button type={"submit"}
                    disabled={this.props.loading}
                    className={"btn btn-primary pull-right"}>
                    <i className={"fa fa-plus"} aria-hidden="true"></i>
                    <span> {this.props.Resource ? this.props.Resource.creategroup : ''}</span>
                </button>
            );
        } else {
            btnContent = (
                <button type={"submit"}
                    disabled={this.props.loading}
                    className={"btn btn-primary pull-right"}>
                    <i className={"fa fa-save"} aria-hidden="true"></i>
                    <span> {this.props.Resource ? this.props.Resource.save : ''}</span>
                </button>
            );
        }

        return (
            <div>
                <CropperModal Resource={null} img={this.state.groupImage}
                    show={this.state.showCropperModal}
                    cancelClick={this.onCropperCancel}
                    okClick={this.onCropClick} />
                <div className={"row"}>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Field name="games"
                                id={"games"}
                                label={this.props.Resource ? this.props.Resource.games : ""}
                                component={renderMultiselect}
                                valueField={'id'}
                                textField={'text'}
                                data={this.props.Games}
                                onSearch={this.props.FetchGames}
                                onCreate={this.props.CreateGameTag}
                                emptyMessage={this.props.Resource ? this.props.Resource.searchlanguage3char : ""}
                                hasHelp={true}
                                help={this.props.Resource ? this.props.Resource.gameshelp : ""}
                                placeholder={this.props.Resource ? this.props.Resource.placeholder : ""}
                                busy={this.props.gamesLoading}
                            />
                        </div>
                    </div>
                    <div className={"clearfix visible-xs"}></div>
                    <div className={"col-md-6 col-xs-12"}>
                        <Label hasHelp={false} help={null} id={"groupimage"}
                            label={this.props.Resource ? this.props.Resource.groupimage : ""} />
                        <div className={"group-picture-container"}>
                            <img className={"profile-picture picture"} id={"profile-picture"}
                                src={`${(this.props.image === null ? constants.GROUP_IMAGE + '/' + this.props.ID : this.props.image)}`} />
                            <div className={'group-image'}>
                                <button type={'button'} className={'btn-link btn-link-picture'} onClick={this.onGroupImageEditClick}>
                                    <i className={"fa fa-pencil-square-o fa-2x"} aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <input id={"profile-upload"}
                            ref={(control) => this.inputGroupImage = control}
                            onChange={this.onInputGroupImageChange}
                            type="file" name="file" accept="image/*" />
                    </div>
                </div>
                <br />
                <div className={"clearfix"}></div>
                <div className={"row"}>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Field name="need"
                                id={"need"}
                                label={this.props.Resource ? this.props.Resource.need : ""}
                                component={renderDropdown}
                                data={this.needArray}
                                valueField={'id'}
                                textField={'text'}
                                placeholder={this.props.Resource ? this.props.Resource.placeholder : ""}
                                hasHelp={true}
                                help={this.props.Resource ? this.props.Resource.needhelp : ""}
                            />
                        </div>
                    </div>
                    <div className={"clearfix visible-xs"}></div>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Label hasHelp={false} help={null} id={"invitefriends"} label={"Invite Friends"} />
                            <br />
                            <i className={"fa fa-cogs fa-3x"} aria-hidden="true"></i>
                            <span>Work in progress</span>
                        </div>
                    </div>
                </div>
                <div className={"clearfix"}></div>
                <div className={"row"}>
                    <div className={"col-md-12 col-xs-12"}>
                        <div className={"form-group"}>
                            <Label hasHelp={true} help={this.props.Resource ? this.props.Resource.descriptionhelp : ""}
                                id={"createGroupDescription"}
                                label={this.props.Resource ? this.props.Resource.description : ""} />
                            <MarkdownEditor
                                resources={this.props.Resource}
                                emojiClasses={'emoji-popover'}
                                onChange={this.props.onEditorChange}
                                send={null}
                                value={this.props.description}
                                EditorID={'groupdescription_markdown'} />
                            <Field name={"description"}
                                component={renderValidation}
                            />
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Label hasHelp={true} id={"when"}
                                help={this.props.Resource ? this.props.Resource.whenhelp : ""}
                                label={this.props.Resource ? this.props.Resource.when : ""} />
                            <DateTimePicker
                                value={this.props.when}
                                min={this.nextHour}
                                max={this.maxDate}
                                onChange={this.props.WhenDateChanged}
                                step={30}
                            />
                            <Field name={"when"}
                                component={renderValidation}
                            />
                        </div>
                    </div>
                    <div className={"clearfix visible-xs"}></div>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Label hasHelp={true}
                                help={this.props.Resource ? this.props.Resource.durationhelp : ""} id={"duration"}
                                label={this.props.Resource ? this.props.Resource.duration : ""} />
                            <div className={"row"}>
                                <div className={"col-md-6 col-xs-12"}>
                                    <Field name="hours"
                                        id={"hours"}
                                        component={renderDropdown}
                                        data={this.hoursArray}
                                        valueField={'id'}
                                        textField={'text'}
                                        hasRightGroup={true}
                                        rightGroupHtml={this.props.Resource ? this.props.Resource.hours : ""}
                                    />
                                </div>
                                <div className={"clearfix visible-xs"}></div>
                                <div className={"col-md-6 col-xs-12"}>
                                    <Field name="minutes"
                                        id={"minutes"}
                                        component={renderDropdown}
                                        data={this.minutesArray}
                                        valueField={'id'}
                                        textField={'text'}
                                        hasRightGroup={true}
                                        rightGroupHtml={this.props.Resource ? this.props.Resource.minutes : ""}
                                    />
                                </div>
                            </div>
                            <div className={"clearfix"}></div>
                        </div>
                    </div>
                </div>
                <div className={"clearfix"}></div>
                <div className={"row"}>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Field name="language"
                                label={this.props.Resource ? this.props.Resource.language : ""}
                                id={"language"}
                                component={renderDropdown}
                                data={this.props.languages}
                                valueField={'id'}
                                textField={'text'}
                                onSearch={this.props.FetchLanguages}
                                emptyMessage={this.props.Resource ? this.props.Resource.searchlanguage3char : ""}
                                hasHelp={true}
                                help={this.props.Resource ? this.props.Resource.languagehelp : ""}
                                placeholder={this.props.Resource ? this.props.Resource.placeholder : ""}
                                busy={this.props.languageLoading}
                            />
                        </div>
                    </div>
                    <div className={"clearfix visible-xs"}></div>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Field name="communications"
                                id={"communications"}
                                label={this.props.Resource ? this.props.Resource.communication : ""}
                                component={renderMultiselect}
                                onToggle={this.props.FetchCommunications}
                                data={this.props.communications}
                                valueField={'id'}
                                textField={'text'}
                                hasHelp={true}
                                help={this.props.Resource ? this.props.Resource.communicationhelp : ""}
                                placeholder={this.props.Resource ? this.props.Resource.placeholder : ""}
                                busy={this.props.communicationsLoading}
                            />
                        </div>
                    </div>
                </div>
                <div className={"clearfix"}></div>
                <div className={"row"}>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Field name="playstyles"
                                id={"playstyles"}
                                label={this.props.Resource ? this.props.Resource.playstyles : ""}
                                component={renderMultiselect}
                                onToggle={this.props.FetchPlayStyles}
                                data={this.props.playStyles}
                                valueField={'id'}
                                textField={'text'}
                                hasHelp={true}
                                help={this.props.Resource ? this.props.Resource.playstyleshelp : ""}
                                placeholder={this.props.Resource ? this.props.Resource.placeholder : ""}
                                busy={this.props.playStylesLoading}
                            />
                        </div>
                    </div>
                    <div className={"clearfix visible-xs"}></div>
                    <div className={"col-md-6 col-xs-12"}>
                        <div className={"form-group"}>
                            <Field name="ages"
                                id={"ages"}
                                label={this.props.Resource ? this.props.Resource.ages : ""}
                                component={renderMultiselect}
                                onToggle={this.props.FetchAges}
                                data={this.props.ages}
                                valueField={'id'}
                                textField={'text'}
                                hasHelp={true}
                                help={this.props.Resource ? this.props.Resource.ageshelp : ""}
                                placeholder={this.props.Resource ? this.props.Resource.placeholder : ""}
                                busy={this.props.agesLoading}
                            />
                        </div>
                    </div>
                </div>
                <div className={"clearfix"}></div>
                <div>
                    {btnContent}
                </div>
            </div>
        );
    }
}

export default CreateEditGroup;