#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/ing-infinitive (Intermediate 1 / 12C uses of the -ing form and the infinitive). Original artwork.
Run once: python3 scripts/draw-ing-infinitive-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'ing-infinitive'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#ede7f6"/>'
P = lambda x, fill, y=28: f'<circle cx="{x}" cy="{y}" r="5" fill="{fill}"/><path d="M{x-6} {y+24} v-12 q0 -6 6 -6 q6 0 6 6 v12z" fill="{fill}"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
FACE = lambda mouth, fill='#ffcc80': f'<circle cx="32" cy="30" r="14" fill="{fill}"/><circle cx="27" cy="27" r="2" fill="#333"/><circle cx="37" cy="27" r="2" fill="#333"/>{mouth}'
ICONS = {
    'wedding': BG + P(24, '#fafafa') + P(40, '#424242') + '<path d="M32 18 l-3 -3 q-3 -2 -4 1 q-1 3 7 8 q8 -5 7 -8 q-1 -3 -4 -1z" fill="#e53935"/>' + TXT('for inviting'),
    'laptop': BG + '<rect x="14" y="18" width="36" height="24" rx="2" fill="#424242"/><rect x="17" y="21" width="30" height="18" fill="#4fc3f7"/><rect x="10" y="42" width="44" height="4" fill="#616161"/>' + TXT('in buying'),
    'bike': BG + '<circle cx="18" cy="40" r="9" fill="none" stroke="#222" stroke-width="3"/><circle cx="46" cy="40" r="9" fill="none" stroke="#222" stroke-width="3"/><path d="M18 40 l10 -14 h12 l6 14 M28 26 l-4 14" stroke="#43a047" stroke-width="3" fill="none"/>' + TXT('Riding'),
    'dancing': BG + '<circle cx="32" cy="22" r="5" fill="#e91e63"/><path d="M28 28 l-8 6 M36 28 l8 -6 M32 28 v14 l-6 10 M32 42 l6 10" stroke="#e91e63" stroke-width="4" fill="none" stroke-linecap="round"/><text x="50" y="18" font-size="10">♪</text>' + TXT('love dancing'),
    'easy': BG + '<path d="M18 32 l10 10 l18 -20" stroke="#43a047" stroke-width="6" fill="none" stroke-linecap="round"/>' + TXT('easy to'),
    'amazed': BG + FACE('<circle cx="32" cy="37" r="4" fill="#333"/>') + TXT('amazed to hear'),
    'shoes': BG + '<path d="M10 42 q0 -8 10 -8 l6 -6 l10 6 h14 q4 0 4 4 v4z" fill="#e53935"/><rect x="10" y="42" width="44" height="4" fill="#424242"/>' + TXT('to buy'),
    'clock': BG + '<circle cx="32" cy="30" r="16" fill="#fafafa" stroke="#333" stroke-width="3"/><path d="M32 30 v-10 M32 30 l7 5" stroke="#e53935" stroke-width="3"/>' + TXT('to get there'),
    'bored': BG + FACE('<path d="M26 38 h12" stroke="#333" stroke-width="2"/>') + TXT('with not going'),
    'disappointed': BG + FACE('<path d="M26 40 q6 -5 12 0" stroke="#333" stroke-width="2" fill="none"/>') + TXT('not to see'),
    'button': BG + '<rect x="12" y="16" width="40" height="30" rx="4" fill="#424242"/><circle cx="32" cy="31" r="9" fill="#43a047"/><path d="M28 31 h8 M32 27 v8" stroke="#fff" stroke-width="2"/>' + TXT('is for turning'),
    'button-purpose': BG + '<rect x="12" y="16" width="40" height="30" rx="4" fill="#424242"/><circle cx="32" cy="31" r="9" fill="#1e88e5"/><path d="M4 31 h14" stroke="#e53935" stroke-width="3"/><path d="M14 27 l6 4 l-6 4z" fill="#e53935"/>' + TXT('press to turn'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
