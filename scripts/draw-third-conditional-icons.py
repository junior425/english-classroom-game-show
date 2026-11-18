#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/third-conditional (Advanced 1 / 11C Third conditional). Original artwork.
Run once: python3 scripts/draw-third-conditional-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'third-conditional'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#ede7f6"/>'
def label(t, y=60, size=6, fill='#311b92'):
    return f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
def clock_back():
    return '<circle cx="32" cy="26" r="16" fill="#fff" stroke="#5e35b1" stroke-width="3"/><path d="M32 26 L32 15 M32 26 L24 30" stroke="#5e35b1" stroke-width="3" stroke-linecap="round"/><path d="M12 12 l-6 6 h8z" fill="#e53935"/>'
ICONS = {
    'emil-angry': BG + '<circle cx="32" cy="22" r="10" fill="#f1c27d"/><path d="M26 27 q6 -4 12 0" stroke="#333" stroke-width="2" fill="none"/><path d="M18 50 v-8 q0 -10 14 -10 q14 0 14 10 v8z" fill="#e53935"/>' + label("wouldn't have been"),
    'party': BG + '<path d="M22 50 l10 -34 l10 34z" fill="#fbc02d"/><circle cx="20" cy="14" r="3" fill="#e53935"/><circle cx="44" cy="12" r="3" fill="#43a047"/><circle cx="48" cy="24" r="3" fill="#1e88e5"/>' + label('would have come'),
    'exam': BG + '<rect x="16" y="10" width="32" height="40" rx="3" fill="#fff" stroke="#5e35b1" stroke-width="2"/><path d="M22 20 h20 M22 28 h20 M22 36 h12" stroke="#bbb" stroke-width="2"/><path d="M36 40 l4 4 l8 -10" stroke="#43a047" stroke-width="3" fill="none"/>' + label('might have passed'),
    'dinner': BG + '<circle cx="32" cy="28" r="16" fill="#fff" stroke="#5e35b1" stroke-width="2"/><circle cx="32" cy="28" r="9" fill="#ff8a65"/><rect x="8" y="14" width="3" height="28" fill="#555"/><rect x="53" y="14" width="3" height="28" fill="#555"/>' + label('could have gone'),
    'email': BG + '<rect x="10" y="16" width="44" height="30" rx="3" fill="#fff" stroke="#5e35b1" stroke-width="2"/><path d="M10 18 l22 16 l22 -16" stroke="#5e35b1" stroke-width="2" fill="none"/>' + label('would have replied'),
    'train': BG + '<rect x="12" y="14" width="40" height="30" rx="6" fill="#1e88e5"/><rect x="18" y="20" width="12" height="10" fill="#bbdefb"/><rect x="34" y="20" width="12" height="10" fill="#bbdefb"/><circle cx="22" cy="48" r="4" fill="#333"/><circle cx="42" cy="48" r="4" fill="#333"/>' + label("wouldn't have missed"),
    'walk': BG + '<circle cx="48" cy="14" r="7" fill="#fbc02d"/><path d="M6 50 q26 -12 52 0" stroke="#43a047" stroke-width="4" fill="none"/><circle cx="28" cy="26" r="5" fill="#f1c27d"/><path d="M28 31 v10 l-5 8 M28 41 l5 8 M28 33 l-6 4 M28 33 l6 4" stroke="#333" stroke-width="2" fill="none"/>' + label('would have gone'),
    'car-broken': BG + '<rect x="10" y="26" width="44" height="16" rx="4" fill="#e53935"/><path d="M18 26 l6 -10 h16 l6 10" fill="#e53935"/><circle cx="20" cy="44" r="5" fill="#333"/><circle cx="44" cy="44" r="5" fill="#333"/><path d="M26 10 q4 -6 8 0 q4 -6 8 0" stroke="#999" stroke-width="2" fill="none"/>' + label("wouldn't have been late"),
    'past-perfect': BG + clock_back() + label('if + had + past participle'),
    'would-have': BG + '<rect x="8" y="14" width="48" height="24" rx="4" fill="#5e35b1"/>' + label('would have', 30, 8, '#fff') + label('+ past participle', 56),
    'd-had': BG + '<rect x="8" y="14" width="48" height="24" rx="4" fill="#1e88e5"/>' + label("'d = had", 30, 9, '#fff') + label('in the if-clause', 56),
    'd-would': BG + '<rect x="8" y="14" width="48" height="24" rx="4" fill="#43a047"/>' + label("'d = would", 30, 9, '#fff') + label('in the main clause', 56),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
