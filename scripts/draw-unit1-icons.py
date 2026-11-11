#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/unit1 (Basic 1 / 1A countries & nationalities, 1B jobs, verb be). Original artwork.
Run once: python3 scripts/draw-unit1-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'unit1'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#e3f2fd"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
def hbands(*cols):
    h = 36 / len(cols)
    return ''.join(f'<rect x="10" y="{10+i*h:.1f}" width="44" height="{h:.1f}" fill="{c}"/>' for i, c in enumerate(cols))
def vbands(*cols):
    w = 44 / len(cols)
    return ''.join(f'<rect x="{10+i*w:.1f}" y="10" width="{w:.1f}" height="36" fill="{c}"/>' for i, c in enumerate(cols))
FRAME = '<rect x="10" y="10" width="44" height="36" fill="none" stroke="#999"/>'
def person(skin, shirt, extra=''):
    return f'<circle cx="32" cy="20" r="8" fill="{skin}"/><path d="M18 50 v-12 q0 -10 14 -10 q14 0 14 10 v12z" fill="{shirt}"/>{extra}'
ICONS = {
    'argentina': BG + hbands('#74acdf', '#fff', '#74acdf') + '<circle cx="32" cy="28" r="4" fill="#f6b40e"/>' + FRAME,
    'brazil': BG + hbands('#009c3b') + '<path d="M32 14 l18 14 l-18 14 l-18 -14z" fill="#ffdf00"/><circle cx="32" cy="28" r="6" fill="#002776"/>' + FRAME,
    'canada': BG + vbands('#d52b1e', '#fff', '#d52b1e') + '<path d="M32 18 l3 6 l4 -2 l-2 8 h-10 l-2 -8 l4 2z" fill="#d52b1e"/>' + FRAME,
    'chile': BG + hbands('#fff', '#d52b1e') + '<rect x="10" y="10" width="18" height="18" fill="#0039a6"/><path d="M19 13 l2 5 h5 l-4 3 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -3 h5z" fill="#fff"/>' + FRAME,
    'china': BG + hbands('#de2910') + '<path d="M18 14 l3 7 h7 l-6 4 l2 7 l-6 -4 l-6 4 l2 -7 l-6 -4 h7z" fill="#ffde00"/>' + FRAME,
    'colombia': BG + '<rect x="10" y="10" width="44" height="18" fill="#fcd116"/><rect x="10" y="28" width="44" height="9" fill="#003893"/><rect x="10" y="37" width="44" height="9" fill="#ce1126"/>' + FRAME,
    'france': BG + vbands('#0055a4', '#fff', '#ef4135') + FRAME,
    'germany': BG + hbands('#000', '#dd0000', '#ffce00') + FRAME,
    'india': BG + hbands('#ff9933', '#fff', '#138808') + '<circle cx="32" cy="28" r="4" fill="none" stroke="#000080" stroke-width="1.5"/>' + FRAME,
    'italy': BG + vbands('#009246', '#fff', '#ce2b37') + FRAME,
    'japan': BG + hbands('#fff') + '<circle cx="32" cy="28" r="9" fill="#bc002d"/>' + FRAME,
    'mexico': BG + vbands('#006847', '#fff', '#ce1126') + '<circle cx="32" cy="28" r="4" fill="#8d6e63"/>' + FRAME,
    'peru': BG + vbands('#d91023', '#fff', '#d91023') + FRAME,
    'russia': BG + hbands('#fff', '#0039a6', '#d52b1e') + FRAME,
    'spain': BG + '<rect x="10" y="10" width="44" height="9" fill="#aa151b"/><rect x="10" y="19" width="44" height="18" fill="#f1bf00"/><rect x="10" y="37" width="44" height="9" fill="#aa151b"/>' + FRAME,
    'turkey': BG + hbands('#e30a17') + '<circle cx="28" cy="28" r="8" fill="#fff"/><circle cx="30" cy="28" r="6.5" fill="#e30a17"/><path d="M39 24 l1.5 3 h3 l-2.5 2 l1 3 l-3 -2 l-3 2 l1 -3 l-2.5 -2 h3z" fill="#fff"/>' + FRAME,
    'uk': BG + hbands('#012169') + '<path d="M10 10 l44 36 M54 10 l-44 36" stroke="#fff" stroke-width="6"/><path d="M10 10 l44 36 M54 10 l-44 36" stroke="#c8102e" stroke-width="2"/><path d="M32 10 v36 M10 28 h44" stroke="#fff" stroke-width="8"/><path d="M32 10 v36 M10 28 h44" stroke="#c8102e" stroke-width="4"/>' + FRAME,
    'us': BG + ''.join(f'<rect x="10" y="{10+i*4}" width="44" height="4" fill="{"#b22234" if i%2==0 else "#fff"}"/>' for i in range(9)) + '<rect x="10" y="10" width="18" height="20" fill="#3c3b6e"/>' + FRAME,
    'actor': BG + person('#f1c27d', '#8e24aa', '<path d="M20 8 h24 l-4 8 h-16z" fill="#333"/><circle cx="26" cy="12" r="1.5" fill="#fff"/><circle cx="38" cy="12" r="1.5" fill="#fff"/>') + TXT('an actor'),
    'chef': BG + person('#e0ac69', '#fff', '<path d="M22 14 q0 -10 10 -10 q10 0 10 10 v4 h-20z" fill="#fafafa" stroke="#bbb"/>') + TXT('a chef'),
    'doctor': BG + person('#f1c27d', '#fff', '<path d="M24 34 q8 10 16 0" stroke="#1e88e5" stroke-width="2" fill="none"/><circle cx="40" cy="40" r="3" fill="#1e88e5"/>') + TXT('a doctor'),
    'engineer': BG + person('#c68642', '#ff9800', '<path d="M22 18 q0 -10 10 -10 q10 0 10 10z" fill="#ffeb3b"/><rect x="20" y="17" width="24" height="3" fill="#ffeb3b"/>') + TXT('an engineer'),
    'it-worker': BG + person('#f1c27d', '#1e88e5', '<rect x="12" y="40" width="40" height="10" fill="#263238"/><rect x="14" y="42" width="36" height="6" fill="#4fc3f7"/>') + TXT('an IT worker'),
    'office-worker': BG + person('#e0ac69', '#37474f', '<path d="M30 30 h4 v14 h-4z" fill="#e53935"/>') + TXT('an office worker'),
    'police-officer': BG + person('#c68642', '#1a237e', '<rect x="22" y="10" width="20" height="6" fill="#1a237e"/><circle cx="26" cy="36" r="3" fill="#fdd835"/>') + TXT('a police officer'),
    'receptionist': BG + person('#f1c27d', '#ec407a', '<path d="M22 14 q0 10 4 10 M42 14 q0 10 -4 10" stroke="#333" stroke-width="3" fill="none"/>') + TXT('a receptionist'),
    'salesclerk': BG + person('#e0ac69', '#43a047', '<rect x="36" y="38" width="8" height="6" fill="#fff"/>') + TXT('a salesclerk'),
    'singer': BG + person('#c68642', '#e91e63', '<rect x="42" y="22" width="4" height="18" fill="#555"/><circle cx="44" cy="20" r="5" fill="#9e9e9e"/>') + TXT('a singer'),
    'student': BG + person('#f1c27d', '#fdd835', '<rect x="12" y="36" width="12" height="14" rx="2" fill="#1e88e5"/>') + TXT('a student'),
    'taxi-driver': BG + '<rect x="8" y="26" width="48" height="16" rx="4" fill="#fdd835"/><rect x="16" y="18" width="28" height="10" rx="3" fill="#fdd835"/><rect x="18" y="20" width="10" height="7" fill="#90caf9"/><circle cx="18" cy="44" r="5" fill="#333"/><circle cx="46" cy="44" r="5" fill="#333"/>' + TXT('a taxi driver'),
    'teacher': BG + person('#c68642', '#5e35b1', '<rect x="8" y="10" width="20" height="14" fill="#2e7d32"/><text x="18" y="21" font-size="8" fill="#fff" text-anchor="middle">a b</text>') + TXT('a teacher'),
    'tour-guide': BG + person('#f1c27d', '#ff7043', '<rect x="44" y="8" width="2" height="24" fill="#555"/><path d="M46 8 h10 l-4 4 l4 4 h-10z" fill="#e53935"/>') + TXT('a tour guide'),
    'tv-host': BG + person('#e0ac69', '#b71c1c', '<rect x="8" y="8" width="16" height="12" fill="#333"/><rect x="10" y="10" width="12" height="8" fill="#4fc3f7"/>') + TXT('a TV host'),
    'waiter': BG + person('#c68642', '#000', '<path d="M28 30 l4 6 l4 -6" fill="#fff"/><ellipse cx="48" cy="26" rx="8" ry="2" fill="#bdbdbd"/>') + TXT('a waiter'),
    'be-i': BG + person('#f1c27d', '#1e88e5') + TXT("I'm", 60, 9, '#1e88e5'),
    'be-you': BG + person('#e0ac69', '#43a047', '<path d="M8 30 l8 0" stroke="#333" stroke-width="2"/>') + TXT("You're", 60, 9, '#43a047'),
    'be-he': BG + person('#c68642', '#5e35b1', '<rect x="26" y="10" width="12" height="4" fill="#333"/>') + TXT("He's", 60, 9, '#5e35b1'),
    'be-she': BG + person('#f1c27d', '#e91e63', '<path d="M22 14 q0 14 4 14 M42 14 q0 14 -4 14" stroke="#6d4c41" stroke-width="3" fill="none"/>') + TXT("She's", 60, 9, '#e91e63'),
    'be-it': BG + '<rect x="14" y="22" width="36" height="20" rx="4" fill="#e53935"/><circle cx="22" cy="44" r="4" fill="#333"/><circle cx="42" cy="44" r="4" fill="#333"/>' + TXT("It's", 60, 9, '#e53935'),
    'be-not': BG + '<circle cx="32" cy="28" r="14" fill="#e53935"/><path d="M24 28 h16" stroke="#fff" stroke-width="4"/>' + TXT("isn't / 'm not", 60, 7),
    'be-question': BG + TXT('?', 38, 30, '#1e88e5') + TXT('Am / Are / Is', 60, 7),
    'be-yes': BG + '<circle cx="32" cy="28" r="14" fill="#43a047"/><path d="M24 28 l6 6 l12 -12" stroke="#fff" stroke-width="4" fill="none"/>' + TXT('Yes, I am.', 60, 7),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
