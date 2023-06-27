import { Sequelize } from "sequelize";

const SQLITE_STORAGE = process.env.SQLITE_STORAGE;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: SQLITE_STORAGE
});

export default sequelize;
