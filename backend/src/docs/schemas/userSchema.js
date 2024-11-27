const UserSwaggerSchema = {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
        id: {
            type: 'string',
            description: 'The auto-generated ID of the user',
        },
        name: {
            type: 'string',
            description: 'The name of the user',
            example: 'John Doe',
        },
        email: {
            type: 'string',
            format: 'email',
            description: 'The email address of the user',
            example: 'john.doe@example.com',
        },
        password: {
            type: 'string',
            format: 'password',
            description: 'The hashed password of the user',
            example: 'hashed_password',
        },
        photo: {
            type: 'string',
            description: 'The profile photo URL of the user',
            example: 'https://example.com/photo.jpg',
        },
        bio: {
            type: 'string',
            description: 'The bio of the user',
            default: "I'm a new user.",
            example: "I'm an experienced developer.",
        },
        role: {
            type: 'string',
            enum: ['user', 'admin', 'creator'],
            description: 'The role of the user in the system',
            default: 'user',
            example: 'admin',
        },
        isVerified: {
            type: 'boolean',
            description: 'Whether the user is verified',
            default: false,
            example: true,
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The time the user was created',
            example: '2024-01-01T10:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The time the user was last updated',
            example: '2024-01-02T12:00:00Z',
        },
    },
    example: {
        id: '63f7f0b40e784512c3f3b45e',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'hashed_password',
        photo: 'https://example.com/photo.jpg',
        bio: "I'm a backend developer.",
        role: 'creator',
        isVerified: true,
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-02T12:00:00Z',
    },
};

export default UserSwaggerSchema;
