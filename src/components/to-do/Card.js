import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddTaskForm from "./AddTaskForm";
import CardTitleForm from "./CardTitleForm";
import { IconButton } from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.5s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

const Title = styled.h3`
  padding: 8px;
  text-align: center;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Card = ({
  card,
  tasks,
  index,
  addTask,
  isInsertingTask,
  handleTaskChange,
  handleTaskSubmit,
  newTaskContent,
  isNewCard,
  newCardTitle,
  handleCardTitleChange,
  handleCardTitleSubmit,
  removeTask,
  removeCard
}) => {
  const isDragDisabled = isNewCard === true;
  return (
    // The index is the position of the draggable inside of the droppable
    <Draggable
      draggableId={card.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TitleContainer>
            <Title {...provided.dragHandleProps}>
              {isNewCard ? (
                <CardTitleForm
                  newCardTitle={newCardTitle}
                  handleContent={handleCardTitleChange}
                  saveTitle={handleCardTitleSubmit}
                  cardId={card.id}
                />
              ) : (
                card.title
              )}
            </Title>
            <IconButton onClick={() => removeCard(card)}>
              <RemoveCircleOutlineIcon fontSize="small" />
            </IconButton>
          </TitleContainer>
          <Droppable droppableId={card.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => {
                  return (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      removeTask={removeTask}
                      card={card}
                    />
                  );
                })}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          {isInsertingTask ? (
            <AddTaskForm
              newTaskContent={newTaskContent}
              handleContent={handleTaskChange}
              saveTask={handleTaskSubmit}
              cardId={card.id}
            />
          ) : isNewCard ? null : (
            <button onClick={addTask}>Add New Task</button>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
