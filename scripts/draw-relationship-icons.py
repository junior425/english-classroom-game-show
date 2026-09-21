#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/relationships (original artwork for this project).
Run once: python3 scripts/draw-relationship-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'relationships'
OUT.mkdir(parents=True, exist_ok=True)

BG = lambda c='#eef3ff': f'<rect width="64" height="64" rx="8" fill="{c}"/>'
SKIN = ['#f5c6a5', '#c68642', '#8d5524', '#ffdbac']


def person(x, y, shirt, skin=0, s=1.0, hair='#3b2a1a', arm=None, small=False):
    """Simple bust: head + shoulders, centred at (x, y) baseline."""
    k = 0.75 if small else 1.0
    g = f'<g transform="translate({x} {y}) scale({s * k})">'
    g += f'<path d="M-14 22 Q-14 4 0 4 Q14 4 14 22Z" fill="{shirt}"/>'
    g += f'<circle cx="0" cy="-8" r="9" fill="{SKIN[skin]}"/>'
    g += f'<path d="M-9 -10 Q0 -22 9 -10 Q6 -14 0 -14 Q-6 -14 -9 -10Z" fill="{hair}"/>'
    g += '<circle cx="-3" cy="-8" r="1.2" fill="#222"/><circle cx="3" cy="-8" r="1.2" fill="#222"/>'
    g += arm or ''
    g += '</g>'
    return g


SMILE = '<path d="M-3 -4 Q0 -1 3 -4" stroke="#222" stroke-width="1.2" fill="none"/>'
FROWN = '<path d="M-3 -2 Q0 -5 3 -2" stroke="#222" stroke-width="1.2" fill="none"/>'
HEART = lambda x, y, s=1: f'<path transform="translate({x} {y}) scale({s})" d="M0 4 L-6 -2 A3.5 3.5 0 0 1 0 -6 A3.5 3.5 0 0 1 6 -2Z" fill="#e63946"/>'
STAR = lambda x, y, c='#ffd54a': f'<path transform="translate({x} {y})" d="M0 -5 L1.5 -1.5 L5 -1 L2.5 1.5 L3 5 L0 3 L-3 5 L-2.5 1.5 L-5 -1 L-1.5 -1.5Z" fill="{c}"/>'
BUBBLE = lambda x, y, c='#fff', flip=False: f'<g transform="translate({x} {y}){" scale(-1 1)" if flip else ""}"><rect x="-9" y="-8" width="18" height="12" rx="4" fill="{c}" stroke="#555"/><path d="M-4 4 L-6 9 L0 4Z" fill="{c}" stroke="#555"/></g>'

ICONS = {
    'best-friend': BG('#fff4e0') + person(22, 34, '#ff7b54', 0, arm=SMILE) + person(42, 34, '#4d96ff', 1, arm=SMILE) + '<path d="M22 44 Q32 52 42 44" stroke="#4d96ff" stroke-width="3" fill="none" stroke-linecap="round"/>' + HEART(32, 14, 1.3) + STAR(14, 14) + STAR(50, 14),
    'close-friend': BG('#fff4e0') + person(23, 34, '#7bd389', 2, arm=SMILE) + person(41, 34, '#ffb703', 3, arm=SMILE) + '<path d="M23 44 Q32 50 41 44" stroke="#7bd389" stroke-width="3" fill="none" stroke-linecap="round"/>' + HEART(32, 14, 1.1),
    'colleague': BG('#e8f1f8') + '<rect x="6" y="46" width="52" height="12" rx="2" fill="#8a6d4b"/><rect x="14" y="38" width="14" height="9" rx="1" fill="#333"/><rect x="36" y="38" width="14" height="9" rx="1" fill="#333"/>' + person(21, 24, '#2b3a67', 1, small=True, arm=SMILE) + person(43, 24, '#6c757d', 3, small=True, arm=SMILE),
    'partner': BG('#fde8ef') + person(23, 36, '#8338ec', 3, arm=SMILE) + person(41, 36, '#ff006e', 0, arm=SMILE) + HEART(32, 14, 1.6) + '<circle cx="32" cy="46" r="3" fill="#ffd54a" stroke="#c9a227"/>',
    'couple': BG('#fde8ef') + person(24, 36, '#3a86ff', 2, arm=SMILE) + person(40, 36, '#ff5d8f', 0, arm=SMILE) + HEART(24, 12, 0.9) + HEART(32, 8, 1.2) + HEART(40, 12, 0.9),
    'parents': BG('#eafbea') + person(18, 30, '#2a9d8f', 1, arm=SMILE) + person(46, 30, '#e76f51', 3, arm=SMILE) + person(32, 44, '#ffd166', 0, small=True, arm=SMILE) + '<path d="M18 50 Q32 58 46 50" stroke="#2a9d8f" stroke-width="3" fill="none" stroke-linecap="round"/>',
    'relative': BG('#eafbea') + '<path d="M32 12 L16 28 M32 12 L48 28 M16 28 L10 44 M16 28 L24 44 M48 28 L40 44 M48 28 L54 44" stroke="#8a8f98" stroke-width="2"/>' + person(32, 10, '#6d597a', 3, s=0.55) + person(16, 27, '#b56576', 0, s=0.55) + person(48, 27, '#355070', 1, s=0.55) + person(10, 44, '#e56b6f', 2, s=0.55) + person(24, 44, '#eaac8b', 3, s=0.55) + person(40, 44, '#4d96ff', 0, s=0.55) + person(54, 44, '#7bd389', 1, s=0.55),
    'classmate': BG('#fff8e1') + '<rect x="6" y="6" width="52" height="20" rx="2" fill="#2f5233"/><text x="32" y="20" font-family="sans-serif" font-size="9" fill="#fff" text-anchor="middle">ENGLISH</text><rect x="8" y="50" width="48" height="8" rx="1" fill="#c9a227"/>' + person(22, 34, '#e63946', 0, small=True, arm=SMILE) + person(42, 34, '#457b9d', 2, small=True, arm=SMILE),
    'next-door-neighbor': BG('#e8f1f8') + '<path d="M4 34 L18 20 L32 34 L32 58 L4 58Z" fill="#f4a261"/><path d="M32 34 L46 20 L60 34 L60 58 L32 58Z" fill="#8ecae6"/><rect x="10" y="44" width="8" height="14" fill="#7a4b22"/><rect x="46" y="44" width="8" height="14" fill="#7a4b22"/>' + person(26, 46, '#2a9d8f', 1, s=0.6, arm=SMILE) + person(38, 46, '#e76f51', 3, s=0.6, arm=SMILE) + '<path d="M26 40 L38 40" stroke="#333" stroke-width="2" stroke-linecap="round"/>',
    'argue': BG('#ffe5e5') + person(20, 38, '#d62828', 0, arm=FROWN) + person(44, 38, '#003049', 2, arm=FROWN) + BUBBLE(14, 12, '#fff') + BUBBLE(50, 12, '#fff', flip=True) + '<path d="M10 12 L18 12 M12 9 L16 15 M12 15 L16 9" stroke="#d62828" stroke-width="1.5"/><path d="M46 12 L54 12 M48 9 L52 15 M48 15 L52 9" stroke="#003049" stroke-width="1.5"/>' + '<path d="M30 30 L34 26 M30 26 L34 30" stroke="#d62828" stroke-width="3" stroke-linecap="round"/>',
    'falling-out': BG('#ffe5e5') + person(14, 38, '#6a4c93', 3, arm=FROWN) + person(50, 38, '#1982c4', 1, arm=FROWN) + '<path d="M32 8 L28 22 L34 24 L30 40 L36 44 L32 58" stroke="#d62828" stroke-width="3" fill="none" stroke-linejoin="round"/>' + '<path d="M18 30 L26 26 M46 30 L38 26" stroke="#8a8f98" stroke-width="2" stroke-dasharray="2 2"/>',
    'make-up': BG('#eafbea') + person(22, 38, '#2a9d8f', 0, arm=SMILE) + person(42, 38, '#f77f00', 2, arm=SMILE) + '<path d="M26 48 Q32 42 38 48" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="32" cy="46" r="3" fill="#f5c6a5"/>' + HEART(32, 14, 1.2) + '<path d="M18 16 Q32 4 46 16" stroke="#7bd389" stroke-width="2" fill="none" stroke-dasharray="3 3"/>',
    'get-along-well': BG('#fff4e0') + person(16, 38, '#ffb703', 1, arm=SMILE) + person(32, 34, '#219ebc', 3, arm=SMILE) + person(48, 38, '#fb8500', 0, arm=SMILE) + STAR(10, 12) + STAR(32, 8) + STAR(54, 12),
    'get-to-know': BG('#e8f1f8') + person(22, 38, '#8338ec', 2, arm=SMILE) + person(42, 38, '#06d6a0', 0, arm=SMILE) + BUBBLE(16, 12) + BUBBLE(48, 12, flip=True) + '<text x="16" y="15" font-family="sans-serif" font-size="9" text-anchor="middle" fill="#333">?</text><text x="48" y="15" font-family="sans-serif" font-size="9" text-anchor="middle" fill="#333">!</text>',
    'introduce': BG('#fff8e1') + person(12, 40, '#e63946', 0, arm=SMILE) + person(32, 34, '#457b9d', 3, arm=SMILE) + person(52, 40, '#2a9d8f', 1, arm=SMILE) + '<path d="M20 34 L26 30 M44 34 L38 30" stroke="#457b9d" stroke-width="3" stroke-linecap="round"/>' + BUBBLE(32, 10) + '<text x="32" y="13" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#333">Hi!</text>',
    'have-in-common': BG('#fde8ef') + person(20, 40, '#ff006e', 2, arm=SMILE) + person(44, 40, '#3a86ff', 0, arm=SMILE) + '<circle cx="26" cy="14" r="9" fill="#ff006e" opacity=".6"/><circle cx="38" cy="14" r="9" fill="#3a86ff" opacity=".6"/>' + HEART(32, 15, 0.8),
    'get-together': BG('#eafbea') + '<ellipse cx="32" cy="50" rx="22" ry="6" fill="#8a6d4b"/><circle cx="32" cy="48" r="4" fill="#ffd166"/>' + person(14, 34, '#f4a261', 0, s=0.8, arm=SMILE) + person(26, 28, '#2a9d8f', 2, s=0.8, arm=SMILE) + person(38, 28, '#e76f51', 3, s=0.8, arm=SMILE) + person(50, 34, '#6a4c93', 1, s=0.8, arm=SMILE),
}

for name, body in ICONS.items():
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>'
    (OUT / f'{name}.svg').write_text(svg)
print(f'wrote {len(ICONS)} icons to {OUT}')
