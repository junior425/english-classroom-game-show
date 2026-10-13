#!/usr/bin/env python3
"""Extra flat SVG illustrations for public/img/transport used by Basic 1 / 7B (original artwork).
Run once: python3 scripts/draw-transport-basic-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'transport'
SKY = '<rect width="64" height="64" rx="8" fill="#cfe8ff"/>'
ROAD = lambda y=40: f'<rect x="0" y="{y}" width="64" height="{64 - y}" fill="#4a4e57"/><rect x="0" y="{y + 10}" width="64" height="2" fill="#ffd54a"/>'
CAR = lambda x, y, c: f'<rect x="{x}" y="{y + 6}" width="22" height="9" rx="2" fill="{c}"/><rect x="{x + 4}" y="{y}" width="13" height="8" rx="2" fill="{c}"/><rect x="{x + 6}" y="{y + 1}" width="9" height="5" fill="#bde0fe"/><circle cx="{x + 5}" cy="{y + 15}" r="3" fill="#222"/><circle cx="{x + 17}" cy="{y + 15}" r="3" fill="#222"/>'
PERSON = lambda x, y, shirt='#e63946': f'<circle cx="{x}" cy="{y}" r="4" fill="#f5c6a5"/><rect x="{x - 4}" y="{y + 4}" width="8" height="11" rx="2" fill="{shirt}"/><rect x="{x - 3}" y="{y + 15}" width="2.5" height="8" fill="#222"/><rect x="{x + .5}" y="{y + 15}" width="2.5" height="8" fill="#222"/>'

ICONS = {
    'give-a-ride': SKY + ROAD(44) + CAR(20, 26, '#4d96ff') + PERSON(10, 14, '#2e7d32') + '<path d="M14 26 L19 30" stroke="#f5c6a5" stroke-width="3" stroke-linecap="round"/><text x="50" y="18" font-family="sans-serif" font-size="9" fill="#333" text-anchor="middle">👍</text>',
    'walk': SKY + '<rect x="0" y="44" width="64" height="20" fill="#9aa5b1"/><rect x="0" y="44" width="64" height="3" fill="#7c8a99"/>' + PERSON(30, 14, '#f4a261') + '<circle cx="12" cy="50" r="3" fill="#2e7d32"/><rect x="10" y="30" width="4" height="18" fill="#8d5524"/><circle cx="12" cy="28" r="8" fill="#2e7d32"/>',
    'start-out': SKY + '<rect x="0" y="40" width="64" height="24" fill="#9aa5b1"/><rect x="6" y="18" width="26" height="22" fill="#e9c46a"/><path d="M4 18 L19 6 L34 18Z" fill="#e63946"/><rect x="16" y="28" width="7" height="12" fill="#8d5524"/>' + PERSON(44, 14, '#2b3a67') + '<path d="M50 30 L58 30 L55 27 M58 30 L55 33" stroke="#333" stroke-width="2" fill="none"/>',
}

for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
