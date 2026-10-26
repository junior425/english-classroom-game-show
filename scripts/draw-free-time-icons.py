#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/free-time (Basic 1 / 10A Free-time activities + present continuous for future). Original artwork.
Run once: python3 scripts/draw-free-time-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'free-time'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#fff8e1"/>'
PERSON = lambda x, fill: f'<circle cx="{x}" cy="30" r="5" fill="{fill}"/><path d="M{x-7} 54 v-12 q0 -6 7 -6 q7 0 7 6 v12z" fill="{fill}"/>'
TXT = lambda t, y=58, size=7, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
ICONS = {
    'go-to-a-concert': BG + '<rect x="6" y="40" width="52" height="14" fill="#333"/>' + PERSON(32, '#e63946') + '<path d="M14 16 l4 10 M50 16 l-4 10" stroke="#ffd54f" stroke-width="3"/><circle cx="20" cy="12" r="3" fill="#ffd54f"/><circle cx="44" cy="12" r="3" fill="#ffd54f"/><text x="32" y="22" font-size="12" text-anchor="middle">♪</text>',
    'go-to-a-festival': BG + '<path d="M6 56 l12 -26 l12 26z" fill="#4d96ff"/><path d="M34 56 l12 -26 l12 26z" fill="#e63946"/><path d="M4 10 h56" stroke="#999" stroke-width="1"/>' + ''.join(f'<path d="M{8+i*8} 10 l4 6 l4 -6" fill="{c}"/>' for i, c in enumerate(['#ffd54f','#8bc34a','#ff7043','#26c6da','#ab47bc','#ffd54f','#8bc34a'])),
    'go-to-the-beach': BG + '<rect x="0" y="36" width="64" height="28" fill="#ffe0b2"/><rect x="0" y="36" width="64" height="8" fill="#4fc3f7"/><circle cx="50" cy="14" r="7" fill="#ffb300"/><path d="M14 54 v-22 M4 32 q10 -10 20 0z" fill="#e63946" stroke="#e63946" stroke-width="2"/>',
    'have-a-barbecue': BG + '<ellipse cx="32" cy="30" rx="20" ry="8" fill="#333"/><rect x="12" y="30" width="40" height="8" fill="#555"/><path d="M20 38 l-6 18 M44 38 l6 18 M32 38 v18" stroke="#333" stroke-width="3"/><rect x="18" y="24" width="10" height="5" rx="2" fill="#d84315"/><rect x="34" y="24" width="12" height="5" rx="2" fill="#bf360c"/><path d="M24 20 q2 -6 0 -10 M40 20 q2 -6 0 -10" stroke="#999" stroke-width="2" fill="none"/>',
    'have-a-good-time': BG + PERSON(22, '#ff7043') + PERSON(42, '#26c6da') + '<path d="M18 32 q4 3 8 0 M38 32 q4 3 8 0" stroke="#fff" stroke-width="1.5" fill="none"/><path d="M8 12 l4 4 M14 8 l2 6 M56 12 l-4 4 M50 8 l-2 6" stroke="#ffd54f" stroke-width="2"/>',
    'have-a-party': BG + '<path d="M20 56 l8 -30 l12 0 l8 30z" fill="#ab47bc"/><circle cx="14" cy="14" r="4" fill="#e63946"/><circle cx="32" cy="10" r="4" fill="#ffd54f"/><circle cx="50" cy="14" r="4" fill="#4d96ff"/><path d="M14 18 v10 M32 14 v12 M50 18 v10" stroke="#555" stroke-width="1.5"/>',
    'stay-at-a-hotel': BG + '<rect x="12" y="8" width="40" height="48" fill="#90a4ae"/>' + ''.join(f'<rect x="{18+c*12}" y="{14+r*10}" width="6" height="6" fill="#ffd54f"/>' for r in range(4) for c in range(3)) + '<rect x="26" y="48" width="12" height="8" fill="#5d4037"/>' + TXT('HOTEL', 7, 6, '#333'),
    'stay-home': BG + '<path d="M8 32 L32 10 L56 32z" fill="#e63946"/><rect x="14" y="32" width="36" height="24" fill="#ffcc80"/><rect x="28" y="40" width="8" height="16" fill="#5d4037"/><rect x="40" y="38" width="6" height="6" fill="#4fc3f7"/>',
    'stay-in-a-tent': BG + '<rect x="0" y="48" width="64" height="16" fill="#8bc34a"/><path d="M8 48 L32 14 L56 48z" fill="#ff7043"/><path d="M32 14 L32 48 L22 48z" fill="#bf360c"/><circle cx="52" cy="12" r="5" fill="#ffd54f"/>',
    'visit-a-museum': BG + '<rect x="8" y="48" width="48" height="8" fill="#90a4ae"/><path d="M6 22 L32 8 L58 22z" fill="#78909c"/>' + ''.join(f'<rect x="{12+i*11}" y="22" width="6" height="26" fill="#cfd8dc"/>' for i in range(4)),
    'visit-an-art-gallery': BG + '<rect x="10" y="12" width="20" height="24" fill="#5d4037"/><rect x="13" y="15" width="14" height="18" fill="#4fc3f7"/><rect x="36" y="12" width="18" height="18" fill="#5d4037"/><rect x="39" y="15" width="12" height="12" fill="#ffd54f"/>' + PERSON(32, '#333'),
    'visit-family-friends': BG + PERSON(16, '#ab47bc') + PERSON(32, '#26c6da') + PERSON(48, '#ff7043') + '<path d="M8 16 q6 -8 12 0 q6 -8 12 0" stroke="#e63946" stroke-width="2" fill="none"/>',
    'watch-a-movie': BG + '<rect x="8" y="10" width="48" height="30" rx="2" fill="#333"/><rect x="11" y="13" width="42" height="24" fill="#4d96ff"/><path d="M26 18 l14 7 l-14 7z" fill="#fff"/>' + PERSON(22, '#555') + PERSON(42, '#555'),
    'watch-a-soccer-game': BG + '<rect x="4" y="30" width="56" height="26" fill="#43a047"/><rect x="4" y="30" width="56" height="26" fill="none" stroke="#fff" stroke-width="2"/><path d="M32 30 v26" stroke="#fff" stroke-width="2"/><circle cx="32" cy="43" r="5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="20" cy="18" r="6" fill="#fff" stroke="#333" stroke-width="1.5"/><path d="M17 15 l6 6 M23 15 l-6 6" stroke="#333" stroke-width="1"/>',
    'watch-a-video': BG + '<rect x="6" y="18" width="52" height="30" rx="4" fill="#333"/><rect x="10" y="22" width="44" height="22" fill="#e63946"/><path d="M27 27 l12 6 l-12 6z" fill="#fff"/><circle cx="32" cy="52" r="1.5" fill="#999"/>',
    # grammar
    'tonight': BG + '<path d="M38 12 a16 16 0 1 0 14 24 a14 14 0 0 1 -14 -24z" fill="#ffd54f"/><circle cx="16" cy="18" r="2" fill="#ffd54f"/><circle cx="22" cy="40" r="1.5" fill="#ffd54f"/>' + TXT('TONIGHT'),
    'tomorrow': BG + '<rect x="12" y="12" width="40" height="36" rx="3" fill="#fff" stroke="#4d96ff" stroke-width="2"/><rect x="12" y="12" width="40" height="8" fill="#4d96ff"/><path d="M22 32 h18 M34 26 l6 6 l-6 6" stroke="#e63946" stroke-width="3" fill="none"/>' + TXT('TOMORROW'),
    'next-week': BG + '<rect x="8" y="12" width="48" height="36" rx="3" fill="#fff" stroke="#43a047" stroke-width="2"/><rect x="8" y="12" width="48" height="8" fill="#43a047"/>' + ''.join(f'<rect x="{12+i*6}" y="24" width="4" height="4" fill="#ccc"/>' for i in range(7)) + ''.join(f'<rect x="{12+i*6}" y="32" width="4" height="4" fill="#43a047"/>' for i in range(7)) + TXT('NEXT WEEK'),
    'this-afternoon': BG + '<circle cx="32" cy="30" r="10" fill="#ffb300"/>' + ''.join(f'<path d="M32 30 l{dx} {dy}" stroke="#ffb300" stroke-width="2" transform="translate({dx*0.9} {dy*0.9})"/>' for dx, dy in [(0,-16),(0,16),(-16,0),(16,0),(11,-11),(-11,11),(11,11),(-11,-11)]) + TXT('THIS AFTERNOON'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
