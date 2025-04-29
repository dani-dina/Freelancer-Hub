export const ERROR_MESSAGES = {
    AUTH: {
      INVALID_CREDENTIALS: 'Invalid email or password.',
      UNAUTHORIZED: 'Unauthorized access.',
      TOKEN_EXPIRED: 'Authentication token has expired.',
      FORBIDDEN: 'You do not have permission to perform this action.',
    },
    VALIDATION: {
      REQUIRED_FIELDS: 'All required fields must be filled.',
      INVALID_EMAIL: 'Please enter a valid email address.',
      PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long.',
    },
    USER: {
      NOT_FOUND: 'User not found.',
      ALREADY_EXISTS: 'User with this email already exists.',
    },
    ADMIN: {
      NOT_FOUND: 'Admin not found.',
      UNAUTHORIZED: 'You are not authorized as an admin.',
    },
    SERVER: {
      INTERNAL: 'Internal server error. Please try again later.',
      NOT_IMPLEMENTED: 'This feature is not yet implemented.',
    },
    DATABASE: {
      CONNECTION_FAILED: 'Failed to connect to the database.',
      DUPLICATE_KEY: 'Duplicate key error.',
    }
  } as const;
  