#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/transportation (Basic 2 / 11A Travel & transportation + have to). Original artwork.
Run once: python3 scripts/draw-transportation-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'transportation'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#e3f2fd"/>'
WATER = BG + '<rect x="0" y="44" width="64" height="20" fill="#4fc3f7"/>'
SKY = '<rect width="64" height="64" rx="8" fill="#bbdefb"/><circle cx="50" cy="14" r="6" fill="#ffd54f"/>'
ROAD = BG + '<rect x="0" y="48" width="64" height="16" fill="#616161"/><path d="M4 56 h10 M24 56 h10 M44 56 h10" stroke="#fff" stroke-width="2"/>'
WHEEL = lambda x, y, r=5: f'<circle cx="{x}" cy="{y}" r="{r}" fill="#222"/><circle cx="{x}" cy="{y}" r="{r/2}" fill="#bbb"/>'
TXT = lambda t, y=58, size=7, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
PERSON = lambda x, fill: f'<circle cx="{x}" cy="26" r="5" fill="{fill}"/><path d="M{x-6} 50 v-12 q0 -6 6 -6 q6 0 6 6 v12z" fill="{fill}"/>'
ICONS = {
    'car': ROAD + '<path d="M10 46 v-8 l8 -10 h26 l8 10 v8z" fill="#e53935"/><rect x="20" y="30" width="22" height="7" fill="#b3e5fc"/>' + WHEEL(18, 47) + WHEEL(46, 47),
    'van': ROAD + '<rect x="8" y="24" width="48" height="22" rx="3" fill="#fafafa" stroke="#999"/><rect x="42" y="28" width="10" height="8" fill="#b3e5fc"/>' + WHEEL(18, 47) + WHEEL(46, 47),
    'subway': BG + '<path d="M4 44 h56" stroke="#333" stroke-width="3"/><rect x="8" y="22" width="48" height="22" rx="8" fill="#9e9e9e"/><rect x="14" y="27" width="10" height="9" fill="#b3e5fc"/><rect x="28" y="27" width="10" height="9" fill="#b3e5fc"/><rect x="42" y="27" width="10" height="9" fill="#b3e5fc"/><rect x="0" y="8" width="64" height="8" fill="#8d6e63"/>' + TXT('SUBWAY', 58, 7, '#333'),
    'train': BG + '<path d="M4 46 h56" stroke="#333" stroke-width="3"/><path d="M8 44 v-16 q0 -6 6 -6 h34 q10 0 12 10 v12z" fill="#e53935"/><rect x="16" y="26" width="10" height="8" fill="#b3e5fc"/><rect x="30" y="26" width="10" height="8" fill="#b3e5fc"/><rect x="44" y="28" width="8" height="6" fill="#b3e5fc"/>' + WHEEL(16, 46, 4) + WHEEL(30, 46, 4) + WHEEL(46, 46, 4),
    'ship': WATER + '<path d="M8 46 l6 -12 h36 l6 12z" fill="#263238"/><rect x="18" y="22" width="28" height="12" fill="#fafafa"/><rect x="26" y="14" width="8" height="8" fill="#e53935"/><rect x="36" y="16" width="6" height="6" fill="#e53935"/>',
    'taxi': ROAD + '<path d="M10 46 v-8 l8 -10 h26 l8 10 v8z" fill="#fdd835"/><rect x="20" y="30" width="22" height="7" fill="#b3e5fc"/><rect x="26" y="20" width="12" height="6" fill="#333"/>' + WHEEL(18, 47) + WHEEL(46, 47) + TXT('TAXI', 23, 5, '#fdd835'),
    'bike': ROAD + '<circle cx="18" cy="42" r="9" fill="none" stroke="#222" stroke-width="3"/><circle cx="46" cy="42" r="9" fill="none" stroke="#222" stroke-width="3"/><path d="M18 42 l10 -14 h12 l6 14 M28 28 l-4 14 M40 28 l-6 -6" stroke="#43a047" stroke-width="3" fill="none"/>',
    'foot': BG + '<rect x="0" y="48" width="64" height="16" fill="#a5d6a7"/>' + PERSON(32, '#1e88e5') + '<path d="M26 50 l-4 10 M38 50 l4 10" stroke="#1e88e5" stroke-width="4"/>' + TXT('on foot', 14, 8, '#333'),
    'motorcycle': ROAD + '<circle cx="16" cy="44" r="8" fill="#222"/><circle cx="48" cy="44" r="8" fill="#222"/><path d="M16 44 l10 -12 h14 l8 12z" fill="#ff7043"/><path d="M26 32 l4 -8 h10" stroke="#333" stroke-width="3" fill="none"/>',
    'helicopter': SKY + '<path d="M8 18 h48" stroke="#333" stroke-width="3"/><path d="M32 18 v6" stroke="#333" stroke-width="3"/><ellipse cx="34" cy="34" rx="16" ry="10" fill="#e53935"/><rect x="26" y="28" width="12" height="8" rx="2" fill="#b3e5fc"/><path d="M18 34 h-12 v-6" stroke="#e53935" stroke-width="4" fill="none"/><path d="M24 48 h20 M28 44 v4 M40 44 v4" stroke="#333" stroke-width="2"/>',
    'scooter': ROAD + '<circle cx="18" cy="46" r="6" fill="#222"/><circle cx="46" cy="46" r="6" fill="#222"/><path d="M18 46 l8 -8 h16 l4 8z" fill="#e53935"/><path d="M40 38 l2 -14 h6" stroke="#333" stroke-width="3" fill="none"/><rect x="22" y="32" width="12" height="4" fill="#fafafa"/>',
    'streetcar': BG + '<path d="M4 46 h56" stroke="#333" stroke-width="3"/><path d="M32 10 v10 M22 12 l20 -4" stroke="#333" stroke-width="2"/><rect x="10" y="20" width="44" height="24" rx="5" fill="#fdd835"/><rect x="15" y="25" width="8" height="9" fill="#b3e5fc"/><rect x="28" y="25" width="8" height="9" fill="#b3e5fc"/><rect x="41" y="25" width="8" height="9" fill="#b3e5fc"/>' + WHEEL(18, 46, 3) + WHEEL(46, 46, 3),
    'bus': ROAD + '<rect x="6" y="18" width="52" height="28" rx="4" fill="#43a047"/><rect x="10" y="22" width="10" height="10" fill="#b3e5fc"/><rect x="24" y="22" width="10" height="10" fill="#b3e5fc"/><rect x="38" y="22" width="10" height="10" fill="#b3e5fc"/>' + WHEEL(16, 47) + WHEEL(48, 47),
    'boat': WATER + '<path d="M12 46 l4 -8 h32 l4 8z" fill="#fafafa" stroke="#999"/><rect x="26" y="28" width="14" height="10" fill="#1e88e5"/>',
    'ferry': WATER + '<path d="M6 46 l4 -10 h44 l4 10z" fill="#1565c0"/><rect x="14" y="26" width="36" height="10" fill="#fafafa"/><rect x="18" y="29" width="5" height="4" fill="#b3e5fc"/><rect x="26" y="29" width="5" height="4" fill="#b3e5fc"/><rect x="34" y="29" width="5" height="4" fill="#b3e5fc"/><rect x="42" y="29" width="5" height="4" fill="#b3e5fc"/><rect x="20" y="36" width="8" height="5" fill="#e53935"/><rect x="36" y="36" width="8" height="5" fill="#fdd835"/>',
    'plane': SKY + '<path d="M6 36 h44 l8 -6 h-10 l-10 -14 h-6 l6 14 h-18 l-6 -6 h-6 l4 10 l-4 10 h6 l6 -6z" fill="#fafafa" stroke="#555"/><path d="M14 36 l-4 10 h6 l6 -10z" fill="#e53935"/>',
    'truck': ROAD + '<rect x="6" y="20" width="38" height="26" fill="#e53935"/><path d="M44 30 h10 l4 8 v8 h-14z" fill="#1e88e5"/><rect x="46" y="32" width="8" height="6" fill="#b3e5fc"/>' + WHEEL(16, 47) + WHEEL(30, 47) + WHEEL(50, 47),
    'uniform': BG + '<path d="M18 22 l8 -6 h12 l8 6 l-4 6 l-2 -2 v24 h-16 v-24 l-2 2z" fill="#1e3a8a"/><path d="M28 16 l4 10 l4 -10" fill="#fafafa"/><circle cx="32" cy="34" r="1.5" fill="#fdd835"/><circle cx="32" cy="40" r="1.5" fill="#fdd835"/>' + TXT('have to', 58, 7, '#1e3a8a'),
    'calendar-off': BG + '<rect x="12" y="14" width="40" height="36" rx="3" fill="#fafafa" stroke="#555"/><rect x="12" y="14" width="40" height="8" fill="#e53935"/><text x="32" y="40" font-family="sans-serif" font-size="9" font-weight="bold" fill="#333" text-anchor="middle">MON</text>' + TXT("don't have to", 58, 6, '#43a047'),
    'restaurant': BG + '<circle cx="32" cy="32" r="14" fill="#fafafa" stroke="#999"/><path d="M12 18 v16 M10 18 v8 M14 18 v8 M52 18 v16 M50 18 q4 4 4 8 q0 4 -2 6" stroke="#333" stroke-width="2" fill="none"/><circle cx="32" cy="32" r="6" fill="#ff7043"/>' + TXT("doesn't have to cook", 58, 5.5, '#43a047'),
    'past-visit': BG + '<path d="M14 30 l18 -14 l18 14 v22 h-36z" fill="#ffcc80"/><rect x="26" y="36" width="12" height="16" fill="#8d6e63"/><path d="M14 30 l18 -14 l18 14" stroke="#e53935" stroke-width="3" fill="none"/>' + TXT('last weekend', 12, 6, '#555') + TXT('had to', 60, 7, '#8d6e63'),
    'question': BG + '<text x="32" y="44" font-family="sans-serif" font-size="34" font-weight="bold" fill="#1e88e5" text-anchor="middle">?</text>' + TXT('Do you have to…?', 58, 6, '#333'),
    'alarm': BG + '<circle cx="32" cy="34" r="16" fill="#fafafa" stroke="#333" stroke-width="3"/><path d="M32 34 v-9 M32 34 l6 4" stroke="#e53935" stroke-width="3"/><path d="M18 20 l-4 -4 M46 20 l4 -4" stroke="#333" stroke-width="3"/>' + TXT('5:30', 60, 7, '#333'),
    'ticket': BG + '<path d="M10 22 h44 v8 a4 4 0 0 0 0 8 v8 h-44 v-8 a4 4 0 0 0 0 -8z" fill="#fdd835" stroke="#555"/><path d="M18 30 h20 M18 36 h14" stroke="#555" stroke-width="2"/>' + TXT('online ✓', 58, 7, '#43a047'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
