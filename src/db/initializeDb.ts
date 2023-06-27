import ToDoItem from "./models/TodoItem"

const initializeDb = () => {
  ToDoItem.sync({ alter: process.env.NODE_ENV === 'development' });
}

export default initializeDb;
