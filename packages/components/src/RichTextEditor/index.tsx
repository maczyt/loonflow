import React, {
  FC,
  CSSProperties,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { IToolbarConfigOption, ToolbarConfig } from './config';
import Quill from 'quill';
import { useCustomIcons } from './hooks';
export interface IRichTextEditorProps {
  value?: string;
  onChange?: (val?: string) => void;
  style?: CSSProperties;
  placeholder?: string;
  className?: string;
  configure?: (quill: Quill) => void;
  toolbarConfig?: IToolbarConfigOption;
  customIcons?: {
    name: string;
    icon: string;
    onClick?: (quill: Quill) => void;
  }[];
}

export const RichTextEditor: FC<IRichTextEditorProps> = ({
  value,
  onChange,
  style,
  placeholder,
  className,
  configure,
  toolbarConfig,
  customIcons = [],
}) => {
  const { quill, quillRef } = useQuill({
    placeholder,
    modules: {
      toolbar: ToolbarConfig({ ...toolbarConfig }),
    },
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const getHtml = useCallback(() => {
    return quill?.root.innerHTML;
  }, [quill?.root]);
  const setHtml = () => {
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

  const { map } = useCustomIcons(customIcons);
  useEffect(() => {
    if (!quill) return;
    const toolbar = containerRef.current?.querySelector('.ql-toolbar');
    const handleClick = (ev: Event) => {
      const id = (ev.target as HTMLDivElement)
        .closest('[data-custom-toolbar-id]')
        ?.getAttribute('data-custom-toolbar-id');
      if (id) {
        map[id]?.(quill);
      }
    };
    toolbar?.addEventListener('click', handleClick, false);
    return () => {
      toolbar?.removeEventListener('click', handleClick, false);
    };
  }, [customIcons, map, quill]);

  useEffect(() => {
    if (quill) {
      configure?.(quill);
    }
  }, [quill, configure]);
  return (
    <div style={style} className={className} ref={containerRef}>
      <div ref={quillRef} />
    </div>
  );
};
