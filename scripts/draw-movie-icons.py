#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/movies (original artwork for this project).
Run once: python3 scripts/draw-movie-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'movies'
OUT.mkdir(parents=True, exist_ok=True)
BG = lambda c='#1d1f2b': f'<rect width="64" height="64" rx="8" fill="{c}"/>'
TXT = lambda x, y, t, c='#fff', s=6: f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{s}" font-weight="bold" fill="{c}" text-anchor="middle">{t}</text>'
PERSON = lambda x, y, shirt='#4d96ff', r=5: f'<circle cx="{x}" cy="{y}" r="{r}" fill="#f5c6a5"/><rect x="{x - r - 1}" y="{y + r}" width="{2 * r + 2}" height="{3 * r - 1}" rx="3" fill="{shirt}"/>'
SCREEN = lambda c='#cfe8ff': f'<rect x="6" y="8" width="52" height="34" rx="2" fill="{c}" stroke="#fff" stroke-width="2"/>'
CLAP = '<rect x="10" y="26" width="44" height="26" rx="2" fill="#333" stroke="#fff"/><polygon points="8,26 56,20 56,14 8,20" fill="#333" stroke="#fff"/>' + ''.join(f'<rect x="{12 + i * 10}" y="{14.5 - i * .5}" width="5" height="5" fill="#fff" transform="skewY(-7)"/>' for i in range(4))
FILM = lambda y: f'<rect x="4" y="{y}" width="56" height="18" fill="#333"/>' + ''.join(f'<rect x="{7 + i * 9}" y="{y + 2}" width="4" height="3" fill="#fff"/><rect x="{7 + i * 9}" y="{y + 13}" width="4" height="3" fill="#fff"/>' for i in range(6)) + ''.join(f'<rect x="{8 + i * 17}" y="{y + 6}" width="13" height="6" fill="#cfe8ff"/>' for i in range(3))
STAR = lambda x, y, s=6, c='#ffd54a': f'<polygon transform="translate({x} {y}) scale({s / 10})" points="0,-10 2.9,-4 9.5,-3.1 4.8,1.5 5.9,8.1 0,5 -5.9,8.1 -4.8,1.5 -9.5,-3.1 -2.9,-4" fill="{c}"/>'

ICONS = {
    'scene': BG() + CLAP + TXT(32, 42, 'SCENE 12', '#fff', 7) + TXT(32, 49, 'TAKE 3', '#aaa', 5),
    'sequel': BG() + '<rect x="6" y="14" width="22" height="30" rx="2" fill="#e63946"/><rect x="36" y="14" width="22" height="30" rx="2" fill="#4d96ff"/>' + TXT(17, 33, '1', '#fff', 16) + TXT(47, 33, '2', '#fff', 16) + '<path d="M29 29 L35 29 M33 26 L36 29 L33 32" stroke="#ffd54a" stroke-width="2" fill="none"/>',
    'director': BG() + PERSON(24, 22, '#333') + '<rect x="16" y="14" width="16" height="4" fill="#333"/><path d="M34 22 L46 16 L46 28Z" fill="#ffd54a"/>' + TXT(32, 56, 'ACTION!', '#ffd54a', 8),
    'cast': BG() + PERSON(14, 18, '#e63946') + PERSON(32, 18, '#2e7d32') + PERSON(50, 18, '#4d96ff') + STAR(14, 50, 4) + STAR(32, 50, 4) + STAR(50, 50, 4),
    'subtitles': BG() + SCREEN('#5a7fa6') + '<rect x="8" y="44" width="48" height="14" fill="#000" opacity=".8"/>' + TXT(32, 50, 'Hello, how are', '#ffd54a', 5) + TXT(32, 56, 'you today?', '#ffd54a', 5),
    'soundtrack': BG() + '<path d="M18 44 L18 16 L46 10 L46 38" stroke="#ffd54a" stroke-width="4" fill="none"/><circle cx="12" cy="45" r="7" fill="#ffd54a"/><circle cx="40" cy="39" r="7" fill="#ffd54a"/>' + FILM(50),
    'special-effects': BG('#0b0b1a') + '<polygon points="32,6 38,24 56,20 42,34 52,52 32,42 12,52 22,34 8,20 26,24" fill="#ff7a00"/><polygon points="32,16 35,26 46,24 38,33 44,44 32,38 20,44 26,33 18,24 29,26" fill="#ffd54a"/>' + TXT(32, 60, 'BOOM!', '#fff', 7),
    'plot': BG() + '<rect x="8" y="10" width="48" height="44" fill="#fff" rx="2"/><path d="M12 20 L24 30 L36 18 L52 40" stroke="#e63946" stroke-width="3" fill="none"/><circle cx="12" cy="20" r="3" fill="#333"/><circle cx="24" cy="30" r="3" fill="#333"/><circle cx="36" cy="18" r="3" fill="#333"/><circle cx="52" cy="40" r="3" fill="#333"/>' + TXT(32, 50, 'the story', '#555', 6),
    'script': BG() + '<rect x="14" y="6" width="36" height="52" fill="#fff"/><path d="M18 14 h28 M18 20 h20 M18 30 h28 M18 36 h24 M18 46 h28 M18 52 h16" stroke="#555" stroke-width="2"/>' + TXT(32, 12, 'SCRIPT', '#e63946', 5),
    'main-character': BG() + '<circle cx="32" cy="30" r="22" fill="#ffd54a" opacity=".3"/>' + PERSON(32, 24, '#e63946', 7) + STAR(32, 8, 5) + PERSON(10, 44, '#555', 3) + PERSON(54, 44, '#555', 3),
    'be-based-on': BG() + '<rect x="8" y="16" width="18" height="26" fill="#2e7d32"/><rect x="11" y="16" width="2" height="26" fill="#fff" opacity=".6"/><path d="M29 29 L35 29 M33 26 L36 29 L33 32" stroke="#ffd54a" stroke-width="2" fill="none"/>' + FILM(20) .replace('x="4"', 'x="38"').replace('width="56"', 'width="20"'),
    'be-set-in': BG('#cfe8ff') + '<rect x="0" y="40" width="64" height="24" fill="#9aa5b1"/><rect x="6" y="18" width="12" height="22" fill="#607d8b"/><rect x="22" y="10" width="14" height="30" fill="#455a64"/><rect x="40" y="22" width="16" height="18" fill="#78909c"/><rect x="4" y="46" width="30" height="10" fill="#333" rx="2"/>' + TXT(19, 53.5, 'L.A. 2019', '#fff', 5),
    'be-directed-by': BG() + '<rect x="6" y="24" width="52" height="30" fill="#333"/><circle cx="18" cy="16" r="9" fill="#444" stroke="#fff" stroke-width="2"/><circle cx="36" cy="16" r="9" fill="#444" stroke="#fff" stroke-width="2"/><rect x="48" y="30" width="10" height="8" fill="#4d96ff"/>' + TXT(26, 45, 'DIRECTED BY', '#ffd54a', 5),
    'be-dubbed': BG() + SCREEN('#5a7fa6') + PERSON(32, 22, '#e63946') + '<ellipse cx="14" cy="50" rx="10" ry="7" fill="#fff"/><ellipse cx="50" cy="50" rx="10" ry="7" fill="#fff"/>' + TXT(14, 52, 'Hi!', '#333', 6) + TXT(50, 52, '¡Hola!', '#333', 5),
    'be-released': BG() + '<rect x="10" y="10" width="44" height="44" rx="4" fill="#fff"/><rect x="10" y="10" width="44" height="12" fill="#e63946"/>' + TXT(32, 19, 'OUT NOW', '#fff', 6) + TXT(32, 42, '14', '#333', 18) + TXT(32, 50, 'FRIDAY', '#777', 5),
    'be-shot': BG() + '<rect x="10" y="26" width="30" height="20" rx="3" fill="#444"/><circle cx="25" cy="36" r="7" fill="#222" stroke="#aaa" stroke-width="2"/><polygon points="40,30 54,22 54,50 40,42" fill="#444"/><rect x="14" y="48" width="4" height="12" fill="#888"/><rect x="30" y="48" width="4" height="12" fill="#888"/><circle cx="18" cy="24" r="2.5" fill="#e63946"/>' + TXT(32, 14, 'FILMING', '#ffd54a', 6),
    'star': BG() + STAR(32, 26, 20) + TXT(32, 56, 'STARRING', '#fff', 7),
    'action': BG('#b71c1c') + '<rect x="0" y="46" width="64" height="18" fill="#333"/><rect x="8" y="30" width="22" height="9" rx="2" fill="#ffd54a"/><rect x="12" y="24" width="13" height="8" rx="2" fill="#ffd54a"/><circle cx="13" cy="42" r="3" fill="#222"/><circle cx="25" cy="42" r="3" fill="#222"/><polygon points="36,20 44,30 56,26 48,38 58,46 44,42 38,54 36,40 24,38 34,32" fill="#ff7a00"/>',
    'animation': BG('#fff3e0') + '<circle cx="32" cy="30" r="16" fill="#ffb74d"/><circle cx="26" cy="26" r="4" fill="#fff"/><circle cx="38" cy="26" r="4" fill="#fff"/><circle cx="26" cy="26" r="2" fill="#333"/><circle cx="38" cy="26" r="2" fill="#333"/><path d="M24 36 Q32 44 40 36" stroke="#333" stroke-width="2" fill="none"/><ellipse cx="20" cy="14" rx="6" ry="9" fill="#ffb74d"/><ellipse cx="44" cy="14" rx="6" ry="9" fill="#ffb74d"/>' + TXT(32, 58, 'ANIMATION', '#e65100', 5),
    'horror-movie': BG('#0b0b1a') + '<circle cx="48" cy="14" r="8" fill="#eee"/><path d="M20 56 L20 30 Q32 18 44 30 L44 56Z" fill="#fff"/><circle cx="27" cy="34" r="3" fill="#000"/><circle cx="37" cy="34" r="3" fill="#000"/><ellipse cx="32" cy="46" rx="3" ry="5" fill="#000"/>',
    'romantic-comedy': BG('#fce4ec') + '<path d="M32 50 L14 32 A10 10 0 0 1 32 20 A10 10 0 0 1 50 32Z" fill="#e63946"/>' + TXT(32, 60, 'ROM-COM', '#ad1457', 6) + '<path d="M26 32 Q32 38 38 32" stroke="#fff" stroke-width="2" fill="none"/><circle cx="27" cy="27" r="1.5" fill="#fff"/><circle cx="37" cy="27" r="1.5" fill="#fff"/>',
    'science-fiction-movie': BG('#0b0b1a') + '<circle cx="12" cy="10" r="1" fill="#fff"/><circle cx="50" cy="8" r="1" fill="#fff"/><circle cx="56" cy="30" r="1" fill="#fff"/><circle cx="8" cy="40" r="1" fill="#fff"/><ellipse cx="32" cy="34" rx="24" ry="7" fill="#9e9e9e"/><ellipse cx="32" cy="28" rx="11" ry="8" fill="#4dd0e1"/><circle cx="18" cy="36" r="2" fill="#ffd54a"/><circle cx="32" cy="38" r="2" fill="#ffd54a"/><circle cx="46" cy="36" r="2" fill="#ffd54a"/><polygon points="24,41 40,41 48,60 16,60" fill="#4dd0e1" opacity=".4"/>',
    'thriller': BG('#263238') + '<circle cx="32" cy="28" r="18" fill="#37474f"/><circle cx="32" cy="28" r="12" fill="#eceff1"/><path d="M32 28 L32 18 M32 28 L40 32" stroke="#e63946" stroke-width="3"/><path d="M8 50 L56 50" stroke="#e63946" stroke-width="2" stroke-dasharray="4 3"/>' + TXT(32, 60, '?', '#e63946', 10),
    'musical': BG('#4a148c') + '<path d="M16 46 L16 14 L44 8 L44 40" stroke="#ffd54a" stroke-width="4" fill="none"/><circle cx="10" cy="47" r="7" fill="#ffd54a"/><circle cx="38" cy="41" r="7" fill="#ffd54a"/>' + STAR(54, 14, 5) + STAR(56, 48, 4) + TXT(32, 60, 'MUSICAL', '#fff', 6),
    'documentary': BG('#e8f5e9') + '<rect x="6" y="14" width="40" height="28" rx="3" fill="#2e7d32"/><polygon points="46,22 58,16 58,40 46,34" fill="#2e7d32"/><circle cx="26" cy="28" r="9" fill="#a5d6a7"/><path d="M20 32 L26 22 L32 32Z" fill="#2e7d32"/>' + TXT(32, 56, 'REAL LIFE', '#2e7d32', 6),
}

for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
