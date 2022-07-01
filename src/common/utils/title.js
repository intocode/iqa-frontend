export const generateTitle = (deletedOnly, savedOnly) => {
  if (!deletedOnly && !savedOnly) {
    return 'Все вопросы';
  }
  if (deletedOnly) {
    return 'Корзина';
  }
  return 'Сохраненные вопросы';
};
