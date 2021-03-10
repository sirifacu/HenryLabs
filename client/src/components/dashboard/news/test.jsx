import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
 
function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
 
  const editor = React.useRef(null);
 
  function focusEditor() {
    editor.current.focus();
  }
 
  React.useEffect(() => {
    focusEditor()
  }, []);
 
  return (
    <div onClick={focusEditor}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
}