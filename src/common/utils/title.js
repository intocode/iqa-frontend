export const generateTitle = (deletedOnly, savedOnly) => {
  if (savedOnly) {
    return 'Сохраненные вопросы';
  }
  if (deletedOnly) {
    return 'Корзина';
  }
  return 'Все вопросы';
};
