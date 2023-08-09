export const setDragItemStyle = (elm?: HTMLElement | null) => {
  if (!elm) return;
  elm.style.display = 'none';
};

export const unsetDragItemStyle = (elm?: HTMLElement | null) => {
  if (!elm) return;
  elm.style.display = '';
};
