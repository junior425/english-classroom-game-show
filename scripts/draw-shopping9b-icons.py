#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/shopping-9b (original artwork for this project).
Run once: python3 scripts/draw-shopping9b-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'shopping-9b'
BG = lambda c: f'<rect width="64" height="64" rx="8" fill="{c}"/>'
TXT = lambda x, y, t, c='#fff', s=6: f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{s}" font-weight="bold" fill="{c}" text-anchor="middle">{t}</text>'
SKIN = '#f5c6a5'
PERSON = lambda x, y, shirt='#4d96ff': f'<circle cx="{x}" cy="{y}" r="5" fill="{SKIN}"/><rect x="{x - 6}" y="{y + 5}" width="12" height="14" rx="3" fill="{shirt}"/>'
BILL = lambda x, y, c='#43a047': f'<rect x="{x}" y="{y}" width="18" height="10" rx="1.5" fill="{c}"/><circle cx="{x + 9}" cy="{y + 5}" r="3" fill="#a5d6a7"/>' + TXT(x + 9, y + 7, '$', '#1b5e20', 5)
COIN = lambda x, y, r=5: f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffd54a" stroke="#f9a825" stroke-width="1.5"/>' + TXT(x, y + 2, '$', '#5a4500', r)
CARD = lambda x, y: f'<rect x="{x}" y="{y}" width="22" height="14" rx="2" fill="#1565c0"/><rect x="{x}" y="{y + 4}" width="22" height="3" fill="#ffd54a"/>' + TXT(x + 11, y + 12, '••••', '#fff', 4)
BAG = lambda x, y, c='#e63946': f'<path d="M{x} {y} h18 l-2 20 h-14 z" fill="{c}"/><path d="M{x + 5} {y} q4 -8 8 0" stroke="{c}" stroke-width="2" fill="none"/>'
MARKER = '<defs><marker id="a" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0 0 L4 2 L0 4 z" fill="context-stroke"/></marker></defs>'
ARROW = lambda x1, y1, x2, y2, c='#e63946': f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c}" stroke-width="3" marker-end="url(#a)"/>'
TAG = lambda x, y, t, c='#ffd54a': f'<path d="M{x} {y} h18 l6 6 l-6 6 h-18 z" fill="{c}" stroke="#f9a825"/>' + TXT(x + 10, y + 8.5, t, '#5a4500', 5)
SHIRT = lambda x, y, c='#4d96ff': f'<path d="M{x} {y + 6} l8 -6 h4 q4 4 8 0 h4 l8 6 l-4 6 l-4 -2 v18 h-16 v-18 l-4 2 z" fill="{c}"/>'
STORE = lambda x, y, w, h, c='#90caf9': f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" stroke="#1565c0"/>' + ''.join(f'<rect x="{x + 4 + i * 9}" y="{y + 5 + j * 10}" width="5" height="6" fill="#fff59d"/>' for i in range(w // 9) for j in range(h // 10))

ICONS = {
    'pay-by-card': BG('#e3f2fd') + PERSON(14, 22, '#e63946') + CARD(30, 26) + '<rect x="28" y="44" width="26" height="12" rx="2" fill="#607d8b"/><rect x="31" y="47" width="12" height="5" fill="#b2dfdb"/>' + TXT(32, 12, 'PAY BY CARD', '#1565c0', 5.5),
    'pay-in-cash': BG('#e8f5e9') + PERSON(14, 22, '#43a047') + BILL(30, 30) + BILL(34, 42, '#2e7d32') + COIN(54, 50, 4) + TXT(32, 12, 'PAY IN CASH', '#1b5e20', 5.5),
    'exchange': BG('#fff3e0') + MARKER + SHIRT(6, 24, '#e63946') + SHIRT(34, 24, '#4d96ff') + ARROW(20, 16, 44, 16, '#ff9800') + ARROW(44, 56, 20, 56, '#ff9800') + TXT(32, 12, 'SIZE M → L', '#5a2d1a', 5.5),
    'return': BG('#fce4ec') + MARKER + PERSON(50, 26, '#9c27b0') + '<rect x="6" y="20" width="24" height="26" fill="#90caf9" stroke="#1565c0"/><rect x="9" y="24" width="18" height="12" fill="#e3f2fd"/>' + BAG(26, 42, '#e63946') + ARROW(46, 50, 22, 50, '#e63946') + TXT(32, 12, 'RETURN', '#c2185b', 6),
    'try-on': BG('#fff8e1') + '<path d="M22 14 q8 -6 16 0 l4 10 h4 v32 h-28 v-32 h4 z" fill="#e63946"/><path d="M32 56 l-8 6 M32 56 l8 6" stroke="#333" stroke-width="2"/>' + PERSON(10, 30, '#4d96ff') + TXT(32, 10, 'TRY IT ON', '#5a2d1a', 5.5),
    'fit': BG('#e8f5e9') + '<path d="M26 20 l4 -2 l4 2 l2 6 l-1 24 h-10 l-1 -24 z" fill="#e63946"/><path d="M20 50 h8 l2 8 h-10 z M36 50 h8 l2 8 h-10 z" fill="#c62828"/>' + '<path d="M44 20 l4 4 l8 -8" stroke="#43a047" stroke-width="3" fill="none"/>' + TXT(32, 12, 'IT FITS!', '#1b5e20', 6),
    'deliver': BG('#e3f2fd') + '<rect x="6" y="28" width="30" height="18" fill="#ff9800"/><rect x="36" y="34" width="16" height="12" fill="#ffb74d"/><circle cx="14" cy="50" r="4" fill="#333"/><circle cx="46" cy="50" r="4" fill="#333"/>' + TXT(21, 40, 'DELIVERY', '#fff', 5) + '<rect x="40" y="10" width="14" height="12" fill="#a1887f"/><path d="M40 16 h14 M47 10 v12" stroke="#5d4037"/>',
    'order': BG('#ede7f6') + '<rect x="10" y="12" width="44" height="30" rx="2" fill="#fff" stroke="#6a1b9a"/><rect x="14" y="16" width="36" height="22" fill="#e1bee7"/><rect x="18" y="20" width="12" height="10" fill="#fff"/><rect x="34" y="20" width="12" height="10" fill="#fff"/>' + '<rect x="18" y="32" width="28" height="5" rx="2" fill="#43a047"/>' + TXT(32, 36, 'ORDER NOW', '#fff', 4) + '<path d="M30 48 l8 -4 l-2 6 l4 4 l-3 1 z" fill="#333"/>',
    'dressing-room': BG('#fce4ec') + '<rect x="12" y="10" width="40" height="46" fill="#f8bbd0"/><rect x="14" y="14" width="36" height="40" fill="#fff"/><path d="M14 14 q18 8 36 0" stroke="#c2185b" stroke-width="2" fill="none"/><rect x="40" y="18" width="8" height="30" fill="#e1f5fe" stroke="#90caf9"/>' + PERSON(26, 28, '#e63946') + TXT(32, 61, 'DRESSING ROOM', '#c2185b', 4.5),
    'bargain': BG('#fff8e1') + TAG(8, 14, '$10', '#ffd54a') + TAG(32, 30, '$20', '#ffd54a') + '<line x1="34" y1="38" x2="56" y2="38" stroke="#e63946" stroke-width="2"/>' + '<path d="M8 52 l5 -5 l5 5 l5 -5 l5 5" stroke="#43a047" stroke-width="2" fill="none"/>' + TXT(32, 61, 'A REAL BARGAIN!', '#e63946', 5),
    'receipt': BG('#eceff1') + '<path d="M18 6 h28 v50 l-4 -3 l-4 3 l-4 -3 l-4 3 l-4 -3 l-4 3 l-4 -3 z" fill="#fff" stroke="#888"/><path d="M24 16 h16 M24 22 h16 M24 28 h10 M24 34 h16" stroke="#bbb" stroke-width="2"/>' + TXT(32, 46, 'TOTAL $35', '#333', 5.5),
    'discount': BG('#fce4ec') + '<circle cx="32" cy="30" r="20" fill="#e63946"/>' + TXT(32, 36, '-30%', '#fff', 12) + TXT(32, 60, 'DISCOUNT', '#c2185b', 6),
    'sales': BG('#fff3e0') + '<rect x="6" y="18" width="52" height="24" rx="3" fill="#e63946"/>' + TXT(32, 35, 'SALE', '#fff', 14) + '<path d="M6 48 h52" stroke="#ff9800" stroke-width="2" stroke-dasharray="4 2"/>' + TXT(32, 58, 'UP TO 50% OFF', '#5a2d1a', 5),
    'cash': BG('#e8f5e9') + BILL(10, 14) + BILL(16, 22, '#2e7d32') + BILL(22, 30) + COIN(50, 48) + COIN(40, 52, 4) + COIN(14, 50, 4),
    'refund': BG('#e3f2fd') + MARKER + '<rect x="30" y="40" width="26" height="12" rx="2" fill="#607d8b"/>' + PERSON(14, 22, '#4d96ff') + BILL(22, 44, '#43a047') + ARROW(40, 36, 26, 42, '#43a047') + TXT(32, 12, 'REFUND', '#1565c0', 6.5),
    'cash-register': BG('#fff8e1') + '<rect x="12" y="30" width="40" height="22" rx="2" fill="#607d8b"/><rect x="16" y="18" width="20" height="12" fill="#37474f"/><rect x="18" y="20" width="16" height="6" fill="#b2dfdb"/>' + ''.join(f'<rect x="{18 + i * 6}" y="{36 + j * 5}" width="4" height="3" fill="#cfd8dc"/>' for i in range(4) for j in range(3)) + TXT(45, 44, '$', '#fff', 7) + TXT(32, 61, 'CASH REGISTER', '#5a2d1a', 4.5),
    'window-shopping': BG('#ede7f6') + '<rect x="18" y="8" width="40" height="36" fill="#e1f5fe" stroke="#6a1b9a" stroke-width="2"/>' + SHIRT(24, 14, '#e63946') + BAG(44, 20, '#ff9800') + PERSON(10, 32, '#9c27b0') + TXT(32, 58, 'JUST LOOKING', '#6a1b9a', 5),
    'department-store': BG('#e3f2fd') + STORE(8, 14, 48, 40) + '<rect x="8" y="8" width="48" height="8" fill="#1565c0"/>' + TXT(32, 14.5, 'MACY’S', '#fff', 5.5) + '<rect x="28" y="44" width="8" height="10" fill="#1565c0"/>',
    'line': BG('#fff3e0') + PERSON(10, 30, '#4d96ff') + PERSON(24, 30, '#e63946') + PERSON(38, 30, '#43a047') + PERSON(52, 30, '#9c27b0') + '<rect x="4" y="52" width="56" height="4" fill="#ff9800"/>' + TXT(32, 14, 'WAIT IN LINE', '#5a2d1a', 5.5),
    'shopping-center': BG('#e8f5e9') + STORE(4, 26, 26, 28, '#ffcc80') + STORE(34, 20, 26, 34, '#90caf9') + '<rect x="4" y="18" width="56" height="6" fill="#43a047"/>' + TXT(32, 23, 'MALL', '#fff', 5) + '<circle cx="32" cy="8" r="5" fill="#ffd54a"/>',
}

OUT.mkdir(parents=True, exist_ok=True)
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>')
(OUT / 'LICENSE.md').write_text('# Shopping (9B) illustrations\n\nAll SVG files in this folder are original flat illustrations created for this project\n(generated by `scripts/draw-shopping9b-icons.py`). Released under the same MIT license as the repository.\n')
print(len(ICONS), 'icons')
