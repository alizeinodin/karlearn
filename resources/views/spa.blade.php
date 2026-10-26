{{--
  Fallback SPA shell. Prefer the built CRA index at public/frontend/index.html
  (served by SpaController). This Blade view is kept for Laravel integration
  and local development when the built file is unavailable.
--}}
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Karlearn') }}</title>
</head>
<body>
    <div id="root"></div>
    <p style="font-family: sans-serif; padding: 2rem;">
        Frontend build not found. Run <code>npm run frontend:build</code> from the project root.
    </p>
</body>
</html>
