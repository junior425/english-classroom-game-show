#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/food-8a (Intermediate 1 / 8A Food and drink + 8A too/enough). Original artwork.
Run once: python3 scripts/draw-food-8a-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'food-8a'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#fff8e1"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
ICONS = {
    'strawberries': BG + '<path d="M22 22 q10 -6 20 0 q4 14 -10 24 q-14 -10 -10 -24z" fill="#e53935"/><path d="M26 18 l6 4 l6 -4 l-2 6z" fill="#43a047"/><g fill="#fff59d"><circle cx="28" cy="28" r="1.3"/><circle cx="36" cy="28" r="1.3"/><circle cx="32" cy="34" r="1.3"/><circle cx="29" cy="38" r="1.3"/><circle cx="35" cy="38" r="1.3"/></g>',
    'tomato-sauce': BG + '<rect x="24" y="12" width="16" height="6" fill="#263238"/><path d="M22 18 h20 v26 q0 6 -10 6 q-10 0 -10 -6z" fill="#e53935"/><rect x="26" y="26" width="12" height="12" fill="#fff" rx="1"/><circle cx="32" cy="32" r="4" fill="#e53935"/>',
    'lamb': BG + '<path d="M20 22 q12 -8 24 2 q4 10 -4 18 l-8 2 l-8 -2 q-10 -8 -4 -20z" fill="#ef9a9a"/><rect x="38" y="40" width="4" height="12" fill="#fafafa" stroke="#bbb"/><path d="M26 30 q6 -4 12 0" stroke="#fff" stroke-width="2" fill="none"/>',
    'eggplant': BG + '<path d="M24 24 q-6 14 6 26 q14 4 16 -12 q0 -16 -14 -18z" fill="#6a1b9a"/><path d="M30 20 l4 -8 M26 22 l8 -2 l6 4" stroke="#43a047" stroke-width="3" fill="none"/>',
    'cucumber': BG + '<rect x="10" y="26" width="44" height="12" rx="6" fill="#2e7d32"/><circle cx="46" cy="18" r="9" fill="#c5e1a5" stroke="#2e7d32" stroke-width="2"/><g fill="#9ccc65"><circle cx="43" cy="18" r="1.5"/><circle cx="49" cy="18" r="1.5"/><circle cx="46" cy="14" r="1.5"/><circle cx="46" cy="22" r="1.5"/></g>',
    'lettuce': BG + '<path d="M12 36 q4 -16 20 -20 q16 4 20 20 q-6 12 -20 12 q-14 0 -20 -12z" fill="#7cb342"/><path d="M18 34 q6 -10 14 -12 q8 2 14 12" stroke="#c5e1a5" stroke-width="2" fill="none"/><path d="M24 40 q8 -8 16 0" stroke="#c5e1a5" stroke-width="2" fill="none"/>',
    'peppers': BG + '<path d="M14 26 q0 -8 8 -8 q8 0 8 8 v14 q0 6 -8 6 q-8 0 -8 -6z" fill="#e53935"/><path d="M34 28 q0 -8 8 -8 q8 0 8 8 v12 q0 6 -8 6 q-8 0 -8 -6z" fill="#43a047"/><path d="M22 18 v-6 M42 20 v-6" stroke="#2e7d32" stroke-width="3"/>',
    'fruit-juice': BG + '<rect x="22" y="14" width="20" height="36" rx="3" fill="#e3f2fd" stroke="#90caf9"/><rect x="24" y="22" width="16" height="26" fill="#ff9800"/><rect x="38" y="6" width="3" height="20" fill="#e53935" transform="rotate(20 38 6)"/><circle cx="48" cy="18" r="6" fill="#ff9800"/>',
    'pineapple': BG + '<ellipse cx="32" cy="38" rx="12" ry="16" fill="#f9a825"/><path d="M22 32 l20 12 M22 44 l20 -12 M32 22 v32" stroke="#e65100" stroke-width="1.5"/><path d="M32 22 l-8 -12 l8 4 l8 -4z" fill="#43a047"/>',
    'beef': BG + '<path d="M14 26 q8 -12 24 -8 q14 6 10 20 q-8 10 -20 8 q-16 -4 -14 -20z" fill="#c62828"/><path d="M22 28 q10 -4 20 4" stroke="#ffcdd2" stroke-width="2" fill="none"/><ellipse cx="38" cy="38" rx="4" ry="3" fill="#fafafa"/>',
    'shrimp': BG + '<path d="M18 30 q8 -16 26 -8 q6 10 -6 18 q-12 6 -20 -4" fill="#ff7043"/><path d="M26 28 q6 -6 12 -2 M30 36 q4 -4 8 0" stroke="#ffab91" stroke-width="2" fill="none"/><path d="M18 30 l-6 -4 l4 8z" fill="#ff7043"/><circle cx="42" cy="26" r="1.5" fill="#333"/>',
    'coconut': BG + '<circle cx="32" cy="34" r="16" fill="#6d4c41"/><path d="M20 28 q12 -10 24 0" stroke="#8d6e63" stroke-width="3" fill="none"/><ellipse cx="32" cy="30" rx="9" ry="7" fill="#fafafa"/>',
    'turkey': BG + '<ellipse cx="32" cy="36" rx="18" ry="12" fill="#bf6a1f"/><ellipse cx="32" cy="32" rx="12" ry="7" fill="#e08a3a"/><path d="M14 32 l-6 -6 M50 32 l6 -6" stroke="#fafafa" stroke-width="3"/><rect x="10" y="48" width="44" height="4" rx="2" fill="#90a4ae"/>',
    'flour': BG + '<path d="M20 20 h24 v30 q0 4 -12 4 q-12 0 -12 -4z" fill="#eceff1" stroke="#b0bec5"/><rect x="18" y="14" width="28" height="8" fill="#eceff1" stroke="#b0bec5"/>' + TXT('FLOUR', 40, 7, '#546e7a'),
    'cereal': BG + '<path d="M12 30 h40 l-4 20 h-32z" fill="#fafafa" stroke="#90a4ae"/><g fill="#f9a825"><circle cx="22" cy="28" r="3"/><circle cx="30" cy="26" r="3"/><circle cx="38" cy="28" r="3"/><circle cx="46" cy="27" r="3"/><circle cx="26" cy="22" r="3"/><circle cx="36" cy="21" r="3"/></g>',
    'peach': BG + '<circle cx="32" cy="36" r="15" fill="#ffab91"/><path d="M32 22 v28" stroke="#ff7043" stroke-width="2"/><path d="M32 22 q8 -8 10 -2 q-6 2 -10 2z" fill="#43a047"/>',
    'salmon': BG + '<path d="M12 32 q12 -12 32 -8 l8 8 l-8 8 q-20 4 -32 -8z" fill="#ff8a65"/><path d="M20 28 q10 8 20 2 M22 36 q10 -6 18 0" stroke="#ffe0b2" stroke-width="2" fill="none"/><path d="M44 24 l8 -6 v28 l-8 -6" fill="#ff8a65"/>',
    'tuna': BG + '<path d="M12 32 q12 -14 32 -10 l8 10 l-8 10 q-20 4 -32 -10z" fill="#1565c0"/><path d="M14 32 q12 10 30 2" fill="#90caf9"/><path d="M44 22 l8 -8 v36 l-8 -8" fill="#1565c0"/><circle cx="20" cy="30" r="2" fill="#fff"/>',
    'cabbage': BG + '<circle cx="32" cy="34" r="16" fill="#aed581"/><path d="M20 30 q12 -8 24 0 M22 40 q10 -6 20 0 M32 18 v30" stroke="#dcedc8" stroke-width="2" fill="none"/>',
    'apple-pie': BG + '<path d="M10 32 h44 l-4 14 h-36z" fill="#ffcc80"/><path d="M14 32 l4 -8 h28 l4 8z" fill="#e0a050"/><path d="M18 24 l32 8 M46 24 l-32 8 M32 24 v8" stroke="#8d6e63" stroke-width="1.5"/>',
    'too': BG + '<rect x="14" y="40" width="36" height="8" fill="#8d6e63"/><g fill="#5d4037"><circle cx="20" cy="34" r="6"/><circle cx="30" cy="34" r="6"/><circle cx="40" cy="34" r="6"/><circle cx="25" cy="24" r="6"/><circle cx="35" cy="24" r="6"/><circle cx="30" cy="14" r="6"/></g>' + TXT('too much coffee'),
    'enough': BG + '<circle cx="32" cy="30" r="14" fill="#43a047"/><path d="M24 30 l6 6 l12 -12" stroke="#fff" stroke-width="4" fill="none"/>' + TXT('enough'),
    'not-enough': BG + '<circle cx="32" cy="30" r="14" fill="#e53935"/><path d="M24 30 h16" stroke="#fff" stroke-width="4"/>' + TXT('not enough'),
    'too-many': BG + '<g fill="#1e88e5"><circle cx="16" cy="22" r="4"/><circle cx="26" cy="22" r="4"/><circle cx="36" cy="22" r="4"/><circle cx="46" cy="22" r="4"/><circle cx="21" cy="34" r="4"/><circle cx="31" cy="34" r="4"/><circle cx="41" cy="34" r="4"/></g>' + TXT('too many people'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
