declare var require;

import * as React from "react";
import EmojiList from "./EmojiList";
import * as Update from 'immutability-helper';
import MarkupHelpModal from './MarkupHelpModal';

export interface MarkdownEditorProps {
    EditorID: string;
    emojiClasses: string;
    resources: any;
    onChange: any;
    value: any;
    send: any;
}

export interface MarkdownEditorStates {
    markdownHelpOpen: boolean;
}

export class MarkdownEditor extends React.Component<MarkdownEditorProps, MarkdownEditorStates> {

    editor: HTMLTextAreaElement;
    savedSelection: any;
    lastHtml: any;

    constructor() {
        super();

        this.onEmojiSelect = this.onEmojiSelect.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.markdownHelpCloseClick = this.markdownHelpCloseClick.bind(this);
        this.markdownHelpOpenClick = this.markdownHelpOpenClick.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            markdownHelpOpen: false,
        };
    }

    markdownHelpCloseClick() {
        this.setState(Update(this.state, {
            markdownHelpOpen: { $set: false }
        }));
    }

    markdownHelpOpenClick() {
        this.setState(Update(this.state, {
            markdownHelpOpen: { $set: true }
        }));
    }

    componentWillReceiveProps(nextprops: MarkdownEditorProps) {
        if (!this.props.value && nextprops.value) {
            this.editor.value = nextprops.value;
        }
    }

    componentDidMount() {
        if (this.props.value) {
            this.editor.value = this.props.value;
        }
    }

    onEmojiSelect(emoji) {
        this.insertAtCursor(this.editor, emoji);
        this.props.onChange(this.editor.value);
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    onKeyDown(evt: any) {
        if (this.props.send) {
            if (evt.keyCode === 13 && !evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
                evt.preventDefault();
                this.props.onChange(this.editor.value);
                this.props.send();
                return false;
            }
            return true;
        }
        return true;
    }

    clear() {
        this.editor.value = '';
    }

    insertAtCursor(myField, myValue) {
        //IE support
        if ((document as any).selection) {
            myField.focus();
            let sel = (document as any).selection.createRange();
            sel.text = myValue;
        }
        //MOZILLA and others
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
        } else {
            myField.value += myValue;
        }
    }

    render() {

        return (
            <div>
                <MarkupHelpModal
                    close={this.props.resources ? this.props.resources.close : ''}
                    closeClick={this.markdownHelpCloseClick}
                    show={this.state.markdownHelpOpen}
                    text={this.props.resources ? this.props.resources.markdownhelp : ''}
                />
                <EmojiList popoverClasses={this.props.emojiClasses} onEmojiSelected={this.onEmojiSelect} />
                <div className={'markdown-editor-container'}>
                    <textarea ref={(control) => this.editor = control}
                        onChange={this.onChange}
                        onBlur={this.onChange}
                        onKeyDown={this.onKeyDown}
                        className={`${this.props.EditorID} markdown-editor scrollable`}>
                    </textarea>
                </div>
                <div className={'pull-right'}>
                    <a href={'javascript:void(0)'} onClick={this.markdownHelpOpenClick}>Help me formatting my text</a>
                </div>
                <div className={'clearfix'}></div>
            </div>
        );
    }
}

export default MarkdownEditor;