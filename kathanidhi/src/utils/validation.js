// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Story validation
export const validateStory = (storyData) => {
  const errors = {};

  if (!storyData.title) {
    errors.title = 'Title is required';
  } else if (storyData.title.length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  } else if (storyData.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (!storyData.content) {
    errors.content = 'Content is required';
  } else if (storyData.content.length < 100) {
    errors.content = 'Content must be at least 100 characters long';
  }

  if (!storyData.category) {
    errors.category = 'Category is required';
  }

  if (storyData.tags && !Array.isArray(storyData.tags)) {
    errors.tags = 'Tags must be an array';
  }

  if (storyData.excerpt && storyData.excerpt.length > 200) {
    errors.excerpt = 'Excerpt must be less than 200 characters';
  }

  return errors;
};

// User validation
export const validateUser = (userData) => {
  const errors = {};

  if (!userData.name) {
    errors.name = 'Name is required';
  } else if (userData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!userData.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(userData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!userData.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(userData.password)) {
    errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
  }

  if (userData.confirmPassword && userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (userData.bio && userData.bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters';
  }

  return errors;
};

// Comment validation
export const validateComment = (comment) => {
  const errors = {};

  if (!comment.content) {
    errors.content = 'Comment content is required';
  } else if (comment.content.length < 2) {
    errors.content = 'Comment must be at least 2 characters long';
  } else if (comment.content.length > 1000) {
    errors.content = 'Comment must be less than 1000 characters';
  }

  return errors;
};

// File validation
export const validateFile = (file, options = {}) => {
  const errors = {};
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  } = options;

  if (!file) {
    errors.file = 'File is required';
    return errors;
  }

  if (file.size > maxSize) {
    errors.file = `File size must be less than ${maxSize / (1024 * 1024)}MB`;
  }

  if (!allowedTypes.includes(file.type)) {
    errors.file = `File type must be one of: ${allowedTypes.join(', ')}`;
  }

  return errors;
};

// Search validation
export const validateSearch = (query) => {
  const errors = {};

  if (!query.trim()) {
    errors.query = 'Search query is required';
  } else if (query.length < 2) {
    errors.query = 'Search query must be at least 2 characters long';
  } else if (query.length > 50) {
    errors.query = 'Search query must be less than 50 characters';
  }

  return errors;
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];

    if (rules.required && !value) {
      errors[field] = `${field} is required`;
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field} must be less than ${rules.maxLength} characters`;
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      errors[field] = `${field} format is invalid`;
    }

    if (rules.custom) {
      const customError = rules.custom(value, formData);
      if (customError) {
        errors[field] = customError;
      }
    }
  });

  return errors;
};
