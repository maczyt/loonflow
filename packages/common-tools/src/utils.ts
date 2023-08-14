export const awaitHandler = <T>(promise: Promise<T>) => {
  return promise
    .then((value) => [null, value] as const)
    .catch((reason) => [new Error(reason)] as const);
};
