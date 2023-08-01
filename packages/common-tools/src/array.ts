export const arrayMove = <T>(arr: Array<T>, from: number, to: number) => {
  const element = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, element);
};
