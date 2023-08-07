import Quill from 'quill';
import { useRef, useEffect, useMemo } from 'react';
import { uid } from 'uid';

export const useCustomIcons = (
  customIcons: {
    name: string;
    icon: string;
    onClick?: (quill: Quill) => void;
  }[]
) => {
  const icons = useMemo(() => Quill.import('ui/icons'), []);
  const map = useRef<Record<string, (quill: Quill) => void>>({});

  useEffect(() => {
    customIcons.forEach(({ name, icon, onClick }) => {
      if (!onClick) {
        icons[name] = icon;
        return;
      }
      const id = uid();
      map.current[id] = onClick;
      icons[
        name
      ] = `<span style="white-space:nowrap;" data-custom-toolbar-id="${id}">${icon}</span>`;
    });
  }, [customIcons, icons]);

  return {
    map: map.current,
  } as const;
};
