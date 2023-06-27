export default interface TodoItem {
  id: number;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
