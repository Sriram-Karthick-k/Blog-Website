import React from "react"
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';//
import 'froala-editor/css/froala_editor.pkgd.min.css';//
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/align.min.js';//
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/char_counter.min.js'
import 'froala-editor/js/plugins/draggable.min.js'
import 'froala-editor/js/plugins/table.min.js'
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/table.css'
import 'froala-editor/css/plugins/video.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/css/plugins/file.min.css';
import 'froala-editor/js/plugins/quick_insert.min.js'
import 'froala-editor/js/plugins/fullscreen.min.js'
import 'froala-editor/js/plugins/code_view.min.js'
import 'froala-editor/css/plugins/code_view.css'
import 'froala-editor/css/plugins/quick_insert.css'
import FroalaEditor from 'react-froala-wysiwyg';
function Editor() {
  const config = {
    toolbarButtons: {
      'moreText': {
        'buttons': ['bold', 'h1', 'italic', 'underline', 'fontSize', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        buttonsVisible: 4
      },
      'moreRich': {
        'buttons': ['fullscreen', "undo", "redo", 'insertTable', 'insertImage', 'insertLink', 'emoticons'],
        buttonsVisible: 3
      },
    },
    toolbarInline: false,
    toolbarVisibleWithoutSelection: true,
    heightMin: '30',
    placeholderText: 'Enter text',
    charCounterCount: true,
    attribution: false,
    imageMove: true,
    charCounterCount: true,
    quickInsertButtons: ['image', 'table']
  };
  return (
    <FroalaEditor
      tag='textarea'
      config={config}
    />
  );
}

export default Editor;
