module.exports = {
  extends: ['react-app', 'airbnb', 'prettier', 'plugin:eslint-plugin/recommended'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    // 'no-unused-vars': 'off',

    // делаем error, чтобы зачищать консоли, если где-то консоль важна,
    // то правило нужно отключить на строке
    'no-console': 'error',

    // правило не нужно т.к. CRA настроен на автоимпорт реакта
    'react/react-in-jsx-scope': 'off',

    // todo нужно узнать что лучше off или error (по умолчанию error)
    'import/prefer-default-export': 'off',

    // иначе компонента выглядят уродски
    'arrow-body-style': 'off',

    // styled-components часто требует пробрасывания всех пропсов
    'react/jsx-props-no-spreading': 'off',

    // отключаем из-за использования immer в редьюсерах
    // https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],

    'no-underscore-dangle': ['error', { allow: ['_id'] }],

    // свойство появилось в cra@5
    'react/function-component-definition': 'off',
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
