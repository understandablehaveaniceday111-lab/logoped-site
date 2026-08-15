# Логопед Нургалиева Дильназ Маратовна

Статический сайт-визитка для логопеда.

## Быстрый запуск

Откройте файл `index.html` в браузере или запустите локально:

```bash
python -m http.server 8000
```

Затем откройте:

```text
http://localhost:8000
```

## Публикация на GitHub Pages

1. Установите Git и войдите в GitHub.
2. Создайте репозиторий на GitHub.
3. Выполните команды:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ваш_логин>/<ваш_репозиторий>.git
git push -u origin main
```

4. В настройках репозитория откройте:
   - Settings
   - Pages
   - Source: GitHub Actions

После этого GitHub автоматически развернет сайт через workflow из `.github/workflows/pages.yml`.
