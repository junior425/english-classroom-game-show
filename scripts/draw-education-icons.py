#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/education (original artwork for this project).
Run once: python3 scripts/draw-education-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'education'
BG = lambda c: f'<rect width="64" height="64" rx="8" fill="{c}"/>'
TXT = lambda x, y, t, c='#fff', s=6: f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{s}" font-weight="bold" fill="{c}" text-anchor="middle">{t}</text>'
SKIN = '#f5c6a5'
PERSON = lambda x, y, shirt='#4d96ff', r=5: f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SKIN}"/><rect x="{x - r - 1}" y="{y + r}" width="{2 * r + 2}" height="{3 * r - 1}" rx="3" fill="{shirt}"/>'
PAPER = lambda x, y, w=18, h=22: f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#fff" stroke="#888"/><path d="M{x + 3} {y + 5} h{w - 6} M{x + 3} {y + 10} h{w - 6} M{x + 3} {y + 15} h{w - 10}" stroke="#bbb" stroke-width="1.5"/>'
BOOK = lambda x, y, c='#e63946': f'<rect x="{x}" y="{y}" width="16" height="20" rx="1" fill="{c}"/><rect x="{x + 3}" y="{y}" width="2" height="20" fill="#fff" opacity=".6"/>'
DESK = lambda x, y: f'<rect x="{x}" y="{y}" width="28" height="4" fill="#8d6e63"/><rect x="{x + 2}" y="{y + 4}" width="3" height="10" fill="#6d4c41"/><rect x="{x + 23}" y="{y + 4}" width="3" height="10" fill="#6d4c41"/>'
BUILDING = lambda x, y, w, h, c, roof='#c62828': f'<polygon points="{x},{y} {x + w / 2},{y - 10} {x + w},{y}" fill="{roof}"/><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" stroke="#555"/>' + ''.join(f'<rect x="{x + 4 + i * 9}" y="{y + 4 + j * 10}" width="5" height="6" fill="#fff59d"/>' for i in range(int(w // 9)) for j in range(int(h // 10))) + f'<rect x="{x + w / 2 - 3}" y="{y + h - 8}" width="6" height="8" fill="#5d4037"/>'
CAP = lambda x, y: f'<polygon points="{x - 10},{y} {x},{y - 5} {x + 10},{y} {x},{y + 5}" fill="#222"/><rect x="{x - 5}" y="{y + 2}" width="10" height="4" fill="#222"/><line x1="{x + 8}" y1="{y + 1}" x2="{x + 8}" y2="{y + 9}" stroke="#ffd54a" stroke-width="2"/>'

ICONS = {
    'get-a-good-grade': BG('#e8f5e9') + PAPER(14, 14, 24, 30) + '<circle cx="42" cy="22" r="10" fill="#e63946"/>' + TXT(42, 26, 'A+', '#fff', 9) + PERSON(52, 44, '#43a047', 4) + TXT(32, 58, 'GOOD GRADE', '#1b5e20', 5),
    'hand-in': BG('#e3f2fd') + PERSON(14, 22, '#4d96ff') + PERSON(50, 22, '#9c27b0') + PAPER(24, 34, 16, 18) + '<path d="M20 44 h4 M40 44 h4" stroke="#333" stroke-width="2"/>' + TXT(32, 12, 'HAND IN', '#1565c0', 6),
    'strict': BG('#fce4ec') + PERSON(32, 20, '#37474f', 7) + '<path d="M26 16 l5 2 M38 16 l-5 2" stroke="#222" stroke-width="2"/><path d="M28 24 h8" stroke="#222" stroke-width="2"/>' + '<rect x="44" y="30" width="3" height="22" fill="#8d6e63"/>' + TXT(32, 58, 'NO TALKING!', '#c2185b', 5.5),
    'study-for': BG('#fff8e1') + DESK(18, 40) + PERSON(32, 22, '#ff9800') + BOOK(20, 30, '#1565c0') + BOOK(30, 30, '#43a047') + '<circle cx="52" cy="12" r="6" fill="#ffd54a"/><path d="M52 8 v4 h3" stroke="#333" stroke-width="1.5" fill="none"/>' + TXT(32, 60, 'EXAM FRIDAY', '#5a2d1a', 5),
    'get-into-trouble': BG('#fce4ec') + PERSON(16, 22, '#e63946') + PERSON(46, 20, '#37474f', 6) + '<path d="M38 30 l-10 -4" stroke="#222" stroke-width="2"/>' + '<rect x="6" y="48" width="52" height="10" rx="2" fill="#c62828"/>' + TXT(32, 55.5, "PRINCIPAL'S OFFICE", '#fff', 4.5),
    'behave': BG('#e8f5e9') + DESK(18, 40) + PERSON(32, 22, '#43a047') + '<path d="M26 36 h12" stroke="#43a047" stroke-width="2"/>' + '<path d="M46 14 l4 4 l8 -8" stroke="#43a047" stroke-width="3" fill="none"/>' + TXT(32, 60, 'WELL BEHAVED', '#1b5e20', 5),
    'cheat': BG('#eceff1') + DESK(4, 40) + DESK(34, 40) + PERSON(18, 22, '#4d96ff') + PERSON(48, 22, '#e63946') + '<path d="M26 22 q6 4 12 0" stroke="#e63946" stroke-width="2" fill="none" stroke-dasharray="2 2"/>' + PAPER(10, 46, 14, 12) + PAPER(40, 46, 14, 12) + '<line x1="6" y1="6" x2="58" y2="58" stroke="#e63946" stroke-width="3" opacity=".8"/>',
    'get-a-degree': BG('#ede7f6') + PERSON(32, 30, '#6a1b9a', 7) + CAP(32, 20) + '<rect x="46" y="38" width="12" height="4" fill="#fff" stroke="#f9a825"/><circle cx="52" cy="40" r="2" fill="#e63946"/>' + TXT(32, 61, 'DEGREE', '#6a1b9a', 6),
    'take-notes': BG('#fff3e0') + '<rect x="14" y="10" width="36" height="46" fill="#fff" stroke="#ff9800"/><path d="M14 18 h36 M14 26 h36 M14 34 h36 M14 42 h36" stroke="#ffe0b2"/><path d="M18 17 h20 M18 25 h26 M18 33 h16" stroke="#1565c0" stroke-width="2"/>' + '<rect x="40" y="36" width="4" height="22" fill="#ffd54a" transform="rotate(-30 42 47)"/>',
    'pass': BG('#e8f5e9') + PAPER(16, 12, 32, 36) + '<path d="M22 34 l6 6 l14 -14" stroke="#43a047" stroke-width="4" fill="none"/>' + TXT(32, 58, 'PASS · 80%', '#1b5e20', 6),
    'fail': BG('#fce4ec') + PAPER(16, 12, 32, 36) + '<path d="M24 24 l16 16 M40 24 l-16 16" stroke="#e63946" stroke-width="4"/>' + TXT(32, 58, 'FAIL · 40%', '#c2185b', 6),
    'principal': BG('#e3f2fd') + PERSON(32, 22, '#37474f', 7) + '<path d="M32 29 v12" stroke="#e63946" stroke-width="3"/>' + '<rect x="10" y="48" width="44" height="10" rx="2" fill="#1565c0"/>' + TXT(32, 55.5, 'PRINCIPAL', '#fff', 5.5),
    'term': BG('#fff8e1') + '<rect x="10" y="12" width="44" height="40" fill="#fff" stroke="#888"/><rect x="10" y="12" width="44" height="8" fill="#e63946"/>' + ''.join(f'<rect x="{14 + i * 8}" y="{24 + j * 8}" width="6" height="6" fill="{"#43a047" if (i + j * 5) < 12 else "#eee"}"/>' for i in range(5) for j in range(3)) + TXT(32, 18.5, 'SEPT – DEC', '#fff', 5) + TXT(32, 60, 'TERM', '#5a2d1a', 5.5),
    'schedule': BG('#ede7f6') + '<rect x="8" y="10" width="48" height="44" fill="#fff" stroke="#6a1b9a"/><path d="M8 18 h48 M8 27 h48 M8 36 h48 M8 45 h48 M20 10 v44 M32 10 v44 M44 10 v44" stroke="#d1c4e9"/>' + '<rect x="21" y="19" width="10" height="7" fill="#4d96ff"/><rect x="33" y="28" width="10" height="7" fill="#43a047"/><rect x="9" y="37" width="10" height="7" fill="#e63946"/><rect x="45" y="46" width="10" height="7" fill="#ff9800"/>' + TXT(32, 61, 'SCHEDULE', '#6a1b9a', 5),
    'professor': BG('#e8f5e9') + PERSON(20, 24, '#6a1b9a', 6) + '<rect x="34" y="12" width="24" height="18" fill="#2e7d32"/>' + TXT(46, 23, 'E=mc²', '#fff', 5) + '<rect x="34" y="36" width="24" height="3" fill="#8d6e63"/>' + TXT(32, 58, 'PROFESSOR', '#1b5e20', 5.5),
    'graduate': BG('#fff3e0') + PERSON(32, 32, '#1565c0', 7) + CAP(32, 22) + '<rect x="10" y="50" width="44" height="8" rx="2" fill="#ff9800"/>' + TXT(32, 56, 'CLASS OF 2026', '#fff', 4.5),
    'nursery-school': BG('#fce4ec') + BUILDING(12, 24, 40, 28, '#f8bbd0', '#ec407a') + PERSON(10, 46, '#ffd54a', 3) + PERSON(56, 46, '#4d96ff', 3) + TXT(32, 61, 'AGES 3–5', '#c2185b', 5),
    'elementary-school': BG('#fff8e1') + BUILDING(8, 24, 48, 28, '#ffe082', '#f9a825') + '<rect x="28" y="8" width="8" height="6" fill="#e63946"/><rect x="27" y="8" width="1.5" height="16" fill="#333"/>' + TXT(32, 61, 'AGES 6–11', '#5a2d1a', 5),
    'middle-school': BG('#e8f5e9') + BUILDING(8, 22, 48, 30, '#a5d6a7', '#2e7d32') + TXT(32, 61, 'AGES 11–15', '#1b5e20', 5),
    'high-school': BG('#e3f2fd') + BUILDING(8, 20, 48, 32, '#90caf9', '#1565c0') + TXT(32, 61, 'AGES 15–18', '#1565c0', 5),
    'boarding-school': BG('#ede7f6') + BUILDING(6, 20, 32, 32, '#d1c4e9', '#6a1b9a') + '<rect x="42" y="36" width="16" height="10" fill="#fff" stroke="#6a1b9a"/><rect x="42" y="32" width="6" height="6" fill="#fff" stroke="#6a1b9a"/><circle cx="50" cy="12" r="5" fill="#ffd54a"/>' + TXT(32, 61, 'LIVE + STUDY', '#6a1b9a', 5),
    'public-school': BG('#e8f5e9') + BUILDING(8, 22, 48, 30, '#c8e6c9', '#43a047') + '<rect x="18" y="6" width="28" height="7" rx="1" fill="#fff" stroke="#43a047"/>' + TXT(32, 11.5, 'FREE', '#43a047', 5) + TXT(32, 61, 'PUBLIC SCHOOL', '#1b5e20', 4.5),
    'private-school': BG('#fff3e0') + BUILDING(8, 22, 48, 30, '#ffe0b2', '#e65100') + '<rect x="18" y="6" width="28" height="7" rx="1" fill="#fff" stroke="#e65100"/>' + TXT(32, 11.5, '$$$', '#e65100', 5) + TXT(32, 61, 'PRIVATE SCHOOL', '#5a2d1a', 4.5),
}

OUT.mkdir(parents=True, exist_ok=True)
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>')
(OUT / 'LICENSE.md').write_text('# Education illustrations\n\nAll SVG files in this folder are original flat illustrations created for this project\n(generated by `scripts/draw-education-icons.py`). Released under the same MIT license as the repository.\n')
print(len(ICONS), 'icons')
