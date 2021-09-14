import React, { useEffect, useState } from "react";
import Card from "./Card";
import firstCard from "../data/initialData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import BoardButtons from "./BoardButtons";
import axios from "axios";

import {
  moveCardsInsideBoard,
  moveTasksInsideCards
} from "../helpers/drag-and-drop";
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
  background-color: green;
`;
const url = "https://llowm.sse.codesandbox.io/";
const sendData = async (boardData) => {
  try {
    await axios.post(url, boardData);
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const getThat = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const Board = () => {
  const [initialValues, setInitial] = useState(false);
  const [boardData, setBoardData] = useState(firstCard);
  const [isInsertingTask, setIsInsertingTask] = useState(false);
  const [isInsertingCard, setIsInsertingCard] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("New Card");

  // useEffect(() => {
  //   (async () => {
  //     const data = await getThat();
  //     console.log(data)
  //     if (data) {
  //       console.log("This effect should not run");
  //       setBoardData(data);
  //       setInitial(true);
  //     } else {
  //       setBoardData(firstCard);
  //       setInitial(true);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    if (boardData.initialData !== true) {
      (async () => {
        await sendData(boardData);
      })();
    }
  }, [boardData]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    // If the user cancel with escape or error, do nothing
    if (!destination) {
      return;
    }
    // If the user take the task out of the card, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Moving cards inside Board :::
    if (type === "card") {
      const newBoardData = moveCardsInsideBoard(
        boardData,
        source,
        destination,
        draggableId
      );
      setBoardData(newBoardData);
    }
    // Moving tasks inside Cards:::
    if (type === "task") {
      const newBoardData = moveTasksInsideCards(
        boardData,
        source,
        destination,
        draggableId
      );

      setBoardData(newBoardData);
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
      // console.log(newBoardData);
      setBoardData(newBoardData);
    }
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
        <BoardButtons addCard={addCard} />
      </BoardButtonsContainer>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable type="card" droppableId="all-cards" direction="horizontal">
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {boardData.cardOrder.map((cardId, index) => {
                const card = boardData.cards.find((card) => {
                  console.log("This has to run again");
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
