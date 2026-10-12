#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/phrasal-verbs (original artwork for this project).
Run once: python3 scripts/draw-phrasal-verb-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'phrasal-verbs'
BG = lambda c: f'<rect width="64" height="64" rx="8" fill="{c}"/>'
TXT = lambda x, y, t, c='#fff', s=6: f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{s}" font-weight="bold" fill="{c}" text-anchor="middle">{t}</text>'
SKIN = '#f5c6a5'
PERSON = lambda x, y, shirt='#4d96ff', r=5: f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SKIN}"/><rect x="{x - r - 1}" y="{y + r}" width="{2 * r + 2}" height="{3 * r - 1}" rx="3" fill="{shirt}"/>'
MARKER = '<defs><marker id="a" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0 0 L4 2 L0 4 z" fill="context-stroke"/></marker></defs>'
ARROW = lambda x1, y1, x2, y2, c='#e63946': f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c}" stroke-width="3" marker-end="url(#a)"/>'
CAR = lambda x, y, c='#e63946': f'<rect x="{x}" y="{y + 8}" width="36" height="12" rx="3" fill="{c}"/><path d="M{x + 8} {y + 8} l5 -8 h12 l5 8 z" fill="{c}"/><rect x="{x + 14}" y="{y + 2}" width="8" height="5" fill="#e3f2fd"/><circle cx="{x + 8}" cy="{y + 21}" r="4" fill="#333"/><circle cx="{x + 28}" cy="{y + 21}" r="4" fill="#333"/>'
PAPER = lambda x, y, w=18, h=22: f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#fff" stroke="#888"/><path d="M{x + 3} {y + 5} h{w - 6} M{x + 3} {y + 10} h{w - 6} M{x + 3} {y + 15} h{w - 10}" stroke="#bbb" stroke-width="1.5"/>'
BOTTLE = lambda x, y, c='#90caf9': f'<rect x="{x}" y="{y}" width="6" height="14" rx="2" fill="{c}"/><rect x="{x + 1.5}" y="{y - 4}" width="3" height="4" fill="{c}"/>'
BILL = lambda x, y, c='#43a047': f'<rect x="{x}" y="{y}" width="18" height="10" rx="1.5" fill="{c}"/><circle cx="{x + 9}" cy="{y + 5}" r="3" fill="#a5d6a7"/>' + TXT(x + 9, y + 7, '$', '#1b5e20', 5)

ICONS = {
    'turn-on': BG('#e3f2fd') + '<rect x="10" y="14" width="44" height="18" rx="3" fill="#eceff1" stroke="#90a4ae"/><path d="M14 28 h36" stroke="#90a4ae" stroke-width="2"/><path d="M20 36 q4 6 0 12 M32 36 q4 6 0 12 M44 36 q4 6 0 12" stroke="#4fc3f7" stroke-width="2" fill="none"/>' + '<circle cx="46" cy="22" r="3" fill="#43a047"/>' + TXT(32, 60, 'TURN ON THE A/C', '#1565c0', 4.5),
    'find-out': BG('#fff8e1') + '<circle cx="28" cy="26" r="12" fill="#fff" stroke="#333" stroke-width="3"/><line x1="37" y1="35" x2="50" y2="48" stroke="#333" stroke-width="4"/>' + TXT(28, 30, '?', '#e63946', 12) + TXT(32, 60, 'FIND OUT WHO', '#5a2d1a', 5),
    'run-out-of': BG('#fce4ec') + '<path d="M22 14 h20 v36 q0 4 -4 4 h-12 q-4 0 -4 -4 z" fill="#fff" stroke="#888"/><rect x="26" y="8" width="12" height="6" fill="#1565c0"/>' + '<ellipse cx="32" cy="46" rx="6" ry="2" fill="#e3f2fd"/>' + TXT(32, 30, 'MILK', '#1565c0', 6) + TXT(32, 61, 'ALL GONE!', '#c2185b', 5.5),
    'break-down': BG('#eceff1') + CAR(14, 24, '#607d8b') + '<path d="M28 20 q2 -6 6 -4 q-4 -6 2 -8" stroke="#999" stroke-width="2" fill="none"/><path d="M36 20 q2 -6 6 -4" stroke="#999" stroke-width="2" fill="none"/>' + PERSON(8, 30, '#e63946', 4) + TXT(32, 60, 'BROKE DOWN', '#37474f', 5.5),
    'throw-away': BG('#e8f5e9') + MARKER + '<rect x="30" y="30" width="24" height="26" rx="2" fill="#43a047"/><rect x="27" y="26" width="30" height="5" fill="#2e7d32"/>' + TXT(42, 46, '♻', '#fff', 10) + PERSON(12, 24, '#4d96ff') + BOTTLE(20, 30) + ARROW(24, 30, 36, 24, '#333'),
    'fill-up': BG('#fff3e0') + CAR(4, 30, '#e63946') + '<rect x="46" y="14" width="12" height="30" rx="2" fill="#ff9800"/><rect x="48" y="18" width="8" height="8" fill="#fff"/>' + '<path d="M46 30 q-6 0 -6 8 v6" stroke="#333" stroke-width="2" fill="none"/>' + TXT(32, 12, 'FILL UP · GAS', '#5a2d1a', 5),
    'clean-up': BG('#e3f2fd') + '<rect x="6" y="48" width="52" height="8" fill="#8d6e63"/>' + '<rect x="38" y="16" width="4" height="34" fill="#a1887f"/><path d="M30 46 h20 l-4 10 h-12 z" fill="#ffd54a"/>' + PERSON(18, 26, '#4d96ff') + '<circle cx="14" cy="44" r="2" fill="#bbb"/><circle cx="26" cy="46" r="2" fill="#bbb"/>' + '<path d="M8 10 l3 3 M14 6 l0 4 M20 10 l-3 3" stroke="#4fc3f7" stroke-width="1.5"/>',
    'look-up': BG('#ede7f6') + '<rect x="10" y="14" width="44" height="34" fill="#fff" stroke="#6a1b9a"/><line x1="32" y1="14" x2="32" y2="48" stroke="#6a1b9a"/><path d="M14 20 h14 M14 26 h14 M14 32 h10 M36 20 h14 M36 26 h14 M36 32 h10" stroke="#d1c4e9" stroke-width="2"/>' + '<circle cx="42" cy="38" r="6" fill="none" stroke="#e63946" stroke-width="2"/><line x1="46" y1="42" x2="52" y2="48" stroke="#e63946" stroke-width="2"/>' + TXT(32, 58, 'DICTIONARY', '#6a1b9a', 5),
    'go-on': BG('#e8f5e9') + MARKER + '<path d="M6 40 q13 -16 26 0 t26 0" stroke="#43a047" stroke-width="3" fill="none"/>' + PERSON(14, 20, '#43a047', 4) + ARROW(40, 40, 56, 40, '#43a047') + TXT(32, 58, 'CONTINUE', '#1b5e20', 6),
    'take-up': BG('#fff3e0') + PERSON(24, 24, '#ff9800') + '<path d="M14 44 l10 -4 l6 8" stroke="#ff9800" stroke-width="3" fill="none"/>' + '<rect x="40" y="18" width="18" height="8" rx="1" fill="#fff" stroke="#ff9800"/>' + TXT(49, 24, 'NEW!', '#e65100', 5) + '<circle cx="50" cy="44" r="6" fill="#e63946"/>' + TXT(32, 60, 'START A HOBBY', '#5a2d1a', 4.5),
    'take-care-of': BG('#fce4ec') + PERSON(24, 22, '#e63946', 6) + PERSON(42, 32, '#4d96ff', 4) + '<path d="M28 12 q4 -6 8 0 q-4 6 -4 6 q-4 -6 -4 -6 z" fill="#e63946"/><path d="M20 40 q10 -4 20 2" stroke="#e63946" stroke-width="2" fill="none"/>' + TXT(32, 60, 'BABYSIT', '#c2185b', 6),
    'fill-out': BG('#eceff1') + '<rect x="14" y="8" width="36" height="48" fill="#fff" stroke="#888"/>' + ''.join(f'<rect x="18" y="{14 + i * 9}" width="28" height="5" fill="none" stroke="#bbb"/>' for i in range(4)) + '<path d="M20 17 h12 M20 26 h18" stroke="#1565c0" stroke-width="2"/><path d="M36 48 l6 -6" stroke="#ffd54a" stroke-width="4"/>' + TXT(32, 61, 'FORM', '#333', 5),
    'give-back': BG('#ede7f6') + MARKER + PERSON(14, 24, '#4d96ff') + PERSON(50, 24, '#9c27b0') + BILL(22, 46) + ARROW(40, 42, 48, 42, '#43a047') + TXT(32, 12, 'RETURN IT', '#6a1b9a', 6),
    'give-up': BG('#eceff1') + '<rect x="22" y="22" width="20" height="8" rx="2" fill="#fff" stroke="#888"/><rect x="24" y="14" width="4" height="10" fill="#fff" stroke="#888"/><rect x="31" y="14" width="4" height="10" fill="#fff" stroke="#888"/><rect x="38" y="14" width="4" height="10" fill="#fff" stroke="#888"/>' + '<line x1="10" y1="10" x2="54" y2="54" stroke="#e63946" stroke-width="4"/>' + '<path d="M28 44 q4 6 8 0" stroke="#43a047" stroke-width="2" fill="none"/>' + TXT(32, 60, 'QUIT SMOKING', '#37474f', 5),
    'hold-on': BG('#e3f2fd') + '<rect x="24" y="8" width="16" height="30" rx="4" fill="#333"/><rect x="26" y="12" width="12" height="20" fill="#90caf9"/>' + '<circle cx="48" cy="46" r="10" fill="#fff" stroke="#1565c0" stroke-width="2"/><line x1="48" y1="46" x2="48" y2="40" stroke="#333" stroke-width="2"/><line x1="48" y1="46" x2="52" y2="48" stroke="#333" stroke-width="2"/>' + TXT(18, 56, 'WAIT…', '#1565c0', 6),
    'turn-into': BG('#e8f5e9') + MARKER + '<path d="M6 24 q8 -8 14 0 q-6 8 -14 0 M8 30 l4 -4 M14 30 l2 -4" fill="#e3f2fd" stroke="#4fc3f7" stroke-width="1.5"/><circle cx="14" cy="22" r="7" fill="#fff" stroke="#90caf9"/>' + ARROW(26, 24, 38, 24, '#333') + '<circle cx="50" cy="26" r="8" fill="#4fc3f7"/><path d="M50 10 q6 8 0 14 q-6 -6 0 -14 z" fill="#4fc3f7"/>' + TXT(32, 56, 'SNOW → WATER', '#1b5e20', 5),
}

OUT.mkdir(parents=True, exist_ok=True)
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>')
(OUT / 'LICENSE.md').write_text('# Phrasal verb illustrations\n\nAll SVG files in this folder are original flat illustrations created for this project\n(generated by `scripts/draw-phrasal-verb-icons.py`). Released under the same MIT license as the repository.\n')
print(len(ICONS), 'icons')
