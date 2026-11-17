#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/personal-items (Basic 1 / 2A personal items, 2B colors, plurals, this/that). Original artwork.
Run once: python3 scripts/draw-personal-items-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'personal-items'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#f3e5f5"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
def swatch(color, label, stroke='#999'):
    return BG + f'<circle cx="32" cy="28" r="16" fill="{color}" stroke="{stroke}" stroke-width="1.5"/>' + TXT(label, 58, 8)
ICONS = {
    'backpack': BG + '<rect x="18" y="16" width="28" height="34" rx="8" fill="#1e88e5"/><rect x="24" y="34" width="16" height="12" rx="3" fill="#1565c0"/><path d="M26 16 q6 -10 12 0" stroke="#333" stroke-width="3" fill="none"/>',
    'book': BG + '<rect x="16" y="12" width="30" height="40" rx="2" fill="#e53935"/><rect x="16" y="12" width="6" height="40" fill="#b71c1c"/><rect x="26" y="20" width="16" height="3" fill="#fff"/>',
    'camera': BG + '<rect x="10" y="20" width="44" height="30" rx="4" fill="#333"/><rect x="22" y="14" width="14" height="8" fill="#333"/><circle cx="32" cy="35" r="10" fill="#90a4ae"/><circle cx="32" cy="35" r="6" fill="#263238"/><circle cx="46" cy="26" r="2" fill="#fff"/>',
    'cell-phone': BG + '<rect x="22" y="8" width="20" height="46" rx="4" fill="#263238"/><rect x="25" y="13" width="14" height="34" fill="#4fc3f7"/><circle cx="32" cy="50" r="1.5" fill="#fff"/>',
    'change-purse': BG + '<path d="M14 26 q18 -14 36 0 v18 q-18 10 -36 0z" fill="#e91e63"/><circle cx="32" cy="24" r="3" fill="#fdd835"/><path d="M24 36 q8 -6 16 0" stroke="#fff" stroke-width="2" fill="none"/>',
    'credit-card': BG + '<rect x="8" y="18" width="48" height="30" rx="4" fill="#fdd835"/><rect x="8" y="24" width="48" height="6" fill="#333"/><rect x="14" y="36" width="20" height="4" fill="#fff"/>',
    'glasses': BG + '<circle cx="20" cy="32" r="9" fill="none" stroke="#333" stroke-width="3"/><circle cx="44" cy="32" r="9" fill="none" stroke="#333" stroke-width="3"/><path d="M29 32 h6 M11 30 l-5 -3 M53 30 l5 -3" stroke="#333" stroke-width="3"/>',
    'keys': BG + '<circle cx="22" cy="22" r="8" fill="none" stroke="#f9a825" stroke-width="5"/><path d="M28 28 l18 18 M40 40 l4 -4 M44 44 l4 -4" stroke="#f9a825" stroke-width="5"/>',
    'pen': BG + '<path d="M14 50 l30 -30 l6 6 l-30 30 l-8 2z" fill="#1e88e5"/><path d="M44 20 l4 -4 l6 6 l-4 4z" fill="#333"/><path d="M14 50 l4 -6 l2 2z" fill="#333"/>',
    'pencil': BG + '<path d="M14 50 l30 -30 l6 6 l-30 30 l-8 2z" fill="#fdd835"/><path d="M44 20 l4 -4 l6 6 l-4 4z" fill="#f48fb1"/><path d="M14 50 l4 -6 l2 2z" fill="#8d6e63"/>',
    'purse': BG + '<path d="M12 26 h40 l-4 24 h-32z" fill="#8e24aa"/><path d="M22 26 q10 -16 20 0" stroke="#4a148c" stroke-width="3" fill="none"/><circle cx="32" cy="38" r="3" fill="#fdd835"/>',
    'tablet': BG + '<rect x="12" y="12" width="40" height="40" rx="4" fill="#263238"/><rect x="16" y="16" width="32" height="30" fill="#4fc3f7"/><circle cx="32" cy="49" r="1.5" fill="#fff"/>',
    'umbrella': BG + '<path d="M10 30 q22 -24 44 0z" fill="#5e35b1"/><path d="M10 30 q5 -4 11 0 q5 -4 11 0 q5 -4 11 0 q5 -4 11 0" fill="#7e57c2"/><path d="M32 30 v18 q0 4 -4 4 q-4 0 -4 -4" stroke="#333" stroke-width="2" fill="none"/>',
    'wallet': BG + '<rect x="10" y="18" width="44" height="30" rx="4" fill="#6d4c41"/><rect x="38" y="28" width="16" height="10" rx="2" fill="#8d6e63"/><circle cx="48" cy="33" r="2" fill="#fdd835"/>',
    'watch': BG + '<rect x="24" y="4" width="16" height="56" rx="4" fill="#f9a825"/><circle cx="32" cy="32" r="13" fill="#333"/><circle cx="32" cy="32" r="10" fill="#fff"/><path d="M32 32 v-7 M32 32 l5 3" stroke="#333" stroke-width="2"/>',
    'black': swatch('#212121', 'black'), 'blue': swatch('#1e88e5', 'blue'), 'brown': swatch('#6d4c41', 'brown'),
    'gold': swatch('#d4af37', 'gold'), 'gray': swatch('#9e9e9e', 'gray'), 'green': swatch('#43a047', 'green'),
    'orange': swatch('#fb8c00', 'orange'), 'pink': swatch('#f48fb1', 'pink'), 'purple': swatch('#8e24aa', 'purple'),
    'red': swatch('#e53935', 'red'), 'silver': swatch('#c0c0c0', 'silver'), 'white': swatch('#ffffff', 'white'), 'yellow': swatch('#fdd835', 'yellow'),
    'one-pen': BG + '<path d="M20 46 l22 -22 l4 4 l-22 22 l-6 2z" fill="#1e88e5"/>' + TXT('a pen'),
    'two-pens': BG + '<path d="M12 46 l22 -22 l4 4 l-22 22 l-6 2z" fill="#1e88e5"/><path d="M28 46 l22 -22 l4 4 l-22 22 l-6 2z" fill="#e53935"/>' + TXT('two pens'),
    'watches': BG + '<circle cx="20" cy="30" r="10" fill="#333"/><circle cx="20" cy="30" r="7" fill="#fff"/><circle cx="44" cy="30" r="10" fill="#333"/><circle cx="44" cy="30" r="7" fill="#fff"/>' + TXT('watches'),
    'countries': BG + '<circle cx="32" cy="28" r="16" fill="#4fc3f7"/><path d="M22 20 q8 4 6 12 q-8 2 -10 -4z M38 18 q8 2 6 10 q-6 0 -8 -6z" fill="#43a047"/>' + TXT('countries'),
    'children': BG + '<circle cx="22" cy="24" r="6" fill="#f1c27d"/><path d="M12 48 v-10 q0 -8 10 -8 q10 0 10 8 v10z" fill="#e53935"/><circle cx="42" cy="24" r="6" fill="#c68642"/><path d="M32 48 v-10 q0 -8 10 -8 q10 0 10 8 v10z" fill="#1e88e5"/>' + TXT('children'),
    'this': BG + '<rect x="18" y="20" width="28" height="22" rx="3" fill="#6d4c41"/><path d="M6 50 l10 -10" stroke="#333" stroke-width="3"/>' + TXT('this (near)', 60, 7),
    'that': BG + '<rect x="40" y="10" width="14" height="11" rx="2" fill="#6d4c41"/><path d="M8 52 l26 -28" stroke="#333" stroke-width="3"/>' + TXT('that (not near)', 60, 7),
    'these': BG + '<circle cx="20" cy="30" r="9" fill="#1e88e5"/><circle cx="44" cy="30" r="9" fill="#e53935"/><path d="M6 52 l8 -10" stroke="#333" stroke-width="3"/>' + TXT('these (near)', 60, 7),
    'those': BG + '<circle cx="42" cy="14" r="5" fill="#1e88e5"/><circle cx="54" cy="14" r="5" fill="#e53935"/><path d="M8 52 l26 -30" stroke="#333" stroke-width="3"/>' + TXT('those (not near)', 60, 7),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
