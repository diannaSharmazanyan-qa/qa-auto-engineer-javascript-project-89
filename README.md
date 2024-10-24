# Проект "Тестирование виджета чат-бота":
### Hexlet tests and linter status:
[![Actions Status](https://github.com/diannaSharmazanyan-qa/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/diannaSharmazanyan-qa/qa-auto-engineer-javascript-project-87/actions)

## Описание проекта
__"Виджет чат-бот"__ : в этом проекте реализовано тестирование чат-бота, который представлен в виде npm-пакета. Пакет экспортирует функцию, принимающую конфигурацию поведения чат-бота, и возвращает React-компонент, представляющий интерфейс чата. Конфигурация описывает различные состояния чат-бота и возможные переходы между ними с помощью кнопок, определяя логику взаимодействия с пользователем.

Задача тестирования включает проверку следующих аспектов:
- Корректность отображения интерфейса чата в разных состояниях.
- Правильность смены состояний при взаимодействии пользователя с чат-ботом.
- Соответствие поведения чат-бота заданной конфигурации.
- Обработка пограничных случаев, таких как некорректные данные в конфигурации.

### Установка

```
npm i
```

### Запуск тестов
- Запуск чат-бот виджета:
```
npm run dev
```
- Запуск тестов:
```
npm test
```
