#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/relationships-12a (Intermediate 1 / 12A Relationships + defining relative clauses). Original artwork.
Run once: python3 scripts/draw-relationships-12a-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'relationships-12a'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#fce4ec"/>'
P = lambda x, fill, y=28: f'<circle cx="{x}" cy="{y}" r="5" fill="{fill}"/><path d="M{x-6} {y+24} v-12 q0 -6 6 -6 q6 0 6 6 v12z" fill="{fill}"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
HEART = '<path d="M32 22 l-4 -4 q-4 -3 -6 1 q-1 4 10 11 q11 -7 10 -11 q-2 -4 -6 -1z" fill="#e53935"/>'
ICONS = {
    'cousin': BG + P(20, '#1e88e5') + P(44, '#43a047') + '<path d="M26 22 q6 -10 12 0" stroke="#999" stroke-width="2" fill="none" stroke-dasharray="2 2"/>' + TXT('cousins'),
    'only-child': BG + P(32, '#fb8c00') + '<text x="32" y="18" font-size="10" text-anchor="middle">1</text>' + TXT('only child'),
    'twin': BG + P(22, '#8e24aa') + P(42, '#8e24aa') + TXT('twins'),
    'stepsister': BG + P(20, '#e91e63') + P(44, '#ffb300') + '<path d="M26 40 h12" stroke="#999" stroke-width="2" stroke-dasharray="2 2"/>' + TXT('stepsister'),
    'in-laws': BG + P(14, '#757575') + P(30, '#757575') + HEART.replace('32', '48').replace('M48 22', 'M48 30') + TXT('in-laws'),
    'single-parent': BG + P(26, '#1e88e5') + '<circle cx="42" cy="38" r="3.5" fill="#fb8c00"/><path d="M38 52 v-8 q0 -4 4 -4 q4 0 4 4 v8z" fill="#fb8c00"/>' + TXT('single parent'),
    'relative': BG + P(14, '#43a047') + P(32, '#1e88e5') + P(50, '#e53935') + TXT('relatives'),
    'brother-in-law': BG + P(18, '#e91e63') + HEART + P(46, '#1e88e5') + TXT('brother-in-law'),
    'ex-husband': BG + P(20, '#e91e63') + P(44, '#1e88e5') + '<path d="M28 24 l8 8 M36 24 l-8 8" stroke="#e53935" stroke-width="3"/>' + TXT('ex-husband'),
    'bride': BG + '<circle cx="32" cy="26" r="5" fill="#ffcc80"/><path d="M20 54 l6 -22 h12 l6 22z" fill="#fafafa" stroke="#ccc"/><path d="M22 22 q10 -10 20 0" stroke="#fafafa" stroke-width="3" fill="none"/>' + TXT('bride'),
    'groom': BG + '<circle cx="32" cy="26" r="5" fill="#ffcc80"/><path d="M24 54 v-16 q0 -6 8 -6 q8 0 8 6 v16z" fill="#424242"/><path d="M30 34 h4 l-2 4z" fill="#e53935"/>' + TXT('groom'),
    'girlfriend': BG + P(22, '#e91e63') + P(42, '#1e88e5') + HEART.replace('y="22"', '') + TXT('girlfriend'),
    'employer': BG + '<rect x="12" y="30" width="40" height="22" fill="#90a4ae"/><rect x="18" y="34" width="6" height="6" fill="#fff"/><rect x="29" y="34" width="6" height="6" fill="#fff"/><rect x="40" y="34" width="6" height="6" fill="#fff"/><rect x="26" y="18" width="12" height="12" fill="#546e7a"/>' + TXT('employer'),
    'employee': BG + P(32, '#1e88e5') + '<rect x="40" y="40" width="12" height="10" fill="#8d6e63"/>' + TXT('employee'),
    'boss': BG + P(32, '#424242') + '<path d="M26 22 l2 -6 l4 4 l4 -4 l2 6z" fill="#fdd835"/>' + TXT('boss'),
    'colleague': BG + P(20, '#1e88e5') + P(44, '#43a047') + '<rect x="12" y="52" width="40" height="4" fill="#8d6e63"/>' + TXT('colleagues'),
    'business-partner': BG + P(20, '#1e88e5') + P(44, '#fb8c00') + '<path d="M26 40 h12" stroke="#333" stroke-width="4"/>' + TXT('business partners'),
    'classmate': BG + P(20, '#8e24aa') + P(44, '#43a047') + '<rect x="22" y="8" width="20" height="10" fill="#fafafa" stroke="#555"/><path d="M26 12 h12 M26 15 h8" stroke="#555"/>' + TXT('classmates'),
    'roommate': BG + '<path d="M10 28 l22 -14 l22 14 v24 h-44z" fill="#ffe0b2" stroke="#8d6e63"/>' + P(24, '#1e88e5', 32) + P(40, '#e53935', 32) + TXT('roommates'),
    'neighbor': BG + '<path d="M4 30 l12 -10 l12 10 v22 h-24z" fill="#ffcc80"/><path d="M36 30 l12 -10 l12 10 v22 h-24z" fill="#a5d6a7"/>' + TXT('neighbor'),
    'stranger': BG + P(32, '#9e9e9e') + '<text x="32" y="31" font-family="sans-serif" font-size="9" font-weight="bold" fill="#fff" text-anchor="middle">?</text>' + TXT('stranger'),
    'enemy': BG + P(18, '#e53935') + P(46, '#e53935') + '<path d="M26 30 l4 4 l-4 4 M38 30 l-4 4 l4 4" stroke="#333" stroke-width="2" fill="none"/>' + TXT('enemy'),
    'actor': BG + P(32, '#5e35b1') + '<path d="M22 22 q10 -8 20 0" stroke="#fdd835" stroke-width="2" fill="none"/><rect x="26" y="20" width="12" height="4" fill="#333"/>' + TXT('who'),
    'machine': BG + '<rect x="14" y="26" width="36" height="24" rx="3" fill="#90a4ae"/><rect x="20" y="32" width="24" height="8" fill="#ffcc80"/><circle cx="20" cy="46" r="2" fill="#e53935"/>' + TXT('that / which'),
    'restaurant': BG + '<rect x="10" y="24" width="44" height="28" fill="#ffcc80" stroke="#8d6e63"/><path d="M10 24 l22 -10 l22 10" fill="#e53935"/><rect x="26" y="38" width="12" height="14" fill="#8d6e63"/>' + TXT('where'),
    'sweater': BG + '<path d="M18 22 l8 -6 h12 l8 6 l-4 6 l-2 -2 v24 h-16 v-24 l-2 2z" fill="#43a047"/>' + TXT('(that)'),
    'children': BG + '<circle cx="20" cy="30" r="4" fill="#fb8c00"/><path d="M15 50 v-10 q0 -5 5 -5 q5 0 5 5 v10z" fill="#fb8c00"/><circle cx="32" cy="30" r="4" fill="#1e88e5"/><path d="M27 50 v-10 q0 -5 5 -5 q5 0 5 5 v10z" fill="#1e88e5"/><circle cx="44" cy="30" r="4" fill="#e91e63"/><path d="M39 50 v-10 q0 -5 5 -5 q5 0 5 5 v10z" fill="#e91e63"/><text x="32" y="20" font-size="10" text-anchor="middle">♪</text>' + TXT('who / that'),
    'dog': BG + '<ellipse cx="32" cy="40" rx="14" ry="8" fill="#8d6e63"/><circle cx="46" cy="32" r="7" fill="#8d6e63"/><path d="M42 26 l-2 -6 l4 2z M50 26 l2 -6 l-4 2z" fill="#6d4c41"/><circle cx="48" cy="31" r="1.5" fill="#000"/>' + TXT('that'),
    'square': BG + '<rect x="10" y="14" width="44" height="36" fill="#c8e6c9"/><circle cx="32" cy="32" r="6" fill="#4fc3f7"/><rect x="14" y="18" width="6" height="6" fill="#43a047"/><rect x="44" y="40" width="6" height="6" fill="#43a047"/>' + TXT('where'),
    'hospital': BG + '<rect x="12" y="18" width="40" height="34" fill="#fafafa" stroke="#999"/><rect x="26" y="26" width="12" height="4" fill="#e53935"/><rect x="30" y="22" width="4" height="12" fill="#e53935"/>' + TXT('where'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
