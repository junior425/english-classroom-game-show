#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/town and public/img/body (original artwork for this project).
Run once: python3 scripts/draw-town-body-icons.py"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / 'public' / 'img'

BG = lambda c: f'<rect width="64" height="64" rx="8" fill="{c}"/>'
TXT = lambda x, y, t, c='#fff', s=5.5: f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{s}" font-weight="bold" fill="{c}" text-anchor="middle">{t}</text>'
BUILDING = lambda x, y, w, h, c, win='#fff59d': f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"/>' + ''.join(f'<rect x="{x + 4 + i * 8}" y="{y + 4 + j * 9}" width="5" height="5" fill="{win}"/>' for i in range(int((w - 4) // 8)) for j in range(int((h - 10) // 9)))
DOOR = lambda x, y, c='#5a2d1a': f'<rect x="{x}" y="{y}" width="8" height="12" fill="{c}"/>'
ROOF = lambda x, y, w, c='#c62828': f'<polygon points="{x - 2},{y} {x + w / 2},{y - 10} {x + w + 2},{y}" fill="{c}"/>'
GROUND = '<rect x="0" y="54" width="64" height="10" fill="#8bc34a"/>'
ROAD = '<rect x="0" y="52" width="64" height="12" fill="#555"/><rect x="4" y="57" width="8" height="2" fill="#fff"/><rect x="20" y="57" width="8" height="2" fill="#fff"/><rect x="36" y="57" width="8" height="2" fill="#fff"/><rect x="52" y="57" width="8" height="2" fill="#fff"/>'
PERSON = lambda x, y, shirt='#e63946', skin='#f5c6a5': f'<circle cx="{x}" cy="{y}" r="4" fill="{skin}"/><rect x="{x - 5}" y="{y + 4}" width="10" height="11" rx="3" fill="{shirt}"/>'
TREE = lambda x, y: f'<rect x="{x - 1.5}" y="{y}" width="3" height="8" fill="#5a2d1a"/><circle cx="{x}" cy="{y - 4}" r="7" fill="#4caf50"/>'

TOWN = {
    'bank': BG('#e3f2fd') + GROUND + BUILDING(10, 20, 44, 34, '#90a4ae') + '<rect x="6" y="16" width="52" height="6" fill="#546e7a"/><polygon points="6,16 32,4 58,16" fill="#607d8b"/>' + ''.join(f'<rect x="{14 + i * 10}" y="24" width="4" height="30" fill="#eceff1"/>' for i in range(4)) + TXT(32, 14, 'BANK', '#fff', 6),
    'bus-stop': BG('#fff8e1') + ROAD + '<rect x="14" y="10" width="36" height="3" fill="#1565c0"/><rect x="16" y="13" width="3" height="40" fill="#1565c0"/><rect x="45" y="13" width="3" height="40" fill="#1565c0"/><rect x="19" y="13" width="26" height="22" fill="#bbdefb" opacity=".8"/><rect x="19" y="38" width="26" height="4" fill="#1565c0"/>' + '<rect x="52" y="20" width="8" height="8" rx="1" fill="#1565c0"/>' + TXT(56, 26, 'BUS', '#fff', 3.5) + '<rect x="55" y="28" width="2" height="24" fill="#333"/>' + PERSON(32, 44, '#e63946'),
    'cafe': BG('#efebe9') + GROUND + BUILDING(8, 22, 48, 32, '#d7ccc8', '#8d6e63') + '<rect x="4" y="18" width="56" height="6" fill="#c62828"/>' + ''.join(f'<rect x="{4 + i * 8}" y="18" width="4" height="6" fill="#fff"/>' for i in range(7)) + '<path d="M22 36 h14 v8 a7 7 0 0 1 -14 0 z" fill="#fff"/><path d="M36 38 a3 3 0 0 1 0 6" stroke="#fff" stroke-width="2" fill="none"/><path d="M26 32 q2 -3 0 -5 M30 32 q2 -3 0 -5" stroke="#999" stroke-width="1.5" fill="none"/>' + TXT(32, 14, 'CAFÉ', '#5a2d1a', 7),
    'club': BG('#1a1a2e') + '<rect x="0" y="54" width="64" height="10" fill="#222"/>' + ''.join(f'<line x1="32" y1="8" x2="{8 + i * 12}" y2="54" stroke="{c}" stroke-width="3" opacity=".7"/>' for i, c in enumerate(['#e91e63', '#ffeb3b', '#00e5ff', '#76ff03', '#ff9800'])) + '<circle cx="32" cy="8" r="5" fill="#fff"/>' + PERSON(20, 38, '#9c27b0') + PERSON(44, 38, '#00bcd4') + '<path d="M14 30 L18 26 M50 30 L46 26" stroke="#f5c6a5" stroke-width="3"/>' + TXT(32, 62, '♪ ♫ ♪', '#fff', 6),
    'hospital': BG('#e8f5e9') + GROUND + BUILDING(8, 18, 48, 36, '#fff', '#8ecae6') + DOOR(28, 42, '#4d96ff') + '<rect x="24" y="4" width="16" height="16" rx="2" fill="#e63946"/><rect x="30" y="7" width="4" height="10" fill="#fff"/><rect x="27" y="10" width="10" height="4" fill="#fff"/>',
    'hotel': BG('#fff3e0') + GROUND + BUILDING(12, 10, 40, 44, '#ffb74d') + DOOR(28, 42) + '<rect x="18" y="2" width="28" height="8" rx="1" fill="#5a2d1a"/>' + TXT(32, 8.5, 'HOTEL', '#ffd54a', 6) + '<rect x="8" y="38" width="6" height="16" fill="#8d5524"/><rect x="50" y="38" width="6" height="16" fill="#8d5524"/>',
    'movie-theater': BG('#212121') + '<rect x="0" y="54" width="64" height="10" fill="#444"/><rect x="8" y="8" width="48" height="30" fill="#000" stroke="#ffd54a" stroke-width="2"/><rect x="12" y="12" width="40" height="22" fill="#8ecae6"/><polygon points="26,18 26,28 36,23" fill="#fff"/>' + ''.join(f'<rect x="{10 + i * 11}" y="44" width="8" height="8" rx="2" fill="#c62828"/>' for i in range(5)) + '<rect x="8" y="2" width="48" height="5" fill="#ffd54a"/>',
    'museum': BG('#f3e5f5') + GROUND + '<polygon points="6,20 32,6 58,20" fill="#b0bec5"/><rect x="6" y="20" width="52" height="5" fill="#90a4ae"/>' + ''.join(f'<rect x="{10 + i * 11}" y="25" width="5" height="26" fill="#eceff1" stroke="#b0bec5"/>' for i in range(5)) + '<rect x="4" y="51" width="56" height="3" fill="#90a4ae"/>' + TXT(32, 17, 'MUSEUM', '#37474f', 5),
    'park': BG('#e8f5e9') + GROUND + '<rect x="0" y="40" width="64" height="14" fill="#8bc34a"/><path d="M0 50 Q32 44 64 50" stroke="#c8a27a" stroke-width="4" fill="none"/>' + TREE(14, 34) + TREE(50, 30) + TREE(32, 24) + '<rect x="20" y="42" width="14" height="3" fill="#8d5524"/><rect x="21" y="45" width="2" height="4" fill="#5a2d1a"/><rect x="31" y="45" width="2" height="4" fill="#5a2d1a"/><circle cx="54" cy="10" r="6" fill="#ffd54a"/>',
    'police-station': BG('#e3f2fd') + GROUND + BUILDING(8, 20, 48, 34, '#5c6bc0', '#bbdefb') + DOOR(28, 42, '#1a237e') + '<rect x="12" y="10" width="40" height="10" rx="1" fill="#1a237e"/>' + TXT(32, 17.5, 'POLICE', '#fff', 6) + '<polygon points="32,2 34,6 38,6 35,8.5 36,12.5 32,10 28,12.5 29,8.5 26,6 30,6" fill="#ffd54a"/>',
    'post-office': BG('#fff8e1') + GROUND + BUILDING(8, 22, 48, 32, '#eceff1', '#8ecae6') + DOOR(28, 42, '#1565c0') + '<rect x="8" y="14" width="48" height="8" fill="#1565c0"/>' + TXT(32, 20, 'POST OFFICE', '#fff', 4.5) + '<rect x="24" y="2" width="16" height="11" fill="#fff" stroke="#1565c0"/><polyline points="24,2 32,9 40,2" fill="none" stroke="#1565c0" stroke-width="1.5"/>',
    'restaurant': BG('#fce4ec') + GROUND + BUILDING(8, 22, 48, 32, '#f8bbd0', '#fff') + ROOF(8, 22, 48, '#ad1457') + DOOR(28, 42, '#880e4f') + '<line x1="16" y1="30" x2="16" y2="48" stroke="#333" stroke-width="2"/><path d="M13 30 v6 M19 30 v6 M13 36 h6" stroke="#333" stroke-width="2" fill="none"/><line x1="48" y1="30" x2="48" y2="48" stroke="#333" stroke-width="2"/><path d="M46 30 q2 8 4 0" fill="#333"/>',
    'school': BG('#fffde7') + GROUND + BUILDING(6, 24, 52, 30, '#ffcc80', '#8ecae6') + DOOR(28, 42) + '<rect x="24" y="8" width="16" height="16" fill="#ffb74d"/><polygon points="22,8 32,0 42,8" fill="#c62828"/><circle cx="32" cy="16" r="4" fill="#fff" stroke="#333"/><path d="M32 13 v3 h2" stroke="#333" stroke-width="1" fill="none"/>' + TXT(32, 31, 'SCHOOL', '#5a2d1a', 4.5),
    'shopping-mall': BG('#ede7f6') + GROUND + BUILDING(4, 18, 56, 36, '#b39ddb', '#fff') + '<rect x="4" y="12" width="56" height="7" fill="#673ab7"/>' + TXT(32, 17.5, 'MALL', '#fff', 5.5) + '<rect x="22" y="38" width="20" height="16" fill="#8ecae6"/><line x1="32" y1="38" x2="32" y2="54" stroke="#fff" stroke-width="1"/>' + '<rect x="46" y="40" width="8" height="8" fill="#e63946"/><path d="M47 40 q3 -4 6 0" stroke="#222" stroke-width="1" fill="none"/>',
    'grocery-store': BG('#e8f5e9') + GROUND + BUILDING(8, 22, 48, 32, '#fff', '#c8e6c9') + '<rect x="4" y="16" width="56" height="7" fill="#2e7d32"/>' + ''.join(f'<rect x="{4 + i * 8}" y="16" width="4" height="7" fill="#a5d6a7"/>' for i in range(7)) + DOOR(28, 42, '#2e7d32') + '<circle cx="18" cy="48" r="4" fill="#e63946"/><circle cx="46" cy="48" r="4" fill="#ff9800"/><rect x="14" y="52" width="36" height="2" fill="#8d5524"/>' + TXT(32, 12, 'GROCERY', '#2e7d32', 5),
    'train-station': BG('#eceff1') + '<rect x="0" y="50" width="64" height="14" fill="#9e9e9e"/><rect x="0" y="52" width="64" height="2" fill="#555"/><rect x="0" y="58" width="64" height="2" fill="#555"/>' + ''.join(f'<rect x="{2 + i * 8}" y="51" width="3" height="10" fill="#5a2d1a"/>' for i in range(8)) + '<path d="M4 20 Q32 2 60 20 V26 H4 Z" fill="#90a4ae"/><rect x="6" y="26" width="52" height="24" fill="#fff" opacity=".4"/>' + '<rect x="14" y="30" width="36" height="18" rx="4" fill="#e63946"/><rect x="18" y="33" width="8" height="7" fill="#8ecae6"/><rect x="30" y="33" width="8" height="7" fill="#8ecae6"/><rect x="42" y="33" width="4" height="7" fill="#8ecae6"/><circle cx="20" cy="48" r="3" fill="#222"/><circle cx="44" cy="48" r="3" fill="#222"/>',
    'town': BG('#e3f2fd') + GROUND + TREE(8, 44) + TREE(56, 44) + ROOF(16, 40, 14) + BUILDING(16, 40, 14, 14, '#ffcc80') + ROOF(34, 36, 16) + BUILDING(34, 36, 16, 18, '#f8bbd0') + '<circle cx="12" cy="12" r="6" fill="#ffd54a"/><path d="M26 16 q6 -5 12 0 q6 -5 12 0" stroke="#fff" stroke-width="4" fill="none"/>',
    'city': BG('#263238') + '<rect x="0" y="54" width="64" height="10" fill="#111"/>' + BUILDING(2, 24, 12, 30, '#455a64') + BUILDING(16, 8, 14, 46, '#546e7a') + BUILDING(32, 18, 10, 36, '#607d8b') + BUILDING(44, 4, 16, 50, '#37474f') + '<circle cx="8" cy="10" r="4" fill="#fff"/>',
}

SKIN = '#f5c6a5'
HEAD = lambda hl='#5a2d1a': f'<circle cx="32" cy="30" r="16" fill="{SKIN}"/><path d="M16 28 Q18 10 32 12 Q46 10 48 28 Q46 20 40 18 Q32 20 24 18 Q18 20 16 28" fill="{hl}"/><circle cx="26" cy="29" r="2" fill="#222"/><circle cx="38" cy="29" r="2" fill="#222"/><path d="M30 32 q2 4 4 0" stroke="#c68642" stroke-width="1.5" fill="none"/><path d="M26 38 q6 5 12 0" stroke="#c62828" stroke-width="2" fill="none"/>'
RING = lambda x, y, r=6: f'<circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="#e63946" stroke-width="2.5" stroke-dasharray="3 2"/>'
BODY_FULL = f'<circle cx="32" cy="10" r="6" fill="{SKIN}"/><rect x="24" y="17" width="16" height="20" rx="4" fill="#4d96ff"/><rect x="18" y="18" width="5" height="16" rx="2" fill="{SKIN}"/><rect x="41" y="18" width="5" height="16" rx="2" fill="{SKIN}"/><rect x="25" y="37" width="6" height="18" rx="2" fill="#1565c0"/><rect x="33" y="37" width="6" height="18" rx="2" fill="#1565c0"/><rect x="23" y="54" width="8" height="4" rx="1" fill="#222"/><rect x="33" y="54" width="8" height="4" rx="1" fill="#222"/>'
BODY = {
    'hair': BG('#fff8e1') + HEAD() + RING(32, 15, 8),
    'head': BG('#e3f2fd') + HEAD() + '<circle cx="32" cy="29" r="19" fill="none" stroke="#e63946" stroke-width="2.5" stroke-dasharray="3 2"/>',
    'ear': BG('#fce4ec') + HEAD() + f'<ellipse cx="16" cy="31" rx="3" ry="5" fill="{SKIN}" stroke="#c68642"/><ellipse cx="48" cy="31" rx="3" ry="5" fill="{SKIN}" stroke="#c68642"/>' + RING(48, 31, 7),
    'face': BG('#e8f5e9') + HEAD() + '<ellipse cx="32" cy="32" rx="12" ry="13" fill="none" stroke="#e63946" stroke-width="2.5" stroke-dasharray="3 2"/>',
    'eye': BG('#ede7f6') + HEAD() + '<ellipse cx="26" cy="29" rx="4" ry="2.5" fill="#fff" stroke="#222"/><circle cx="26" cy="29" r="1.8" fill="#1565c0"/><ellipse cx="38" cy="29" rx="4" ry="2.5" fill="#fff" stroke="#222"/><circle cx="38" cy="29" r="1.8" fill="#1565c0"/>' + RING(38, 29, 6),
    'nose': BG('#fff3e0') + HEAD() + RING(32, 33, 4),
    'tooth': BG('#e0f7fa') + HEAD() + '<path d="M25 38 q7 7 14 0 z" fill="#fff" stroke="#222" stroke-width="1"/><path d="M28 38 v3 M32 38 v4 M36 38 v3" stroke="#bbb" stroke-width="1"/>' + RING(32, 40, 7) + '<path d="M50 48 q0 -8 6 -8 q6 0 6 8 q0 8 -3 8 q-3 -4 -3 0 q-3 4 -6 -8" fill="#fff" stroke="#222"/>',
    'mouth': BG('#fce4ec') + HEAD() + RING(32, 38, 7),
    'body': BG('#e3f2fd') + BODY_FULL + '<rect x="21" y="15" width="22" height="24" rx="4" fill="none" stroke="#e63946" stroke-width="2.5" stroke-dasharray="3 2"/>',
    'arm': BG('#fff8e1') + BODY_FULL + '<rect x="39" y="15" width="9" height="22" rx="3" fill="none" stroke="#e63946" stroke-width="2.5" stroke-dasharray="3 2"/>',
    'hand': BG('#e8f5e9') + BODY_FULL + f'<circle cx="20.5" cy="36" r="3" fill="{SKIN}"/><circle cx="43.5" cy="36" r="3" fill="{SKIN}"/>' + RING(43.5, 36, 6) + f'<path d="M50 20 h8 v10 q0 6 -5 6 h-3 q-4 0 -4 -6 v-6 z M52 20 v-5 M55 20 v-6 M58 20 v-5" fill="{SKIN}" stroke="#c68642" stroke-width="1"/>',
    'leg': BG('#ede7f6') + BODY_FULL + '<rect x="31" y="36" width="10" height="20" rx="3" fill="none" stroke="#e63946" stroke-width="2.5" stroke-dasharray="3 2"/>',
    'knee': BG('#fff3e0') + BODY_FULL + RING(36, 47, 4) + RING(28, 47, 4),
    'foot': BG('#e0f7fa') + BODY_FULL + RING(37, 56, 6) + f'<path d="M48 44 q-2 10 4 12 h8 q4 0 4 -3 q0 -3 -6 -3 l-2 -8 z" fill="{SKIN}" stroke="#c68642" stroke-width="1"/>',
}

for folder, icons in (('town', TOWN), ('body', BODY)):
    out = ROOT / folder
    out.mkdir(parents=True, exist_ok=True)
    for name, body in icons.items():
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>'
        (out / f'{name}.svg').write_text(svg)
