#!/usr/bin/env python3
"""Flat SVG cards for public/img/articles (Intermediate 1 / 11C Articles). Original artwork.
Run once: python3 scripts/draw-articles-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'articles'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#ede7f6"/>'
T = lambda t, y, size, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
card = lambda color, big, small: BG + f'<rect x="6" y="14" width="52" height="34" rx="6" fill="{color}"/>' + T(big, 32, 14, '#fff') + T(small, 42, 5.5, '#fff')
ICONS = {
    'a-an': card('#4d96ff', 'a / an', 'first time · one of many'),
    'the': card('#e63946', 'the', 'we know which one'),
    'no-article': card('#43a047', '—', 'general · names · home/work'),
    'dog-first': BG + '<ellipse cx="32" cy="38" rx="14" ry="10" fill="#a1887f"/><circle cx="46" cy="30" r="7" fill="#a1887f"/><circle cx="48" cy="29" r="1.5" fill="#333"/><path d="M40 24 l-2 -8 l6 4" fill="#8d6e63"/>' + T('a dog', 58, 7),
    'dog-the': BG + '<ellipse cx="32" cy="38" rx="14" ry="10" fill="#a1887f"/><circle cx="46" cy="30" r="7" fill="#a1887f"/><circle cx="48" cy="29" r="1.5" fill="#333"/><path d="M40 24 l-2 -8 l6 4" fill="#8d6e63"/><path d="M14 14 l6 8" stroke="#e63946" stroke-width="3"/><path d="M10 10 l4 4" stroke="#e63946" stroke-width="3"/>' + T('the dog', 58, 7),
    'sun': BG + '<circle cx="32" cy="30" r="12" fill="#ffb300"/>' + ''.join(f'<path d="M32 30 l{dx} {dy}" stroke="#ffb300" stroke-width="3" transform="translate({dx*1.1} {dy*1.1})"/>' for dx, dy in [(0,-14),(0,14),(-14,0),(14,0),(10,-10),(-10,10),(10,10),(-10,-10)]) + T('the sun', 58, 7),
    'piano': BG + '<rect x="8" y="22" width="48" height="22" fill="#333"/>' + ''.join(f'<rect x="{10+i*6.5}" y="30" width="5.5" height="13" fill="#fff"/>' for i in range(7)) + ''.join(f'<rect x="{14+i*6.5}" y="30" width="3.5" height="8" fill="#333"/>' for i in [0,1,3,4,5]) + T('the piano', 58, 7),
    'home': BG + '<path d="M8 32 L32 10 L56 32z" fill="#e63946"/><rect x="14" y="32" width="36" height="22" fill="#ffcc80"/><rect x="28" y="40" width="8" height="14" fill="#5d4037"/>' + T('home / work', 58, 7),
    'country': BG + '<circle cx="32" cy="30" r="18" fill="#4fc3f7"/><path d="M20 22 q8 -4 12 4 q6 2 4 10 q-8 6 -14 -2 q-4 -6 -2 -12z" fill="#8bc34a"/><path d="M40 36 q6 2 4 8 q-6 0 -4 -8z" fill="#8bc34a"/>' + T('Venezuela', 58, 7),
    'plural-general': BG + ''.join(f'<circle cx="{14+i*12}" cy="28" r="6" fill="{c}"/>' for i, c in enumerate(['#e63946','#4d96ff','#43a047','#ffb300'])) + T('dogs (in general)', 58, 6.5),
    'meals-days': BG + '<rect x="12" y="12" width="40" height="34" rx="3" fill="#fff" stroke="#4d96ff" stroke-width="2"/><rect x="12" y="12" width="40" height="8" fill="#4d96ff"/>' + T('Tue', 34, 10) + T('lunch on Tuesday', 58, 6.5),
    'superlative': BG + '<rect x="24" y="18" width="16" height="30" fill="#ffb300"/><rect x="8" y="30" width="16" height="18" fill="#bdbdbd"/><rect x="40" y="36" width="16" height="12" fill="#bf8f5f"/>' + T('1', 32, 10, '#fff') + T('the fastest', 58, 7),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
