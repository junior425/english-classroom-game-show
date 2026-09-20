# English Classroom Game Show

Portal web de juegos competitivos de inglés para pantallas gigantes de salón (split-screen, Equipo vs Equipo).
Modo oscuro, alto contraste, fuentes gigantes y efectos de sonido con Tone.js.

## Modos de juego

- **Modo 1 – Robo de Puntos (Steal):** pregunta rápida para los primeros de la fila. El profesor pulsa el
  equipo que "timbra" primero; si falla, el otro equipo puede robar (+150) y el que falló pierde 50.
- **Modo 2 – La Subasta Gramatical:** se muestra una frase; cada equipo apuesta puntos y decide si la frase es
  correcta o tiene trampa. Acierto = gana la apuesta, error = la pierde.

Marcador gigante siempre visible con botones `+100`, `−50` y `Robar`.

## Estructura curricular (`src/data/curriculum.json`)

`Nivel (Básico 1 … Avanzado 2) → Unidad (1–12) → Tema (2 por unidad = 24 por nivel)`.

Cada tema tiene dos arreglos:

```jsonc
{
  "id": "L1U1T1",
  "name": "First Conditional & Business/Daily Life",
  "steal":   [{ "prompt": "...", "options": ["a", "b", "c", "d"], "answer": 0, "explanation": "..." }],
  "auction": [{ "sentence": "...", "correct": false, "fix": "...", "explanation": "..." }]
}
```

Solo **Básico 1 / Unidad 1 / Tema 1** viene precargado. Para añadir contenido edita el JSON
(o `scripts/generate-curriculum.mjs` y vuelve a ejecutar `node scripts/generate-curriculum.mjs`).

## Desarrollo

Requiere Node 22.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build
```

## Despliegue

Proyecto estático (Vite). `vercel.json` incluye el rewrite SPA. Desplegar con `vercel --prod`.
