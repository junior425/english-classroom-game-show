#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/money-verbs (original artwork for this project).
Run once: python3 scripts/draw-money-verb-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'money-verbs'
BG = lambda c: f'<rect width="64" height="64" rx="8" fill="{c}"/>'
TXT = lambda x, y, t, c='#fff', s=6: f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{s}" font-weight="bold" fill="{c}" text-anchor="middle">{t}</text>'
SKIN = '#f5c6a5'
PERSON = lambda x, y, shirt='#4d96ff': f'<circle cx="{x}" cy="{y}" r="5" fill="{SKIN}"/><rect x="{x - 6}" y="{y + 5}" width="12" height="14" rx="3" fill="{shirt}"/>'
BILL = lambda x, y, c='#43a047': f'<rect x="{x}" y="{y}" width="18" height="10" rx="1.5" fill="{c}"/><circle cx="{x + 9}" cy="{y + 5}" r="3" fill="#a5d6a7"/>' + TXT(x + 9, y + 7, '$', '#1b5e20', 5)
COIN = lambda x, y, r=5: f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffd54a" stroke="#f9a825" stroke-width="1.5"/>' + TXT(x, y + 2, '$', '#5a4500', r)
ARROW = lambda x1, y1, x2, y2, c='#e63946': f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c}" stroke-width="3" marker-end="url(#a)"/>'
MARKER = '<defs><marker id="a" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0 0 L4 2 L0 4 z" fill="context-stroke"/></marker></defs>'
TAG = lambda x, y, t: f'<path d="M{x} {y} h16 l6 6 l-6 6 h-16 z" fill="#ffd54a" stroke="#f9a825"/>' + TXT(x + 9, y + 8.5, t, '#5a4500', 5)

ICONS = {
    'owe': BG('#fce4ec') + PERSON(16, 22, '#e63946') + PERSON(48, 22, '#4d96ff') + '<rect x="20" y="4" width="24" height="12" rx="3" fill="#fff" stroke="#e63946"/>' + TXT(32, 13, 'I.O.U.', '#e63946', 6) + BILL(23, 44, '#bdbdbd') + MARKER + ARROW(24, 40, 40, 32),
    'borrow': BG('#e3f2fd') + MARKER + PERSON(14, 24, '#4d96ff') + PERSON(50, 24, '#9c27b0') + BILL(30, 46) + ARROW(42, 44, 24, 44) + TXT(32, 12, 'Can I…?', '#1565c0', 6.5),
    'lend': BG('#ede7f6') + MARKER + PERSON(14, 24, '#9c27b0') + PERSON(50, 24, '#4d96ff') + BILL(16, 46) + ARROW(22, 44, 42, 44, '#43a047') + TXT(32, 12, 'Here you are', '#6a1b9a', 5.5),
    'can-afford': BG('#e8f5e9') + PERSON(18, 26, '#43a047') + BILL(8, 48) + BILL(28, 48) + '<rect x="40" y="22" width="16" height="22" fill="#90caf9" stroke="#1565c0"/><rect x="43" y="26" width="10" height="8" fill="#e3f2fd"/>' + TAG(36, 8, '$300') + '<path d="M44 48 l4 4 l8 -8" stroke="#43a047" stroke-width="3" fill="none"/>',
    'charge': BG('#fff3e0') + PERSON(16, 26, '#ff9800') + '<rect x="30" y="20" width="26" height="30" rx="2" fill="#fff" stroke="#888"/><path d="M34 26 h18 M34 32 h18 M34 38 h12" stroke="#bbb" stroke-width="2"/>' + TXT(43, 47, '$45', '#e63946', 7) + TXT(16, 12, 'BILL', '#5a2d1a', 6),
    'cost': BG('#fffde7') + '<rect x="18" y="26" width="28" height="30" fill="#8d6e63"/><rect x="22" y="30" width="20" height="10" fill="#d7ccc8"/><path d="M26 26 q6 -14 12 0" stroke="#8d6e63" stroke-width="3" fill="none"/>' + TAG(38, 10, '$20') + '<line x1="40" y1="22" x2="36" y2="30" stroke="#f9a825"/>',
    'earn': BG('#e8f5e9') + MARKER + '<rect x="8" y="30" width="22" height="22" fill="#90a4ae"/><rect x="12" y="34" width="5" height="5" fill="#fff59d"/><rect x="21" y="34" width="5" height="5" fill="#fff59d"/>' + PERSON(44, 26, '#43a047') + BILL(36, 50) + ARROW(30, 46, 36, 50, '#43a047') + TXT(19, 26, 'WORK', '#37474f', 6),
    'get-paid': BG('#e3f2fd') + '<rect x="12" y="14" width="40" height="34" rx="2" fill="#fff" stroke="#1565c0"/>' + TXT(32, 24, 'PAYCHECK', '#1565c0', 5.5) + '<path d="M16 30 h32 M16 36 h20" stroke="#bbd" stroke-width="2"/>' + TXT(40, 45, '$2,000', '#43a047', 7) + '<rect x="4" y="52" width="56" height="6" fill="#1565c0"/>' + TXT(32, 57, 'FRIDAY', '#fff', 5),
    'be-worth': BG('#fff8e1') + '<circle cx="32" cy="30" r="16" fill="#fff" stroke="#f9a825" stroke-width="2"/><circle cx="32" cy="30" r="12" fill="#fff" stroke="#bbb"/><line x1="32" y1="30" x2="32" y2="22" stroke="#333" stroke-width="2"/><line x1="32" y1="30" x2="38" y2="30" stroke="#333" stroke-width="2"/><rect x="26" y="8" width="12" height="8" fill="#f9a825"/><rect x="26" y="44" width="12" height="8" fill="#f9a825"/>' + TXT(32, 61, '$10,000!', '#e63946', 7),
    'own': BG('#e8f5e9') + '<polygon points="10,30 32,12 54,30" fill="#c62828"/><rect x="14" y="30" width="36" height="24" fill="#ffcc80"/><rect x="28" y="40" width="8" height="14" fill="#5a2d1a"/>' + PERSON(52, 36, '#43a047') + '<rect x="14" y="4" width="22" height="7" rx="1" fill="#fff" stroke="#43a047"/>' + TXT(25, 9.5, 'MINE', '#43a047', 5),
    'pay-back': BG('#ede7f6') + MARKER + PERSON(14, 24, '#4d96ff') + PERSON(50, 24, '#9c27b0') + BILL(22, 46) + ARROW(40, 42, 48, 42, '#43a047') + '<path d="M18 10 q14 -8 28 0" stroke="#43a047" stroke-width="2" fill="none" stroke-dasharray="3 2"/>' + TXT(32, 18, 'Thanks!', '#6a1b9a', 5.5),
    'save': BG('#fce4ec') + '<ellipse cx="32" cy="38" rx="20" ry="14" fill="#f48fb1"/><circle cx="48" cy="32" r="6" fill="#f48fb1"/><circle cx="50" cy="31" r="1" fill="#333"/><ellipse cx="53" cy="34" rx="2.5" ry="2" fill="#ec407a"/><rect x="26" y="22" width="12" height="3" fill="#333"/><rect x="18" y="50" width="5" height="6" fill="#ec407a"/><rect x="40" y="50" width="5" height="6" fill="#ec407a"/>' + COIN(32, 14),
    'spend': BG('#fff3e0') + MARKER + PERSON(14, 24, '#ff9800') + '<path d="M36 28 h20 l-2 18 h-16 z" fill="#e63946"/><path d="M42 28 q4 -8 8 0" stroke="#e63946" stroke-width="2" fill="none"/><path d="M30 44 h20 l-2 14 h-16 z" fill="#4d96ff"/>' + BILL(6, 48, '#bdbdbd') + ARROW(16, 44, 30, 36),
    'waste': BG('#eceff1') + '<rect x="18" y="26" width="28" height="30" rx="2" fill="#607d8b"/><rect x="14" y="22" width="36" height="5" fill="#455a64"/><rect x="26" y="18" width="12" height="4" fill="#455a64"/><path d="M24 32 v18 M32 32 v18 M40 32 v18" stroke="#90a4ae" stroke-width="2"/>' + BILL(20, 8, '#43a047') + COIN(48, 14, 4) + '<line x1="6" y1="6" x2="58" y2="58" stroke="#e63946" stroke-width="3" opacity=".8"/>',
}

OUT.mkdir(parents=True, exist_ok=True)
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>')
