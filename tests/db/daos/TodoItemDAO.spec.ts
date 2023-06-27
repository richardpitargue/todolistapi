import * as TodoItemDAO from '../../../src/db/daos/TodoItemDAO';
import TodoItem, { TodoItemInput } from '../../../src/db/models/TodoItem';

beforeAll(() => {
  return TodoItem.sync();
});

describe('TodoItemDAO.create', () => {
  afterEach(() => {
    return TodoItem.destroy({ where: {}, truncate: true });
  });
  
  test('should succeed with title and description as payload', async () => {
    const payload: TodoItemInput = {
      title: 'test1',
      description: 'test2'
    };
  
    await TodoItemDAO.create(payload);
  });
  
  test('should succeed with only title as payload', async () => {
    const payload: TodoItemInput = {
      title: 'test1',
    };
  
    await TodoItemDAO.create(payload);
  });
  
  test('should fail with only description as payload', async () => {
    const payload: any = {
      description: 'test1',
    };
  
    await expect(TodoItemDAO.create(payload)).rejects.toThrow();
  });
});

describe('TodoItemDAO.update', () => {
  let id: number;
  const original: TodoItemInput = {
    title: 'title',
    description: 'description'
  }
  beforeEach(async () => {
    const item = await TodoItem.create(original);
    id = item.id;
  });

  afterEach(() => {
    return TodoItem.destroy({ where: {}, truncate: true });
  });

  test('should succeed with title and description as payload', async () => {
    const payload: Partial<TodoItemInput> = {
      title: 'updated title',
      description: 'updated description'
    };
    const updatedItem = await TodoItemDAO.update(id, payload);
    expect(updatedItem.title !== original.title && updatedItem.title === payload.title);
    expect(updatedItem.description !== original.description && updatedItem.description === payload.description);
  });

  test('should succeed with only title as payload', async () => {
    const payload: Partial<TodoItemInput> = {
      title: 'updated title',
    };
    const updatedItem = await TodoItemDAO.update(id, payload);
    expect(updatedItem.title !== original.title && updatedItem.title === payload.title);
    expect(updatedItem.description === original.description);
  });

  test('should succeed with only description as payload', async () => {
    const payload: Partial<TodoItemInput> = {
      description: 'updated description'
    };
    const updatedItem = await TodoItemDAO.update(id, payload);
    expect(updatedItem.description !== original.description && updatedItem.description === payload.description);
    expect(updatedItem.title === original.title);
  });

  test('should fail with nonexistent item in database', async () => {
    const payload: Partial<TodoItemInput> = {
      title: 'updated title',
      description: 'updated description'
    };
    await expect(TodoItemDAO.update(69, payload)).rejects.toThrow('Not found.');
  });
});

describe('TodoItemDAO.getById', () => {
  let id: number;
  const original: TodoItemInput = {
    title: 'title',
    description: 'description'
  }
  beforeEach(async () => {
    const item = await TodoItem.create(original);
    id = item.id;
  });

  afterEach(() => {
    return TodoItem.destroy({ where: {}, truncate: true });
  });

  test('should succeed with existing item in database', async () => {
    const item = await TodoItemDAO.getById(id);
    expect(item.title === original.title);
    expect(item.description === original.description);
  });

  test('should fail with nonexistent item in database', async () => {
    await expect(TodoItemDAO.getById(69)).rejects.toThrow('Not found.');
  });
});

describe('TodoItemDAO.deleteById', () => {
  let id: number;
  const original: TodoItemInput = {
    title: 'title',
    description: 'description'
  }
  beforeEach(async () => {
    const item = await TodoItem.create(original);
    id = item.id;
  });

  afterEach(() => {
    return TodoItem.destroy({ where: {}, truncate: true });
  });

  test('should return true with existing item in database', async () => {
    const result = await TodoItemDAO.deleteById(id);
    expect(result);
  });

  test('should return false with nonexistent item in database', async () => {
    const result = await TodoItemDAO.deleteById(69);
    expect(!result);
  });
});

describe('TodoItemDAO.getAll', () => {
  const items: TodoItemInput[] = [
    {
      title: 'title1',
      description: 'description1'
    },
    {
      title: 'title2',
      description: 'description2'
    },
    {
      title: 'title3',
      description: 'description3'
    }
  ];
  beforeEach(() => {
    return TodoItem.bulkCreate(items);
  });

  afterEach(() => {
    return TodoItem.destroy({ where: {}, truncate: true });
  });

  test('should return 3 items from the database', async () => {
    const result = await TodoItemDAO.getAll();
    expect(result.length === 3);
  });
});
