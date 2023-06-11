export const statusToText = (status) => {
  switch (status) {
    case "Created":
      return <p className="text-secondary fw-bold">Создан</p>;
    case "OpenForAssigning":
      return <p className="text-success fw-bold">Открыт для записи</p>;
    case "Started":
      return <p className="text-primary fw-bold">В процессе обучения</p>;
    case "Finished":
      return <p className="text-danger fw-bold">Закрыт</p>;
    default:
      return null;
  }
};

export const semesterName = (semester) => {
  switch (semester) {
    case "Autumn":
      return "Осенний";
    case "Spring":
      return "Весенний";
    default:
      return null;
  }
};

export const notificationsCount = (count) => {
  if (count < 4) return String(count);
  return "3+";
}
