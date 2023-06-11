import ERR from "./errors.js";
export const nameValidator = {
  required: ERR.REQUIRED,
  minLength: {
    value: 5,
    message: ERR.NAME_SHORT,
  },
  maxLength: {
    value: 100,
    message: ERR.NAME_LONG,
  },
  pattern: {
    value: /\S/,
    message: ERR.SPACES
  }
};

export const groupNameValidator = {
  required: ERR.REQUIRED,
  pattern: {
    value: /\S/,
    message: ERR.SPACES
  }
};

export const notificationValidator = {
  required: ERR.REQUIRED,
  pattern: {
    value: /\S/,
    message: ERR.SPACES
  }
};

export const emailValidator = {
  required: ERR.REQUIRED,
  maxLength: {
    value: 50,
    message: ERR.EMAIL_LONG,
  },
  pattern: {
    value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    message: ERR.EMAIL_BAD,
  },
};

export const passwordValidator = {
  required: ERR.REQUIRED,
  minLength: {
    value: 6,
    message: ERR.PASSWORD_SHORT,
  },
  maxLength: {
    value: 32,
    message: ERR.PASSWORD_LONG,
  },
  pattern: {
    value: /\d/,
    message: ERR.PASSWORD_DIGIT,
  },
};

export const birthdayValidator = {
  required: ERR.REQUIRED,
  validate: (value) => {
    const current = new Date(value);
    if (current > Date.now()) return ERR.DATE_LATE;
    if (current < new Date("1900-01-01")) return ERR.DATE_OLD;
  },
};

export const startYearValidator = {
  required: ERR.REQUIRED,
  validate: (value) => {
    try {
      const year = Number(value);
      if (year < 2000) return ERR.YEAR_OLD;
      if (year > 2029) return ERR.YEAR_LATE;
    } catch (err) {
      return ERR.NOT_NUMBER;
    }
  },
};

export const studentCountValidator = {
  required: ERR.REQUIRED,
  validate: (value) => {
    try {
      const year = Number(value);
      if (year < 1) return ERR.STUDENTS_TOO_FEW;
      if (year > 200) return ERR.STUDENTS_TOO_MANY;
    } catch (err) {
      return ERR.NOT_NUMBER;
    }
  },
}

export const richTextRequiredValidator = {
  validate: (field) => {
    if (!field?.getCurrentContent()?.hasText()) return ERR.REQUIRED;
  },
}

export const requiredFieldValidator = {
  required: ERR.REQUIRED,
};
