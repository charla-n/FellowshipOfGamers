//declare var require;

//import * as React from "react";
//import EmojiList from "./EmojiList";
//var MediumEditor = require('medium-editor');
//import { setCaretAtEnd, hasRange } from '../utils/mediumEditorExtensions';

//export interface MediumEditorProps {
//    EditorID: string;
//    onEditorChange: any;
//    value: any;
//    Resource: any;
//    emojiClasses: any;
//    hasTip: boolean;
//    onAltKey?: any;
//}

//export class Editor extends React.Component<MediumEditorProps, {}> {

//    editor: any;
//    elem: any;

//    constructor() {
//        super();

//        this.onEmojiSelect = this.onEmojiSelect.bind(this);
//        this.onKeyDown = this.onKeyDown.bind(this);
//    }

//    //shouldComponentUpdate(nextProps, nextState) {
//    //    return false;
//    //}

//    componentWillReceiveProps(nextprops: MediumEditorProps) {
//        if (this.props.value === undefined && nextprops.value !== undefined) {
//            this.editor.setContent(nextprops.value, 0);
//        }
//    }

//    componentDidMount() {

//        this.editor = new MediumEditor(`.${this.props.EditorID}_container`, {
//            buttonLabels: 'fontawesome',
//            placeholder: false,
//            toolbar: {
//                buttons: [
//                    {
//                        name: 'bold',
//                        action: 'bold',
//                        aria: 'bold',
//                        tagNames: ['b', 'strong'],
//                        style: {
//                            prop: 'font-weight',
//                            value: '700|bold'
//                        },
//                        useQueryState: true,
//                        contentDefault: '<b>B</b>',
//                        contentFA: '<i class="fa fa-bold"></i>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'italic',
//                        action: 'italic',
//                        aria: 'italic',
//                        tagNames: ['i', 'em'],
//                        style: {
//                            prop: 'font-style',
//                            value: 'italic'
//                        },
//                        useQueryState: true,
//                        contentDefault: '<b><i>I</i></b>',
//                        contentFA: '<i class="fa fa-italic"></i>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'underline',
//                        action: 'underline',
//                        aria: 'underline',
//                        tagNames: ['u'],
//                        style: {
//                            prop: 'text-decoration',
//                            value: 'underline'
//                        },
//                        useQueryState: true,
//                        contentDefault: '<b><u>U</u></b>',
//                        contentFA: '<i class="fa fa-underline"></i>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'strikethrough',
//                        action: 'strikethrough',
//                        aria: 'strike through',
//                        tagNames: ['strike'],
//                        style: {
//                            prop: 'text-decoration',
//                            value: 'line-through'
//                        },
//                        useQueryState: true,
//                        contentDefault: '<s>A</s>',
//                        contentFA: '<i class="fa fa-strikethrough"></i>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'quote',
//                        action: 'append-blockquote',
//                        aria: 'blockquote',
//                        tagNames: ['blockquote'],
//                        contentDefault: '<b>&ldquo;</b>',
//                        contentFA: '<i class="fa fa-quote-right"></i>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'h3',
//                        action: 'append-h3',
//                        aria: 'header type three',
//                        tagNames: ['h3'],
//                        contentDefault: '<b>H3</b>',
//                        contentFA: '<i class="fa fa-header"><sup>3</sup>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'h5',
//                        action: 'append-h5',
//                        aria: 'header type five',
//                        tagNames: ['h5'],
//                        contentDefault: '<b>H5</b>',
//                        contentFA: '<i class="fa fa-header"><sup>5</sup>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'h6',
//                        action: 'append-h6',
//                        aria: 'header type six',
//                        tagNames: ['h6'],
//                        contentDefault: '<b>H6</b>',
//                        contentFA: '<i class="fa fa-header"><sup>6</sup>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'orderedlist',
//                        action: 'insertorderedlist',
//                        aria: 'ordered list',
//                        tagNames: ['ol'],
//                        useQueryState: true,
//                        contentDefault: '<b>1.</b>',
//                        contentFA: '<i class="fa fa-list-ol"></i>',
//                        classList: ['btn'],
//                    },
//                    {
//                        name: 'unorderedlist',
//                        action: 'insertunorderedlist',
//                        aria: 'unordered list',
//                        tagNames: ['ul'],
//                        useQueryState: true,
//                        contentDefault: '<b>&bull;</b>',
//                        contentFA: '<i class="fa fa-list-ul"></i>',
//                        classList: ['btn'],
//                    },
//                ]
//            }
//        });

//        this.editor.subscribe('editableInput', (event, editable) => {
//            this.props.onEditorChange(editable.innerHTML);
//            this.editor.saveSelection();
//        });
//        this.editor.subscribe('editableClick', (event) => {
//            this.editor.saveSelection();
//        });
//        this.elem = document.querySelector(`.${this.props.EditorID}_container`);
//        this.editor.setContent(this.props.value, 0);
//    }

//    onEmojiSelect(emoji) {
//        if (!hasRange(this.editor)) {
//            setCaretAtEnd(this.editor);
//        } else {
//            this.editor.restoreSelection();
//        }
//        this.editor.pasteHTML(emoji);
//    }

//    clear() {
//        this.editor.setContent('', 0);
//    }

//    onKeyDown(evt) {
//        if (evt.keyCode === 13) {
//            if (this.props.onAltKey) {
//                this.props.onAltKey();
//            }
//        }
//    }

//    render() {

//        let tip;

//        if (this.props.hasTip) {
//            tip = (
//                <p>
//                    <i>{this.props.Resource ? this.props.Resource.tipeditorformat : ""}</i>
//                </p>
//            );
//        }

//        return (
//            <div>
//                {tip}
//                <EmojiList popoverClasses={this.props.emojiClasses} onEmojiSelected={this.onEmojiSelect}/>
//                <div className={this.props.EditorID + '_container'} onKeyDown={this.onKeyDown}>
//                </div>
//            </div>
//        );
//    }
//}

//export default Editor;