export function hasRange(editor) {
    var editable, selection;
    editable = editor.elements[0];
    if (window.getSelection) {
        selection = window.getSelection();
        if (selection.rangeCount) {
            return true;
        }
        return false;
    }
    return false;
};

export function setCaretAtEnd(editor) {
    var editable, range, selection, textRange;
    editable = editor.elements[0];
    if (window.getSelection && document.createRange) {
        range = document.createRange();
        range.selectNodeContents(editable);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        return selection.addRange(range);
    } else if ((<any>document.body).createTextRange) {
        textRange = (<any>document.body).createTextRange();
        textRange.moveToElementText(editable);
        textRange.collapse(false);
        return textRange.select();
    }
};