import { styled } from '@mui/system';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import Sortablejs from 'sortablejs';

const DragWrapper: React.FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ className, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const sortable = new Sortablejs(ref.current, {
      group: {
        name: 'controls',
        pull: 'clone',
        put: false,
      },
      sort: false,
      setData(dataTransfer, draggedElement) {
        dataTransfer.setData('field-type', draggedElement.dataset.fieldType!);
      },
    });

    return () => {
      sortable.destroy();
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default styled(DragWrapper)(() => ({}));
