#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/so-neither (Advanced 1 / 12A So / Neither do I). Original artwork.
Run once: python3 scripts/draw-so-neither-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'so-neither'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#e8f5e9"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
def two(color_a, color_b, sym_a, sym_b):
    return (f'<circle cx="20" cy="22" r="6" fill="#f1c27d"/><path d="M10 44 v-8 q0 -8 10 -8 q10 0 10 8 v8z" fill="{color_a}"/>'
            f'<circle cx="44" cy="22" r="6" fill="#c68642"/><path d="M34 44 v-8 q0 -8 10 -8 q10 0 10 8 v8z" fill="{color_b}"/>'
            f'<text x="20" y="12" font-size="9" font-weight="bold" text-anchor="middle" fill="{color_a}">{sym_a}</text>'
            f'<text x="44" y="12" font-size="9" font-weight="bold" text-anchor="middle" fill="{color_b}">{sym_b}</text>')
ICONS = {
    'so-am-i': BG + two('#43a047', '#43a047', '+', '+') + TXT('So am I.'),
    'so-do-i': BG + two('#1e88e5', '#1e88e5', '+', '+') + TXT('So do I.'),
    'so-can-i': BG + two('#8e24aa', '#8e24aa', '+', '+') + TXT('So can I.'),
    'so-did-i': BG + two('#f57c00', '#f57c00', '+', '+') + TXT('So did I.'),
    'neither-am-i': BG + two('#e53935', '#e53935', '−', '−') + TXT('Neither am I.'),
    'neither-do-i': BG + two('#6d4c41', '#6d4c41', '−', '−') + TXT('Neither do I.'),
    'neither-can-i': BG + two('#455a64', '#455a64', '−', '−') + TXT('Neither can I.'),
    'neither-have-i': BG + two('#00897b', '#00897b', '−', '−') + TXT('Neither have I.'),
    'really-i-do': BG + two('#e53935', '#43a047', '−', '+') + TXT("Really? I do."),
    'really-i-dont': BG + two('#43a047', '#e53935', '+', '−') + TXT("Really? I don't."),
    'i-am-not': BG + two('#43a047', '#e53935', '+', '−') + TXT("I'm not."),
    'i-did': BG + two('#e53935', '#43a047', '−', '+') + TXT('I did.'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
