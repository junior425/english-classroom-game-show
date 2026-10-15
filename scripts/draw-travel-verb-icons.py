#!/usr/bin/env python3
"""Extra flat SVG illustrations for public/img/transport used by Basic 1 / 8A travel verbs (original artwork).
Run once: python3 scripts/draw-travel-verb-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'transport'
SKY = '<rect width="64" height="64" rx="8" fill="#cfe8ff"/>'
ROAD = lambda y=40: f'<rect x="0" y="{y}" width="64" height="{64 - y}" fill="#4a4e57"/><rect x="0" y="{y + 10}" width="64" height="2" fill="#ffd54a"/>'
PERSON = lambda x, y, shirt='#e63946': f'<circle cx="{x}" cy="{y}" r="4" fill="#f5c6a5"/><rect x="{x - 4}" y="{y + 4}" width="8" height="11" rx="2" fill="{shirt}"/><rect x="{x - 3}" y="{y + 15}" width="2.5" height="8" fill="#222"/><rect x="{x + .5}" y="{y + 15}" width="2.5" height="8" fill="#222"/>'
TAXI = lambda x, y: f'<rect x="{x}" y="{y + 10}" width="40" height="12" rx="3" fill="#ffd54a"/><rect x="{x + 7}" y="{y + 2}" width="26" height="10" rx="3" fill="#ffd54a"/><rect x="{x + 10}" y="{y + 4}" width="9" height="7" fill="#bde0fe"/><rect x="{x + 22}" y="{y + 4}" width="9" height="7" fill="#bde0fe"/><rect x="{x + 15}" y="{y - 3}" width="10" height="5" rx="1" fill="#333"/><circle cx="{x + 8}" cy="{y + 23}" r="4" fill="#222"/><circle cx="{x + 32}" cy="{y + 23}" r="4" fill="#222"/>'
BUS = lambda x, y, c='#f4a261': f'<rect x="{x}" y="{y}" width="40" height="28" rx="4" fill="{c}"/><rect x="{x + 3}" y="{y + 4}" width="34" height="10" fill="#bde0fe"/><rect x="{x + 16}" y="{y + 16}" width="8" height="12" fill="#333"/><circle cx="{x + 8}" cy="{y + 30}" r="4" fill="#222"/><circle cx="{x + 32}" cy="{y + 30}" r="4" fill="#222"/>'
TRAIN = lambda x, y: f'<rect x="{x}" y="{y}" width="44" height="26" rx="4" fill="#e63946"/><rect x="{x + 4}" y="{y + 4}" width="10" height="8" fill="#bde0fe"/><rect x="{x + 30}" y="{y + 4}" width="10" height="8" fill="#bde0fe"/><rect x="{x + 18}" y="{y + 6}" width="8" height="20" fill="#333"/><circle cx="{x + 8}" cy="{y + 28}" r="3" fill="#222"/><circle cx="{x + 36}" cy="{y + 28}" r="3" fill="#222"/>'

ICONS = {
    'book-a-flight': '<rect width="64" height="64" rx="8" fill="#e8eef5"/><rect x="8" y="12" width="48" height="32" rx="2" fill="#333"/><rect x="11" y="15" width="42" height="26" fill="#fff"/><rect x="4" y="44" width="56" height="4" rx="1" fill="#555"/><path d="M20 30 L40 24 L44 26 L38 30 L40 36 L37 36 L33 31 L28 33 L28 36 L26 36 L25 32 L21 31Z" fill="#4d96ff"/><rect x="14" y="18" width="22" height="3" fill="#ccc"/><rect x="40" y="33" width="10" height="5" rx="1" fill="#2e7d32"/>',
    'fly': SKY + '<circle cx="14" cy="16" r="6" fill="#fff"/><circle cx="20" cy="14" r="8" fill="#fff"/><circle cx="26" cy="17" r="6" fill="#fff"/><path d="M6 40 L50 34 L58 36 L50 40 L40 42 L46 54 L41 54 L30 44 L18 46 L16 52 L13 52 L12 46 L6 44Z" fill="#fff" stroke="#607d8b" stroke-width="2"/><rect x="26" y="37" width="12" height="3" fill="#4d96ff"/>',
    'get-in-a-taxi': SKY + ROAD(46) + TAXI(18, 24) + '<rect x="30" y="28" width="9" height="10" fill="#333"/>' + PERSON(14, 14, '#2e7d32') + '<path d="M18 24 L28 30" stroke="#f5c6a5" stroke-width="3" stroke-linecap="round"/><path d="M22 10 L30 12 L27 8 M30 12 L26 14" stroke="#333" stroke-width="1.5" fill="none"/>',
    'get-out-of-a-taxi': SKY + ROAD(46) + TAXI(4, 24) + '<rect x="16" y="28" width="9" height="10" fill="#333"/>' + PERSON(50, 14, '#9c27b0') + '<path d="M46 24 L36 30" stroke="#f5c6a5" stroke-width="3" stroke-linecap="round"/><path d="M44 10 L52 12 M48 8 L52 12 L48 16" stroke="#333" stroke-width="1.5" fill="none"/>',
    'get-lost': SKY + '<rect x="0" y="44" width="64" height="20" fill="#9aa5b1"/>' + PERSON(32, 16, '#f4a261') + '<rect x="22" y="26" width="20" height="14" fill="#fff" stroke="#8d5524"/><path d="M24 36 L30 30 L34 34 L40 28" stroke="#e63946" stroke-width="1.5" fill="none"/><text x="52" y="20" font-family="sans-serif" font-size="16" font-weight="bold" fill="#e63946" text-anchor="middle">?</text><text x="12" y="24" font-family="sans-serif" font-size="12" font-weight="bold" fill="#e63946" text-anchor="middle">?</text>',
    'get-off-a-bus': SKY + ROAD(50) + BUS(22, 18) + PERSON(12, 24, '#e63946') + '<path d="M26 18 L10 18 M14 14 L10 18 L14 22" stroke="#333" stroke-width="2" fill="none"/>',
    'get-on-a-train': SKY + '<rect x="0" y="48" width="64" height="16" fill="#7c8a99"/><rect x="0" y="48" width="64" height="2" fill="#ffd54a"/>' + TRAIN(16, 18) + PERSON(8, 24, '#4d96ff') + '<path d="M4 16 L20 16 M16 12 L20 16 L16 20" stroke="#333" stroke-width="2" fill="none"/>',
    'sail': SKY + '<rect x="0" y="44" width="64" height="20" fill="#4d96ff"/><path d="M0 46 Q8 42 16 46 T32 46 T48 46 T64 46" stroke="#bde0fe" stroke-width="2" fill="none"/><path d="M14 46 L50 46 L44 54 L20 54Z" fill="#8d5524"/><rect x="31" y="10" width="2" height="36" fill="#333"/><path d="M33 12 L52 44 L33 44Z" fill="#fff"/><path d="M30 20 L16 44 L30 44Z" fill="#e63946"/>',
}

for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
