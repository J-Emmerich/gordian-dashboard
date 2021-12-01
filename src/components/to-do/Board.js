import React, { useEffect, useState } from "react";
import Card from "./Card";
import firstCard from "../../services/initialData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import BoardButtons from "./BoardButtons";
import { preventFirstCardBug } from "../../helpers/prevent-first-card-bug";
import { moveOnBoard } from "../../helpers/drag-and-drop";
import services from "../../services/board";
import { v4 as uuid } from "uuid";

const BoardContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const BoardButtonsContainer = styled.div`
  border: 1px solid #fc86aa;
  margin: 20px;
`;

const Board = ({ token }) => {
  const [isSaved, setIsSaved] = useState(true);
  const [boardData, setBoardData] = useState(firstCard);
  const [isInsertingTask, setIsInsertingTask] = useState(false);
  const [isInsertingCard, setIsInsertingCard] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("New Card");
  console.log(token, "this is token in board");
  useEffect(() => {
    const result = preventFirstCardBug(boardData);
    if (result) setIsInsertingCard(true);
  }, []);

  useEffect(() => {
    if (boardData.initialData === true) {
      async function fetchProject() {
        const data = await services.getProject(token);
        if (data) {
          setBoardData(data);
          setIsInsertingCard(false);
        }
      }
      fetchProject();
    }
  }, []);

  useEffect(() => {
    setIsSaved(false);
  }, [boardData]);

  const saveToDatabase = async () => {
    const data = await services.saveBoardToDatabase(token, boardData);
    setBoardData(data);
    setIsSaved(true);
  };

  const onDragEnd = (result) => {
    const toUpdate = moveOnBoard(result, boardData);
    if (toUpdate) {
      setBoardData(toUpdate);
    }
  };

  const addCard = () => {
    if (isInsertingCard) {
      return;
    } else {
      setIsInsertingCard(!isInsertingCard);
      const defaultNew = {
        name: "",
        id: uuid(),
        title: newCardTitle,
        isNewCard: true,
        isInsertingTask: false,
        taskIds: []
      };

      const newCardOrder = [...boardData.cardOrder, defaultNew.id];

      const newBoardData = {
        ...boardData,
        cards: [...boardData.cards],
        cardOrder: newCardOrder
      };
      newBoardData.cards.push(defaultNew);
      setBoardData(newBoardData);
    }
  };

  const addTask = (card) => {
    // If it's setting a new task in a card you can't set a new one
    if (isInsertingTask) {
      return;
    } else {
      setIsInsertingTask(!isInsertingTask);

      const newCard = { ...card, isInsertingTask: true };
      const newBoardData = {
        ...boardData,
        cards: [...boardData.cards]
      };
      const index = newBoardData.cards.findIndex(
        (card) => card.id === newCard.id
      );
      newBoardData.cards[index] = newCard;
      setBoardData(newBoardData);
    }
  };

  const removeTask = (targetTask, targetCard) => {
    let tasksInBoard = Array.from(boardData.tasks);
    tasksInBoard = tasksInBoard.filter((task) => task.id !== targetTask.id);
    let cardsInBoard = Array.from(boardData.cards);
    let newCard = cardsInBoard.find((card) => card.id === targetCard.id);
    newCard.taskIds = newCard.taskIds.filter(
      (taskId) => taskId !== targetTask.id
    );
    cardsInBoard = cardsInBoard.map((card) => {
      return card.id === newCard.id ? newCard : card;
    });

    const newBoardData = { ...boardData };
    newBoardData.tasks = tasksInBoard;
    newBoardData.cards = cardsInBoard;

    setBoardData(newBoardData);
  };

  const removeCard = (targetCard) => {
    let newCardOrder = [...boardData.cardOrder];
    let newCards = [...boardData.cards];
    let newBoardTasks = [...boardData.tasks];

    // Makes an array that has all id's that are not found in the deleted card
    newBoardTasks = newBoardTasks.filter(
      (sourceTask) =>
        !targetCard.taskIds.some((targetId) => sourceTask.id === targetId)
    );

    newCardOrder = newCardOrder.filter((id) => id !== targetCard.id);
    newCards = newCards.filter((card) => card.id !== targetCard.id);

    const newBoardData = { ...boardData };
    newBoardData.tasks = newBoardTasks;
    newBoardData.cardOrder = newCardOrder;
    newBoardData.cards = newCards;
    setBoardData(newBoardData);
  };

  const handleTaskChange = (event) => {
    setNewTaskContent(event.target.value);
  };
  const handleCardTitleChange = (event) => {
    setNewCardTitle(event.target.value);
  };

  const handleTaskSubmit = (event, cardId) => {
    event.preventDefault();
    const card = boardData.cards.find((card) => card.id === cardId);
    const cardIndex = boardData.cards.findIndex((card) => card.id === cardId);
    const newTask = { id: uuid(), content: newTaskContent };
    card.taskIds.push(newTask.id);

    card.isInsertingTask = false;
    const newBoardData = { ...boardData };
    newBoardData.tasks.push(newTask);
    newBoardData.cards[cardIndex] = card;
    newBoardData.initialData = false;
    setBoardData(newBoardData);

    setNewTaskContent("");
    setIsInsertingTask(!isInsertingTask);
  };

  const handleCardTitleSubmit = (event, cardId) => {
    event.preventDefault();

    const card = boardData.cards.find((card) => card.id === cardId);

    const cardIndex = boardData.cards.findIndex((card) => card.id === cardId);
    card.title = newCardTitle;
    card.isNewCard = false;
    const newBoardData = {
      ...boardData,
      tasks: [...boardData.tasks],
      cards: [...boardData.cards]
    };
    newBoardData.cards[cardIndex] = card;
    newBoardData.initialData = false;
    setBoardData(newBoardData);
    setIsInsertingCard(false);
    setNewCardTitle("New Card");
  };

  return (
    <BoardContainer className="board">
      <BoardButtonsContainer>
        <BoardButtons
          addCard={addCard}
          isSaved={isSaved}
          saveToDatabase={saveToDatabase}
        />
      </BoardButtonsContainer>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable type="card" droppableId="all-cards" direction="horizontal">
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {boardData.cardOrder.map((cardId, index) => {
                const card = boardData.cards.find((card) => {
                  return card.id === cardId;
                });
                // Needs to initialize as empty to send as prop
                let tasks = [];

                // So the map don't run over undefined
                if (boardData.tasks.length > 0) {
                  tasks = card.taskIds.map((taskId) =>
                    boardData.tasks.find((task) => task.id === taskId)
                  );
                }

                return (
                  <Card
                    key={card.id}
                    newCardTitle={newCardTitle}
                    card={card}
                    tasks={tasks}
                    index={index}
                    addTask={() => addTask(card)}
                    isNewCard={card.isNewCard}
                    isInsertingTask={card.isInsertingTask}
                    handleTaskChange={handleTaskChange}
                    handleTaskSubmit={handleTaskSubmit}
                    newTaskContent={newTaskContent}
                    handleCardTitleChange={handleCardTitleChange}
                    handleCardTitleSubmit={handleCardTitleSubmit}
                    removeTask={removeTask}
                    removeCard={removeCard}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </BoardContainer>
  );
};

export default Board;
