declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { ActivateAccountRequest } from '../actions/activateAccountAction';
import Loading from '../components/Loading';
import MarkdownEditor from "../components/MarkdownEditor";
import Separator from "../components/Separator";
import ChatItem from '../components/ChatItem';
import ChatItemEmpty from '../components/ChatItemEmpty';
import {
    ChatLoadMore,
    GroupSendMessage
} from '../actions/groupAction';
var ReduxForm = require('redux-form');
var ChatView = require('../components/react-chatview').default;
var emojione = require('emojione');

export interface GroupChatProps {
    groupid: number;
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    messages: Array<any>;
    readChat: any;
    onSendMessage: any;
    resources: any;
}

export interface GroupChatState {
    page: number;
}

const validate = (values, props) => {
    const errors: any = {};

    if (values.message === null || values.message === undefined || values.message === '') {
        errors.message = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    return errors;
}

export class GroupChat extends React.Component<GroupChatProps, GroupChatState> {

    editor: MarkdownEditor;
    common: Common;

    constructor() {
        super();

        this.state = {
            page: 0,
        };

        this.common = new Common();
        this.infiniteScrollLoading = this.infiniteScrollLoading.bind(this);
        this.onMessageEditorChange = this.onMessageEditorChange.bind(this);
        this.onSendMessageClick = this.onSendMessageClick.bind(this);
    }

    componentDidMount() {
        this.props.onMount();
        this.props.readChat(this.state.page, this.props.groupid);
    }

    componentWillReceiveProps(nextprops: GroupChatProps) {
    }

    infiniteScrollLoading() {
        let promise = this.props.readChat(this.state.page + 1, this.props.groupid);
        this.setState(Update(this.state, {
            page: { $set : this.state.page + 1 }   
        }));
        return promise;
    }

    onMessageEditorChange(e) {
        let props = this.props as any;

        props.change('message', e);
    }

    onSendMessageClick() {
        this.props.onSendMessage(this.props.groupid).then((data) => {
            this.editor.clear();
        });
    }

    render() {

        let chatContent = [];

        if (this.props.messages) {
            if (this.props.messages.length > 0) {
                chatContent = this.props.messages.map((value, idx) => {
                    return (
                        <ChatItem key={`chatitem_${idx}`} item={value}/>
                    );
                });
            } else {
                chatContent = [<ChatItemEmpty key={'chatitem_empty'}/>];
            }
        }

        return (
            <div>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <h3>
                            Chat
                        </h3>
                    </div>
                    <div className={'clearfix'}></div>
                    <div className={'col-lg-12'}>
                        <div className={'chat-container'}>
                            <ChatView
                                className="chat-container-content scrollable"
                                flipped={true}
                                scrollLoadThreshold={50}
                                onInfiniteLoad={this.infiniteScrollLoading}
                            >
                                {chatContent}
                            </ChatView>
                        </div>
                    </div>
                    <div className={'clearfix'}></div>
                    <div className={'col-lg-12'}>
                        <MarkdownEditor
                            ref={(control) => this.editor = control}
                            resources={this.props.resources}
                            emojiClasses={'emoji-popover-small-editor'}
                            onChange={this.onMessageEditorChange}
                            send={this.onSendMessageClick}
                            value={null}
                            EditorID={'chat_markdown'} />
                        <div>
                            <button
                                disabled={this.props.Loading}
                                onClick={this.onSendMessageClick}
                                className={'btn btn-primary pull-right small-margin-top'}>
                                <i className={"fa fa-paper-plane-o"} aria-hidden="true"></i>
                                <span> Send</span>
                            </button>
                        </div>
                    </div>
                    <div className={'clearfix'}></div>
                </div>
                <div className={'clearfix'}></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Loading: state.viewGroupReducer.loading,
        Authed: state.authReducer.authed,
        messages: state.groupChatReducer.messages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => dispatch({ type: types.GROUP_CHAT_CLEAR }),
        readChat: (page, groupid) => dispatch(ChatLoadMore(groupid, page)),
        onSendMessage: (groupid) => dispatch(GroupSendMessage(groupid)),
    }
}

let groupChat = ReduxForm.reduxForm({
    form: 'groupChatForm',
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    shouldAsyncValidate: constants.defaultShouldAsyncValidate,
    validate,
})(GroupChat);

groupChat = connect(mapStateToProps, mapDispatchToProps)(groupChat); 

export default groupChat;