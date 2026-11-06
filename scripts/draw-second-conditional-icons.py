#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/second-conditional (Advanced 1 / 10C second conditional). Original artwork.
Run once: python3 scripts/draw-second-conditional-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'second-conditional'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#fff3e0"/>'
P = lambda x, fill, y=28: f'<circle cx="{x}" cy="{y}" r="5" fill="{fill}"/><path d="M{x-6} {y+24} v-12 q0 -6 6 -6 q6 0 6 6 v12z" fill="{fill}"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
ICONS = {
    'rich': BG + '<rect x="0" y="40" width="64" height="12" fill="#4fc3f7"/><path d="M14 40 v-14 l16 -10 l16 10 v14z" fill="#fafafa" stroke="#999"/><rect x="26" y="30" width="8" height="10" fill="#8d6e63"/><text x="50" y="18" font-size="12" font-weight="bold" fill="#43a047">$</text>' + TXT('If I were rich'),
    'argue': BG + P(18, '#e53935') + P(46, '#1e88e5') + '<path d="M26 20 l4 -6 l4 6 M34 20 l4 -6 l4 6" stroke="#333" stroke-width="2" fill="none"/>' + TXT("I'd be sad"),
    'spanish': BG + '<rect x="12" y="18" width="40" height="26" fill="#e53935"/><rect x="12" y="26" width="40" height="10" fill="#fdd835"/>' + TXT('If I could speak'),
    'lottery': BG + '<circle cx="20" cy="26" r="8" fill="#e53935"/><circle cx="36" cy="22" r="8" fill="#1e88e5"/><circle cx="46" cy="36" r="8" fill="#43a047"/><text x="20" y="29" font-size="7" fill="#fff" text-anchor="middle">7</text><text x="36" y="25" font-size="7" fill="#fff" text-anchor="middle">12</text><text x="46" y="39" font-size="7" fill="#fff" text-anchor="middle">33</text>' + TXT('might give'),
    'advice': BG + P(22, '#1e88e5') + '<rect x="36" y="18" width="18" height="22" rx="2" fill="#fafafa" stroke="#555"/><path d="M39 24 h12 M39 29 h8 M39 34 h10" stroke="#555"/>' + TXT('If I were you'),
    'rain-first': BG + '<path d="M18 28 q0 -10 10 -10 q4 -8 12 -4 q10 0 8 10 q6 2 2 8 h-30 q-6 0 -2 -4z" fill="#90a4ae"/><path d="M22 40 l-2 6 M32 40 l-2 6 M42 40 l-2 6" stroke="#1e88e5" stroke-width="2"/>' + TXT("we'll go (likely)"),
    'phone': BG + '<rect x="22" y="10" width="20" height="40" rx="4" fill="#263238"/><rect x="25" y="14" width="14" height="28" fill="#4fc3f7"/><path d="M28 22 l8 12 M36 22 l-8 12" stroke="#e53935" stroke-width="3"/>' + TXT("I'd take it back"),
    'computer': BG + '<rect x="12" y="14" width="40" height="26" rx="2" fill="#424242"/><rect x="15" y="17" width="34" height="20" fill="#4fc3f7"/><rect x="26" y="40" width="12" height="4" fill="#616161"/><rect x="18" y="44" width="28" height="3" fill="#616161"/><path d="M26 27 l4 4 l8 -8" stroke="#43a047" stroke-width="3" fill="none"/>' + TXT('would fix'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
