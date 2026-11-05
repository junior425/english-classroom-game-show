#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/air-travel (Advanced 1 / 12B air travel, go/get phrases + reported speech). Original artwork.
Run once: python3 scripts/draw-air-travel-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'air-travel'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#e1f5fe"/>'
P = lambda x, fill, y=28: f'<circle cx="{x}" cy="{y}" r="5" fill="{fill}"/><path d="M{x-6} {y+24} v-12 q0 -6 6 -6 q6 0 6 6 v12z" fill="{fill}"/>'
TXT = lambda t, y=60, size=6, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
PLANE = lambda tilt=0: f'<g transform="rotate({tilt} 32 32)"><path d="M8 34 h40 l8 -5 h-10 l-9 -12 h-6 l5 12 h-16 l-5 -5 h-5 l3 8 l-3 8 h5 l5 -5z" fill="#fafafa" stroke="#455a64"/></g>'
BAG = lambda x, fill: f'<rect x="{x}" y="28" width="18" height="22" rx="3" fill="{fill}"/><rect x="{x+5}" y="22" width="8" height="6" rx="2" fill="none" stroke="#333" stroke-width="2"/>'
SCREEN = '<rect x="10" y="14" width="44" height="30" rx="3" fill="#263238"/>'
ICONS = {
    'book-a-flight': BG + '<rect x="10" y="14" width="44" height="30" rx="3" fill="#fafafa" stroke="#455a64"/>' + '<path d="M18 24 h12 l4 -3 h-4 l-3 -4 h-2 l1 4 h-6z" fill="#ff7043"/><rect x="16" y="32" width="32" height="6" fill="#4fc3f7"/>' + TXT('BOOK NOW', 37, 4, '#fff') + TXT('book a flight'),
    'pack': BG + '<rect x="12" y="24" width="40" height="26" rx="3" fill="#8d6e63"/><rect x="12" y="24" width="40" height="4" fill="#5d4037"/><rect x="20" y="14" width="10" height="10" fill="#e53935"/><rect x="32" y="16" width="10" height="8" fill="#1e88e5"/>' + TXT('pack'),
    'carry-on-bag': BG + BAG(23, '#1e88e5') + '<text x="32" y="42" font-family="sans-serif" font-size="7" font-weight="bold" fill="#fff" text-anchor="middle">S</text>' + TXT('carry-on bag'),
    'checked-baggage': BG + '<rect x="14" y="18" width="36" height="32" rx="3" fill="#e53935"/><path d="M14 30 h36" stroke="#b71c1c" stroke-width="2"/><rect x="24" y="12" width="16" height="6" rx="2" fill="none" stroke="#333" stroke-width="2"/><rect x="30" y="34" width="12" height="6" fill="#fff"/>' + TXT('checked baggage'),
    'check-in': BG + '<rect x="8" y="40" width="48" height="12" fill="#90a4ae"/>' + P(42, '#1e3a8a', 22) + '<rect x="12" y="26" width="16" height="14" fill="#fdd835"/>' + TXT('check in'),
    'passport': BG + '<rect x="20" y="12" width="24" height="34" rx="2" fill="#1e3a8a"/><circle cx="32" cy="26" r="6" fill="none" stroke="#fdd835" stroke-width="2"/><rect x="24" y="36" width="16" height="3" fill="#fdd835"/>' + TXT('show your passport'),
    'security': BG + '<rect x="14" y="12" width="36" height="40" rx="3" fill="none" stroke="#455a64" stroke-width="4"/>' + P(32, '#43a047', 26) + '<path d="M6 24 l4 -4 l4 4" stroke="#e53935" stroke-width="2" fill="none"/>' + TXT('go through security'),
    'departure-lounge': BG + '<rect x="8" y="36" width="20" height="10" fill="#607d8b"/><rect x="36" y="36" width="20" height="10" fill="#607d8b"/><rect x="8" y="30" width="20" height="6" fill="#1e88e5"/><rect x="36" y="30" width="20" height="6" fill="#1e88e5"/><circle cx="32" cy="20" r="4" fill="#8d6e63"/>' + TXT('departure lounge'),
    'departure-board': BG + SCREEN + '<path d="M14 20 h36 M14 27 h36 M14 34 h36" stroke="#ffd54f" stroke-width="3"/>' + TXT('departure board'),
    'gate': BG + '<rect x="18" y="12" width="28" height="40" fill="#90a4ae"/><rect x="24" y="22" width="16" height="30" fill="#4fc3f7"/><rect x="22" y="14" width="20" height="6" fill="#fdd835"/>' + TXT('GATE 12', 19, 4, '#333') + TXT('gate'),
    'boarding-pass': BG + '<rect x="8" y="20" width="48" height="24" rx="2" fill="#fafafa" stroke="#455a64"/><path d="M40 20 v24" stroke="#455a64" stroke-dasharray="2 2"/><path d="M12 26 h20 M12 31 h14 M12 36 h18" stroke="#1e88e5" stroke-width="2"/><rect x="43" y="26" width="10" height="12" fill="#333"/>' + TXT('boarding pass'),
    'flight-attendant': BG + '<circle cx="32" cy="24" r="6" fill="#ffcc80"/><path d="M24 52 v-14 q0 -6 8 -6 q8 0 8 6 v14z" fill="#1e3a8a"/><rect x="28" y="34" width="8" height="4" fill="#e53935"/><path d="M26 20 q6 -6 12 0" stroke="#1e3a8a" stroke-width="3" fill="none"/>' + TXT('flight attendant'),
    'aisle-seat': BG + '<rect x="8" y="22" width="14" height="26" rx="3" fill="#1e88e5"/><rect x="42" y="22" width="14" height="26" rx="3" fill="#1e88e5"/><rect x="26" y="20" width="12" height="30" fill="#cfd8dc"/><rect x="8" y="22" width="14" height="26" rx="3" fill="#e53935"/>' + TXT('aisle seat'),
    'window-seat': BG + '<rect x="42" y="14" width="14" height="36" fill="#90a4ae"/><ellipse cx="49" cy="26" rx="4" ry="6" fill="#4fc3f7"/><rect x="26" y="22" width="14" height="26" rx="3" fill="#e53935"/><rect x="10" y="22" width="14" height="26" rx="3" fill="#1e88e5"/>' + TXT('window seat'),
    'take-off': BG + '<rect x="0" y="50" width="64" height="14" fill="#616161"/>' + PLANE(-25) + TXT('take off', 61, 6, '#fff'),
    'land': BG + '<rect x="0" y="50" width="64" height="14" fill="#616161"/>' + PLANE(15) + TXT('land', 61, 6, '#fff'),
    'go-on-vacation': BG + '<circle cx="50" cy="14" r="6" fill="#ffd54f"/><rect x="0" y="44" width="64" height="20" fill="#ffe0b2"/><path d="M20 44 v-20 M20 24 q-10 -4 -14 4 M20 24 q10 -4 14 4 M20 24 q-2 -10 6 -12" stroke="#43a047" stroke-width="3" fill="none"/>' + TXT('go on vacation'),
    'get-home': BG + '<path d="M12 30 l20 -14 l20 14 v22 h-40z" fill="#ffcc80" stroke="#8d6e63"/><rect x="26" y="38" width="12" height="14" fill="#8d6e63"/><path d="M2 46 h8 l-3 -3 M10 46 l-3 3" stroke="#e53935" stroke-width="2" fill="none"/>' + TXT('get home'),
    'bank': BG + '<rect x="10" y="44" width="44" height="6" fill="#607d8b"/><path d="M8 24 l24 -10 l24 10z" fill="#607d8b"/><rect x="14" y="24" width="6" height="20" fill="#fafafa"/><rect x="29" y="24" width="6" height="20" fill="#fafafa"/><rect x="44" y="24" width="6" height="20" fill="#fafafa"/>' + TXT('worked in a bank'),
    'train': BG + '<path d="M4 46 h56" stroke="#333" stroke-width="3"/><path d="M8 44 v-16 q0 -6 6 -6 h34 q10 0 12 10 v12z" fill="#e53935"/><rect x="16" y="26" width="10" height="8" fill="#b3e5fc"/><rect x="30" y="26" width="10" height="8" fill="#b3e5fc"/>' + TXT('was arriving'),
    'finished': BG + '<rect x="14" y="16" width="36" height="30" rx="3" fill="#fafafa" stroke="#455a64"/><path d="M22 30 l7 7 l14 -14" stroke="#43a047" stroke-width="5" fill="none" stroke-linecap="round"/>' + TXT('had finished'),
    'keys': BG + '<circle cx="24" cy="26" r="9" fill="none" stroke="#fdd835" stroke-width="5"/><path d="M31 30 l16 14 M40 38 l4 -4 M44 42 l4 -4" stroke="#fdd835" stroke-width="5" fill="none"/>' + TXT('had lost'),
    'french': BG + '<rect x="12" y="18" width="13" height="26" fill="#1e3a8a"/><rect x="25" y="18" width="14" height="26" fill="#fafafa"/><rect x="39" y="18" width="13" height="26" fill="#e53935"/>' + TXT('could speak'),
    'tonight': BG + '<rect width="64" height="64" rx="8" fill="#1a237e"/><path d="M38 14 a12 12 0 1 0 10 20 a10 10 0 1 1 -10 -20z" fill="#ffd54f"/><circle cx="16" cy="20" r="1.5" fill="#fff"/><circle cx="24" cy="36" r="1.5" fill="#fff"/>' + TXT('would see', 60, 6, '#fff'),
    'ice-cream': BG + '<path d="M24 32 l8 22 l8 -22z" fill="#ffcc80"/><circle cx="32" cy="28" r="9" fill="#f48fb1"/><circle cx="27" cy="22" r="6" fill="#fafafa"/>' + TXT('asked if'),
    'phone': BG + '<rect x="22" y="10" width="20" height="40" rx="4" fill="#263238"/><rect x="25" y="14" width="14" height="28" fill="#4fc3f7"/><circle cx="32" cy="46" r="2" fill="#90a4ae"/>' + TXT('asked why'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
