import { FC, CSSProperties, useEffect, useCallback, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

interface IProps {
  value?: string;
  onChange?: (val?: string) => void;
  style?: CSSProperties;
  placeholder?: string;
}
const RichTextEditor: FC<IProps> = ({
  value,
  onChange,
  style,
  placeholder,
}) => {
  const { quill, quillRef } = useQuill({
    placeholder,
  });
  const mountedRef = useRef(false);
  const getHtml = useCallback(() => {
    return quill?.root.innerHTML;
  }, [quill?.root]);
  const setHtml = () => {
    console.log(value, mountedRef.current);
    if (value && !mountedRef.current && quill) {
      quill.clipboard.dangerouslyPasteHTML(value);
      mountedRef.current = true;
    }
  };
  useEffect(() => {
    setHtml();
  }, [quill, value]);
  useEffect(() => {
    const onTextChange = () => {
      const html = getHtml();
      onChange?.(html);
    };
    quill?.on('text-change', onTextChange);
    return () => {
      quill?.off('text-change', onTextChange);
    };
  }, [getHtml, onChange, quill]);
  return (
    <div style={style}>
      <div ref={quillRef} />
    </div>
  );
};

export default RichTextEditor;
