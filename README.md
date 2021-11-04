Проект находится в разработке.

Сервер: https://github.com/intocode/iqa-backend (Private)

### Запуск на локалке

```shell
git clone https://github.com/intocode/iqa-frontend
cd iqa-frontend && npm install

npm start
```

В проекте настроен хук для прекоммита, однако если нужно будет чекнуть проект заранее:

```shell
npm run check
```

Проверяются: eslint, stylelint, test, возможность билдинга.
