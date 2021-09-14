import { v4 as uuid } from "uuid";

const project = {
  name: "first-project",
  tasks: [],
  cards: [
    {
      name: "",
      id: uuid(),
      title: "New Title",
      isNewCard: true,
      isInsertingTask: false,
      taskIds: []
    }
  ],
  // Facilitate reordering columns
  cardOrder: [],
  initialData: true
};
project.cardOrder = [project.cards[0].id];

export default project;
