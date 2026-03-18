# Kevin CV Web Project

Proyecto web estático para presentar la hoja de vida digital de Kevin Viteri
con enfoque premium, tecnológico y listo para integrarse después en AIvance.

## Estructura
- `index.html` -> estructura principal del sitio
- `styles.css` -> diseño visual y responsive
- `script.js` -> interacciones, filtros, tema y panel administrador
- `assets/images/` -> logo, retrato placeholder y decorativos

## Clave del panel de edición
La clave actual del panel es:

`AIvanceKV2026`

## Advertencia importante
Como este proyecto funciona solo con frontend, la protección de la clave
es limitada. Se usa un hash SHA-256 para no dejarla visible en texto plano,
pero esto NO equivale a seguridad real.

Si luego quieres que:
- la clave no pueda inspeccionarse,
- el panel admin tenga login serio,
- los datos se guarden en una base real,
- y el perfil se actualice online,

entonces necesitas backend (por ejemplo Node.js, Django, Firebase o Supabase).