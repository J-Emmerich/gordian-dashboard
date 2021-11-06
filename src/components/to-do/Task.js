import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { IconButton } from "@material-ui/core";

const Container = styled.div`
  border: 1px solid lightgrey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 1.2s ease;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;
const TaskContainer = styled.div`
  padding-left: 10px;
`;

const Task = ({ task, index, removeTask, card }) => {
  const isDragDisabled = task.id === "task-1";
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
      is
    >
      {(provided, snapshot) => {
        return (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            <TaskContainer>{task.content}</TaskContainer>
            <IconButton onClick={() => removeTask(task, card)}>
              <BackspaceIcon />
            </IconButton>
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Task;
