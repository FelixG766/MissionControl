const TaskSwaggerSchema = {
    type: 'object',
    required: ['title', 'user'],
    properties: {
      id: { type: 'string', description: 'The auto-generated ID of the task' },
      title: { type: 'string', description: 'The title of the task' },
      description: { type: 'string', default: 'No description provided.' },
      dueDate: { type: 'string', format: 'date-time', default: '2024-01-01T12:00:00Z' },
      status: { type: 'string', enum: ['active', 'inactive'], default: 'active' },
      completed: { type: 'boolean', default: false },
      priority: { type: 'string', enum: ['low', 'medium', 'high'], default: 'low' },
      user: { type: 'string', description: 'User ID' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
    example: {
      id: '63f7f0b40e784512c3f3b45d',
      title: 'Task title',
      description: 'Description of the task',
      dueDate: '2024-01-01T12:00:00Z',
      status: 'active',
      completed: false,
      priority: 'medium',
      user: '63f7f0b40e784512c3f3b45e',
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z',
    },
};

export default TaskSwaggerSchema;