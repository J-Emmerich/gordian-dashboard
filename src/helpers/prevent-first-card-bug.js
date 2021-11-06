export const preventFirstCardBug = (boardData) => {
  return boardData.initialData === true ? true : false;
};
