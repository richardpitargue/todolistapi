import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface TodoItemAttributes {
  id: number;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoItemInput extends Optional<TodoItemAttributes, 'id'> {}
export interface TodoItemOutput extends Required<TodoItemAttributes> {}

class TodoItem extends Model<TodoItemAttributes, TodoItemInput> implements TodoItemAttributes {
  declare id: number
  declare title: string
  declare description: string

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

TodoItem.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true,
  sequelize,
});

export default TodoItem;
