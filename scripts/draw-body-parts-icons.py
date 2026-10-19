#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/body-10c used by Intermediate 1 / 10C Parts of the body (original artwork).
Each icon shows a simple figure with the named part highlighted in red. Run once: python3 scripts/draw-body-parts-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'body-10c'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#e3f2fd"/>'
HL = '#e63946'
SKIN = '#f5c6a5'
# full body figure (head at top, arms out, legs)
BODY = f'<circle cx="32" cy="10" r="6" fill="{SKIN}"/><rect x="29" y="16" width="6" height="4" fill="{SKIN}"/><rect x="22" y="20" width="20" height="20" rx="4" fill="#4d96ff"/><rect x="14" y="21" width="7" height="16" rx="3" fill="{SKIN}"/><rect x="43" y="21" width="7" height="16" rx="3" fill="{SKIN}"/><rect x="23" y="40" width="8" height="18" rx="2" fill="#333"/><rect x="33" y="40" width="8" height="18" rx="2" fill="#333"/><rect x="22" y="56" width="10" height="4" rx="2" fill="{SKIN}"/><rect x="32" y="56" width="10" height="4" rx="2" fill="{SKIN}"/>'
# big face
FACE = f'<ellipse cx="32" cy="30" rx="18" ry="22" fill="{SKIN}"/><path d="M14 22 q18 -16 36 0 v-4 q-18 -14 -36 0z" fill="#5d4037"/><circle cx="25" cy="28" r="2" fill="#333"/><circle cx="39" cy="28" r="2" fill="#333"/><path d="M32 30 l-2 6 h4z" fill="#e0a080"/><path d="M26 42 q6 4 12 0" stroke="#c0392b" stroke-width="2" fill="none"/><rect x="26" y="52" width="12" height="8" fill="{SKIN}"/>'
# torso with organs
TORSO = f'<circle cx="32" cy="8" r="5" fill="{SKIN}"/><path d="M18 16 h28 v34 a14 10 0 0 1 -28 0z" fill="{SKIN}"/>'
# big hand
HAND = f'<rect x="20" y="30" width="24" height="26" rx="6" fill="{SKIN}"/>' + ''.join(f'<rect x="{x}" y="{y}" width="5" height="{h}" rx="2.5" fill="{SKIN}"/>' for x, y, h in [(20, 12, 20), (26, 8, 24), (32, 6, 26), (38, 10, 22)]) + f'<rect x="12" y="30" width="10" height="6" rx="3" fill="{SKIN}" transform="rotate(-40 17 33)"/>'
# big foot/leg
LEG = f'<rect x="24" y="4" width="14" height="30" rx="4" fill="{SKIN}"/><rect x="24" y="32" width="14" height="18" rx="4" fill="{SKIN}"/><path d="M24 48 h14 v8 h12 a4 4 0 0 1 0 6 h-26z" fill="{SKIN}"/>'
# arm
ARM = f'<rect x="6" y="26" width="26" height="12" rx="6" fill="{SKIN}"/><rect x="30" y="26" width="22" height="12" rx="6" fill="{SKIN}" transform="rotate(-30 32 32)"/>'
R = lambda x, y, w, h, rx=3: f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{HL}" opacity=".85"/>'
C = lambda x, y, r: f'<circle cx="{x}" cy="{y}" r="{r}" fill="{HL}" opacity=".85"/>'
LBL = lambda t: f'<text x="32" y="63" font-family="sans-serif" font-size="6" font-weight="bold" fill="#333" text-anchor="middle">{t}</text>'

ICONS = {
    'foot': BG + LEG + '<path d="M24 48 h14 v8 h12 a4 4 0 0 1 0 6 h-26z" fill="' + HL + '"/>',
    'knee': BG + LEG + C(31, 33, 6),
    'toes': BG + LEG + ''.join(C(x, 60, 2.2) for x in (42, 46, 50, 54)) + C(38, 59, 3),
    'ankle': BG + LEG + R(24, 44, 14, 6, 3),
    'finger': BG + HAND + f'<rect x="32" y="6" width="5" height="26" rx="2.5" fill="{HL}"/>',
    'wrist': BG + HAND + R(20, 54, 24, 6, 2),
    'elbow': BG + ARM + C(31, 32, 6),
    'hand': BG + ARM + C(10, 32, 7),
    'arm': BG + ARM + f'<rect x="6" y="26" width="26" height="12" rx="6" fill="{HL}" opacity=".85"/>',
    'thumb': BG + HAND + f'<rect x="12" y="30" width="10" height="6" rx="3" fill="{HL}" transform="rotate(-40 17 33)"/>',
    'neck': BG + FACE + R(26, 52, 12, 8, 1),
    'cheek': BG + FACE + C(21, 36, 5) + C(43, 36, 5),
    'chin': BG + FACE + f'<path d="M24 46 q8 8 16 0 v4 q-8 6 -16 0z" fill="{HL}"/>',
    'lips': BG + FACE + f'<path d="M24 41 q8 -3 16 0 q-8 7 -16 0z" fill="{HL}"/>',
    'back': BG + f'<circle cx="32" cy="10" r="6" fill="{SKIN}"/><rect x="29" y="16" width="6" height="4" fill="{SKIN}"/><rect x="22" y="20" width="20" height="20" rx="4" fill="{HL}"/><rect x="31" y="22" width="2" height="16" fill="#8d2a33"/><rect x="14" y="21" width="7" height="16" rx="3" fill="{SKIN}"/><rect x="43" y="21" width="7" height="16" rx="3" fill="{SKIN}"/><rect x="23" y="40" width="8" height="18" rx="2" fill="#333"/><rect x="33" y="40" width="8" height="18" rx="2" fill="#333"/>' + LBL('BACK'),
    'chest': BG + BODY + R(24, 22, 16, 10, 3),
    'forehead': BG + FACE + f'<path d="M16 22 q16 -8 32 0 v-6 q-16 -8 -32 0z" fill="{HL}" opacity=".85"/>',
    'shoulder': BG + BODY + C(21, 22, 5) + C(43, 22, 5),
    'heart': BG + TORSO + f'<path d="M34 28 c-3 -5 -10 -1 -6 5 l6 6 l6 -6 c4 -6 -3 -10 -6 -5z" fill="{HL}"/>',
    'brain': BG + f'<ellipse cx="32" cy="34" rx="18" ry="22" fill="{SKIN}"/><path d="M16 30 a16 14 0 0 1 32 0 v4 h-32z" fill="{HL}"/><path d="M20 24 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0 M22 30 q10 -6 20 0" stroke="#8d2a33" stroke-width="1.5" fill="none"/><circle cx="25" cy="42" r="2" fill="#333"/><circle cx="39" cy="42" r="2" fill="#333"/>',
    'stomach': BG + TORSO + f'<ellipse cx="32" cy="40" rx="8" ry="6" fill="{HL}"/>',
    'skin': BG + f'<rect x="10" y="14" width="44" height="36" rx="6" fill="{SKIN}"/>' + ''.join(f'<circle cx="{x}" cy="{y}" r="1" fill="#d9a07c"/>' for x, y in [(18, 22), (28, 20), (40, 24), (22, 34), (34, 32), (46, 38), (30, 44), (16, 44)]) + f'<path d="M10 20 h44" stroke="{HL}" stroke-width="2"/>' + LBL('SKIN'),
    'muscle': BG + f'<rect x="8" y="30" width="22" height="12" rx="6" fill="{SKIN}"/><rect x="28" y="12" width="12" height="24" rx="6" fill="{SKIN}"/><ellipse cx="22" cy="24" rx="8" ry="7" fill="{HL}"/><circle cx="34" cy="10" r="5" fill="{SKIN}"/>' + LBL('MUSCLE'),
    'bone': BG + f'<rect x="18" y="29" width="28" height="6" rx="3" fill="#fff" stroke="#999"/><circle cx="18" cy="27" r="4" fill="#fff" stroke="#999"/><circle cx="18" cy="37" r="4" fill="#fff" stroke="#999"/><circle cx="46" cy="27" r="4" fill="#fff" stroke="#999"/><circle cx="46" cy="37" r="4" fill="#fff" stroke="#999"/><path d="M30 32 l4 -3 M34 32 l-4 3" stroke="{HL}" stroke-width="1.5"/>' + LBL('BONE'),
}

for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
