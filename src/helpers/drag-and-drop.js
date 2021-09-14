export const moveCardsInsideBoard = (
  boardData,
  source,
  destination,
  draggableId
) => {
  const newCardOrder = Array.from(boardData.cardOrder);
  newCardOrder.splice(source.index, 1);
  newCardOrder.splice(destination.index, 0, draggableId);

  console.log(newCardOrder);

  const newBoardData = {
    ...boardData,
    cardOrder: newCardOrder
  };

  return newBoardData;
};

export const moveTasksInsideCards = (
  boardData,
  source,
  destination,
  draggableId
) => {
  // Define the cards where to splice later
  const cardStart = boardData.cards.find(
    (card) => card.id === source.droppableId
  );
  const cardStartIndex = boardData.cards.findIndex(
    (card) => card.id === source.droppableId
  );

  const cardEnd = boardData.cards.find(
    (card) => card.id === destination.droppableId
  );
  const cardEndIndex = boardData.cards.findIndex(
    (card) => card.id === destination.droppableId
  );

  //If the task doesn't change from columns
  if (cardStart === cardEnd) {
    //Don't mutate the state, create new array
    const newTaskIds = Array.from(cardStart.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newCard = {
      ...cardStart,
      taskIds: newTaskIds
    };

    const newBoardData = {
      ...boardData,
      cards: [...boardData.cards]
    };
    newBoardData.cards[cardStartIndex] = newCard;
    return newBoardData;

    // -------------------------- //
  } else {
    //Don't mutate arrays.
    const newCardStartTasksIds = Array.from(cardStart.taskIds);
    const newCardEndTasksIds = Array.from(cardEnd.taskIds);

    newCardStartTasksIds.splice(source.index, 1);
    newCardEndTasksIds.splice(destination.index, 0, draggableId);

    const newCardStart = {
      ...cardStart,
      taskIds: newCardStartTasksIds
    };

    const newCardEnd = {
      ...cardEnd,
      taskIds: newCardEndTasksIds
    };

    const newBoardData = {
      ...boardData,
      cards: [...boardData.cards]
    };
    newBoardData.cards[cardStartIndex] = newCardStart;
    newBoardData.cards[cardEndIndex] = newCardEnd;

    return newBoardData;
  }
};
