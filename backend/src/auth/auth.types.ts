// Define a shape for error details
export interface AppError {
  code: string;
  message: string;
  statusCode: number;
}

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: {
      code: 'AUTH_001',
      message: 'Invalid email or password.',
      statusCode: 401,
    },
    UNAUTHORIZED: {
      code: 'AUTH_002',
      message: 'Unauthorized access.',
      statusCode: 401,
    },
    TOKEN_EXPIRED: {
      code: 'AUTH_003',
      message: 'Authentication token has expired.',
      statusCode: 401,
    },
    FORBIDDEN: {
      code: 'AUTH_004',
      message: 'Access denied. Admins only.',
      statusCode: 403,
    },
  },
  USER: {
    NOT_FOUND: {
      code: 'USER_001',
      message: 'User not found.',
      statusCode: 404,
    },
    ALREADY_EXISTS: {
      code: 'USER_002',
      message: 'User already exists.',
      statusCode: 409,
    },
  },
  VALIDATION: {
    INVALID_INPUT: {
      code: 'VALIDATION_001',
      message: 'One or more fields are invalid.',
      statusCode: 400,
    },
    MISSING_FIELDS: {
      code: 'VALIDATION_002',
      message: 'Required fields are missing.',
      statusCode: 400,
    },
  },
  SERVER: {
    INTERNAL: {
      code: 'SERVER_001',
      message: 'Internal server error.',
      statusCode: 500,
    },
  },
} as const;
