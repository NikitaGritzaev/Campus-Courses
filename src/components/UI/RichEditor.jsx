import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { useController } from "react-hook-form";
import { useRef } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import cls from "./UI.module.css";
function RichEditor({ id, label, control, validator, defaultValue }) {
  const EditorRef = useRef();

  const { field, fieldState } = useController({
    name: id,
    control,
    defaultValue: defaultValue
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(defaultValue))
        )
      : EditorState.createEmpty(),
    rules: validator,
  });
  const wrapperClass = fieldState.error
    ? `${cls.RichEditorWrapper} ${cls.RichEditorWrapperError} my-1`
    : `${cls.RichEditorWrapper} my-1`;
  return (
    <>
      <label onClick={() => EditorRef?.current.focus()}>
        {label}
        <div
          className={wrapperClass}
        >
          <Editor
            editorRef={(ref) => (EditorRef.current = ref)}
            editorState={field?.value}
            editorClassName={cls.RichEditor}
            onEditorStateChange={field?.onChange}
            onBlur={field?.onBlur}
          />
        </div>
      </label>
      <p className="fw-bold text-danger">{fieldState.error?.message}</p>
    </>
  );
}

export default RichEditor;
