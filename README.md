# Stanislav 3D

Моё портфолио с 3D-моделью и фирменным стилем Coon Clean.

[Открыть сайт](https://krygliakovstudy-png.github.io/stanislav-portfolio/)

## Запуск

```sh
node server.cjs
```

Сайт откроется по адресу http://127.0.0.1:4173. Можно также использовать Live Server в VS Code. Открытие HTML как обычного файла не подходит для загрузки 3D-модели.

## Что где находится

- `index.html` — главная и слайдер.
- `portfolio.html` — работы, фильтр и 3D-просмотр.
- `contacts.html` — форма заявки.
- `css/style.css` — стили для всех страниц.
- `js/` — меню, слайдер, фильтрация, форма и сцена Three.js.
- `models/gun_low.fbx` — модель; `images/` — её рендеры.
- `branding/` — презентация Coon Clean.

Three.js 0.179.1 хранится в `vendor/three`. [Лицензия MIT](vendor/three/LICENSE).

В форме есть проверка полей и скачивание заявки. Отправка на почту не подключена.

Публикация через GitHub Pages: ветка `main`, папка `/ (root)`.
