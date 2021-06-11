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
import 'froala-editor/js/plugins/image_manager.min'
import 'froala-editor/css/plugins/image_manager.css'
import 'froala-editor/js/plugins/paragraph_format.min'
//import 'froala-editor/css/plugins/paragraph_format'


import FroalaEditor from 'react-froala-wysiwyg';
function Editor() {
  const config = {
    toolbarButtons: {
      'moreText': {
        'buttons': ['bold', 'italic', 'underline', 'fontSize', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        buttonsVisible: 4
      },
      'moreRich': {
        'buttons': ['fullscreen', "undo", "redo", 'insertTable', 'insertLink', 'emoticons'],
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
    paragraphFormat: {
      N: 'Normal',
      H1: 'Heading 1',
      H2: 'Heading 2',
      H3: 'Heading 3',
      H4: 'Heading 4'
    },
    quickInsertButtons: ['table'],
  };
  return (
    <FroalaEditor
      tag='textarea'
      config={config}
    />
  );
}

export default Editor;
