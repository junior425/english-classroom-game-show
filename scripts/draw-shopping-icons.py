#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/shopping (original artwork for this project).
Run once: python3 scripts/draw-shopping-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'shopping'
OUT.mkdir(parents=True, exist_ok=True)

BG = lambda c: f'<rect width="64" height="64" rx="8" fill="{c}"/>'
PERSON = lambda x, y, shirt='#e63946', skin='#f5c6a5': f'<circle cx="{x}" cy="{y}" r="5" fill="{skin}"/><path d="M{x - 5} {y - 1} Q{x} {y - 8} {x + 5} {y - 1}" fill="#5a2d1a"/><rect x="{x - 6}" y="{y + 5}" width="12" height="14" rx="3" fill="{shirt}"/>'
BOX = lambda x, y, w=20, h=14, c='#c97b63': f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="1" fill="{c}" stroke="#8d5524"/><rect x="{x}" y="{y + h / 2 - 1}" width="{w}" height="2" fill="#8d5524"/>'
TAG = lambda x, y, c='#e63946': f'<path d="M{x} {y} L{x + 16} {y} L{x + 22} {y + 7} L{x + 16} {y + 14} L{x} {y + 14} Z" fill="{c}"/><circle cx="{x + 17}" cy="{y + 7}" r="1.8" fill="#fff"/>'
SHELF = lambda y: f'<rect x="6" y="{y}" width="52" height="3" fill="#8d5524"/>'
LAPTOP = lambda x, y: f'<rect x="{x}" y="{y}" width="26" height="16" rx="1" fill="#222"/><rect x="{x + 2}" y="{y + 2}" width="22" height="12" fill="#8ecae6"/><rect x="{x - 2}" y="{y + 16}" width="30" height="2" fill="#555"/>'
TXT = lambda x, y, t, c='#fff', s=5.5: f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{s}" font-weight="bold" fill="{c}" text-anchor="middle">{t}</text>'
ARROW = lambda x1, y1, x2, y2, c='#222': f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c}" stroke-width="2.5"/><circle cx="{x2}" cy="{y2}" r="2.5" fill="{c}"/>'
ITEMS = ''.join(f'<rect x="{10 + i * 12}" y="{y - 10}" width="8" height="10" rx="1" fill="{c}"/>' for y, cs in ((26, ['#4d96ff', '#ffb74d', '#4caf50', '#9c27b0']), (44, ['#e63946', '#8ecae6', '#ffd54a', '#795548'])) for i, c in enumerate(cs))

ICONS = {
    'products': BG('#fff8e1') + SHELF(26) + SHELF(44) + ITEMS,
    'in-store': BG('#e3f2fd') + '<rect x="8" y="22" width="48" height="32" fill="#fff" stroke="#999"/><path d="M4 22 L10 10 L54 10 L60 22 Z" fill="#e63946"/><rect x="26" y="34" width="12" height="20" fill="#4d96ff"/><rect x="12" y="30" width="10" height="10" fill="#8ecae6"/><rect x="42" y="30" width="10" height="10" fill="#8ecae6"/>' + TXT(32, 19, 'SHOP') + PERSON(32, 40, '#ff9800'),
    'browse': BG('#f1f8e9') + SHELF(30) + SHELF(48) + ''.join(f'<rect x="{30 + i * 10}" y="20" width="7" height="10" fill="{c}"/>' for i, c in enumerate(['#4d96ff', '#ffb74d', '#4caf50'])) + PERSON(16, 22, '#9c27b0') + '<circle cx="14" cy="14" r="4" fill="none" stroke="#333" stroke-width="2"/><line x1="17" y1="17" x2="21" y2="21" stroke="#333" stroke-width="2.5"/>',
    'salesclerk': BG('#e8f5e9') + '<rect x="6" y="36" width="52" height="20" fill="#8d5524"/><rect x="6" y="34" width="52" height="4" fill="#5a2d1a"/>' + PERSON(32, 14, '#222') + '<rect x="22" y="22" width="20" height="6" rx="1" fill="#fff" stroke="#999"/>' + TXT(32, 26.5, 'STAFF', '#222', 4) + '<path d="M16 32 Q32 24 48 32" stroke="#f5c6a5" stroke-width="3" fill="none"/>',
    'special-offer': BG('#ffebee') + '<polygon points="32,6 38,16 50,12 48,24 58,30 48,36 50,48 38,44 32,54 26,44 14,48 16,36 6,30 16,24 14,12 26,16" fill="#e63946"/>' + TXT(32, 28, 'SPECIAL', '#fff', 6) + TXT(32, 37, 'OFFER', '#ffd54a', 7),
    'reasonable': BG('#e0f2f1') + TAG(10, 22, '#2e7d32') + TXT(18, 32, '$9', '#fff', 7) + '<path d="M36 40 L42 46 L54 30" stroke="#2e7d32" stroke-width="4" fill="none"/><circle cx="46" cy="18" r="8" fill="#ffd54a"/>' + TXT(46, 21, '$', '#8d5524', 9),
    'sold-out': BG('#eceff1') + SHELF(30) + SHELF(48) + '<rect x="12" y="12" width="40" height="14" rx="2" fill="#c62828"/>' + TXT(32, 22, 'SOLD OUT', '#fff', 6.5) + '<path d="M14 36 L22 44 M22 36 L14 44 M42 36 L50 44 M50 36 L42 44" stroke="#bbb" stroke-width="2"/>',
    'order-online': BG('#ede7f6') + LAPTOP(8, 22) + '<rect x="12" y="26" width="18" height="8" rx="2" fill="#4caf50"/>' + TXT(21, 32, 'BUY', '#fff', 5) + BOX(40, 36, 18, 14) + ARROW(34, 30, 44, 30, '#673ab7'),
    'return': BG('#fce4ec') + BOX(10, 34, 20, 14) + '<rect x="36" y="26" width="22" height="28" fill="#fff" stroke="#999"/><path d="M34 26 L38 18 L56 18 L60 26 Z" fill="#e63946"/>' + '<path d="M30 20 Q20 10 12 22" stroke="#c62828" stroke-width="3" fill="none"/><polygon points="10,16 12,25 20,23" fill="#c62828"/>' + TXT(47, 44, 'RETURNS', '#222', 4.2),
    'checkout-online': BG('#e0f7fa') + LAPTOP(8, 18) + '<rect x="12" y="22" width="18" height="3" fill="#fff"/><rect x="12" y="27" width="12" height="3" fill="#fff"/>' + '<rect x="40" y="40" width="18" height="10" rx="2" fill="#2e7d32"/>' + TXT(49, 47.5, 'PAY', '#fff', 5.5) + '<rect x="42" y="22" width="16" height="10" rx="2" fill="#ffd54a"/><rect x="42" y="25" width="16" height="2" fill="#222"/>',
}

for name, body in ICONS.items():
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>'
    (OUT / f'{name}.svg').write_text(svg)
