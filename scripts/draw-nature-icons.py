#!/usr/bin/env python3
"""Draws the flat SVG illustrations in public/img/nature (original artwork for this project).
Run once: python3 scripts/draw-nature-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'nature'
OUT.mkdir(parents=True, exist_ok=True)

SKY = '<rect width="64" height="64" rx="8" fill="url(#sky)"/>'
NIGHT = '<rect width="64" height="64" rx="8" fill="url(#night)"/>'
DEFS = '''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec8ff"/><stop offset="1" stop-color="#d9f1ff"/></linearGradient>
<linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f4b"/><stop offset="1" stop-color="#4a3f8c"/></linearGradient>
<linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a8a"/><stop offset=".55" stop-color="#ff8a5b"/><stop offset="1" stop-color="#ffd27a"/></linearGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3aa0e8"/><stop offset="1" stop-color="#1c6fb8"/></linearGradient>
</defs>'''
SUN = '<circle cx="50" cy="13" r="6" fill="#ffd54a"/>'
GRASS = '<rect y="46" width="64" height="18" fill="#5fbf5a"/>'
MOUNT = '<path d="M0 50 L14 26 L24 38 L34 20 L50 50Z" fill="#6d7f95"/><path d="M34 20 L38 28 L30 28Z M14 26 L18 33 L10 33Z" fill="#fff"/>'
TREE = lambda x, y, s=1, c='#2e8b57': f'<g transform="translate({x} {y}) scale({s})"><rect x="-2" y="0" width="4" height="8" fill="#7a4b22"/><path d="M-9 0 L0 -16 L9 0Z" fill="{c}"/><path d="M-7 -6 L0 -20 L7 -6Z" fill="{c}"/></g>'
CLOUD = lambda x, y, s=1, c='#fff': f'<g transform="translate({x} {y}) scale({s})" fill="{c}"><circle cx="0" cy="0" r="6"/><circle cx="7" cy="-2" r="7"/><circle cx="15" cy="1" r="5"/><rect x="-4" y="0" width="22" height="6" rx="3"/></g>'
WAVES = lambda y, c='#cbe9ff': f'<path d="M0 {y} q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0" stroke="{c}" stroke-width="2" fill="none"/>'
WATERBODY = lambda y: f'<rect y="{y}" width="64" height="{64 - y}" fill="url(#water)"/>'

ICONS = {
    'mountains': SKY + SUN + '<path d="M0 54 L16 22 L28 40 L40 16 L64 54Z" fill="#6d7f95"/><path d="M40 16 L45 26 L35 26Z M16 22 L21 31 L11 31Z" fill="#fff"/><path d="M0 54 L10 44 L20 54Z M44 54 L54 42 L64 54Z" fill="#4d5d70"/>' + '<rect y="54" width="64" height="10" fill="#5fbf5a"/>',
    'rainforest': SKY + '<rect y="44" width="64" height="20" fill="#2f6b3a"/>' + TREE(10, 46, 1.4, '#1f7a3e') + TREE(28, 48, 1.7, '#2e9b4f') + TREE(46, 46, 1.4, '#1f7a3e') + TREE(58, 50, 1.1, '#2e9b4f') + '<path d="M2 62 q6 -10 14 -4 M30 62 q6 -8 12 -2 M50 62 q4 -8 10 -3" stroke="#3fbf6a" stroke-width="3" fill="none" stroke-linecap="round"/>',
    'coast': SKY + SUN + WATERBODY(34) + WAVES(40) + '<path d="M0 64 L0 40 Q20 30 34 46 Q46 58 64 52 L64 64Z" fill="#f2d28b"/>' + '<path d="M0 44 Q14 40 26 46" stroke="#5fbf5a" stroke-width="5" fill="none"/>',
    'river': SKY + GRASS + TREE(10, 46, 1) + TREE(54, 44, 1.1) + '<path d="M26 0 C 20 20, 44 30, 30 64" stroke="url(#water)" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M26 0 C 20 20, 44 30, 30 64" stroke="#8fd3ff" stroke-width="2" fill="none" stroke-dasharray="4 6"/>',
    'stream': SKY + GRASS + '<circle cx="12" cy="52" r="3" fill="#8a8f98"/><circle cx="52" cy="58" r="3" fill="#8a8f98"/><circle cx="44" cy="40" r="2.5" fill="#a5abb5"/>' + '<path d="M0 30 C 16 34, 20 46, 36 44 S 56 54, 64 50" stroke="url(#water)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M0 30 C 16 34, 20 46, 36 44 S 56 54, 64 50" stroke="#c9ecff" stroke-width="1.5" fill="none" stroke-dasharray="3 5"/>' + TREE(56, 36, 0.9),
    'rocks': SKY + GRASS + '<path d="M8 56 L14 40 L26 36 L36 46 L30 56Z" fill="#8a8f98"/><path d="M14 40 L26 36 L22 46Z" fill="#b5bac4"/><path d="M34 58 L40 44 L52 42 L60 56Z" fill="#6f7580"/><path d="M40 44 L52 42 L48 50Z" fill="#a5abb5"/><ellipse cx="22" cy="60" rx="8" ry="3" fill="#9aa0aa"/>',
    'branch': SKY + '<path d="M0 44 C 20 40, 34 34, 64 26" stroke="#7a4b22" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M30 36 C 34 30, 36 26, 40 18 M44 32 C 50 30, 54 24, 56 20" stroke="#7a4b22" stroke-width="3.5" fill="none" stroke-linecap="round"/>' + ''.join(f'<ellipse cx="{x}" cy="{y}" rx="6" ry="3.2" transform="rotate({r} {x} {y})" fill="#3fa34d"/>' for x, y, r in [(40, 17, -60), (56, 19, -40), (24, 36, -20), (46, 30, -30), (14, 40, -10), (36, 26, -50)]),
    'roots': SKY + '<rect y="36" width="64" height="28" fill="#8a5a2b"/><rect y="30" width="64" height="8" fill="#5fbf5a"/><rect x="26" y="0" width="12" height="32" fill="#7a4b22"/><path d="M32 30 C 30 40, 18 44, 8 58 M32 30 C 34 42, 46 44, 58 58 M32 32 C 32 44, 30 52, 32 62 M28 34 C 20 38, 16 40, 12 44 M36 34 C 44 38, 48 40, 52 44" stroke="#c98c4a" stroke-width="3" fill="none" stroke-linecap="round"/>',
    'wildlife': SKY + GRASS + TREE(8, 46, 1.1) + '<g fill="#a5652f"><ellipse cx="40" cy="48" rx="11" ry="7"/><rect x="31" y="50" width="3" height="10"/><rect x="46" y="50" width="3" height="10"/><rect x="36" y="50" width="3" height="10"/><rect x="42" y="50" width="3" height="10"/><circle cx="52" cy="42" r="5"/><rect x="51" y="43" width="6" height="4" rx="1"/></g><path d="M54 37 L56 30 M55 37 L60 31 M50 37 L48 30 M51 37 L46 32" stroke="#6b3f1a" stroke-width="2" stroke-linecap="round"/><circle cx="54" cy="41" r="1" fill="#000"/>',
    'cliff': SKY + SUN + WATERBODY(44) + WAVES(50) + WAVES(58) + '<path d="M0 0 L34 0 L36 14 L30 24 L38 36 L32 64 L0 64Z" fill="#8a6d4b"/><path d="M0 0 L34 0 L36 14 L30 24 L38 36 L32 64 L20 64 L26 36 L20 22 L26 10 L22 0Z" fill="#a98862"/><rect width="30" height="6" fill="#5fbf5a"/>',
    'ocean': SKY + SUN + CLOUD(6, 14, 0.8) + WATERBODY(28) + WAVES(34) + WAVES(42) + WAVES(50) + WAVES(58) + '<path d="M40 22 L48 10 L50 22Z" fill="#fff"/><path d="M38 24 L52 24 L50 28 L40 28Z" fill="#e63946"/>',
    'waves': SKY + WATERBODY(30) + '<path d="M0 44 C 8 34, 16 34, 24 38 C 30 42, 32 30, 44 30 C 54 30, 58 38, 64 40 L64 64 L0 64Z" fill="#2a86d6"/><path d="M6 36 C 12 30, 22 30, 26 36 M30 34 C 36 28, 46 26, 52 32" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M0 52 C 10 46, 20 46, 30 52 S 50 58, 64 52" stroke="#dff3ff" stroke-width="3" fill="none"/>',
    'shore': SKY + SUN + WATERBODY(26) + WAVES(32) + '<path d="M0 64 L0 46 Q32 36 64 46 L64 64Z" fill="#f2d28b"/><path d="M0 46 Q32 36 64 46 Q32 44 0 48Z" fill="#e8f7ff"/><circle cx="14" cy="56" r="2" fill="#f4a8c3"/><path d="M40 52 l4 4 l4 -4 l-4 -3Z" fill="#f4a8c3"/>',
    'lightning': NIGHT + CLOUD(10, 16, 1.4, '#6b6f9e') + CLOUD(34, 12, 1.1, '#8a8fc2') + '<path d="M36 26 L26 42 L33 42 L27 60 L42 38 L35 38 L41 26Z" fill="#ffe14a"/>',
    'thunderstorm': NIGHT + CLOUD(8, 14, 1.5, '#5b5f8f') + CLOUD(36, 10, 1.2, '#7b80b3') + '<path d="M30 24 L22 38 L28 38 L23 52 L36 34 L30 34 L35 24Z" fill="#ffe14a"/>' + ''.join(f'<line x1="{x}" y1="{y}" x2="{x - 3}" y2="{y + 8}" stroke="#8fd3ff" stroke-width="2" stroke-linecap="round"/>' for x, y in [(12, 40), (16, 52), (44, 40), (50, 50), (56, 40), (8, 56), (40, 56)]),
    'cave': SKY + GRASS + '<path d="M2 58 C 2 20, 62 20, 62 58Z" fill="#7a6a58"/><path d="M14 58 C 14 34, 50 34, 50 58Z" fill="#1d1a24"/><path d="M14 58 C 14 34, 50 34, 50 58Z" fill="url(#night)" opacity=".6"/><path d="M24 38 l3 8 M40 38 l-3 8" stroke="#8a7a68" stroke-width="3" stroke-linecap="round"/>' + TREE(56, 46, 0.7),
    'peak': SKY + SUN + '<path d="M0 64 L32 6 L64 64Z" fill="#6d7f95"/><path d="M32 6 L42 26 L36 22 L32 28 L28 22 L22 26Z" fill="#fff"/><path d="M0 64 L32 6 L64 64 L48 64 L32 22 L16 64Z" fill="#5a6a80" opacity=".6"/><path d="M30 8 L34 4 L38 8" stroke="#e63946" stroke-width="2" fill="none"/>',
    'valley': SKY + SUN + '<path d="M0 10 L0 64 L26 64 Q10 40 0 10Z" fill="#4f9e4a"/><path d="M64 10 L64 64 L38 64 Q54 40 64 10Z" fill="#3f8a3c"/><path d="M0 64 L0 24 Q14 36 24 64Z" fill="#6bbd5e"/><path d="M64 64 L64 24 Q50 36 40 64Z" fill="#5aab52"/><path d="M32 40 C 28 48, 36 56, 32 64" stroke="url(#water)" stroke-width="5" fill="none"/>' + TREE(12, 58, 0.6) + TREE(52, 58, 0.6),
    'waterfall': SKY + '<path d="M0 0 L0 64 L22 64 L22 20 L34 20 L34 0Z" fill="#7a6a58"/><path d="M64 0 L64 64 L48 64 L48 24 L40 24 L40 0Z" fill="#8a7a68"/><rect x="24" y="0" width="16" height="50" fill="#5db6ff"/><rect x="28" y="0" width="3" height="50" fill="#fff" opacity=".8"/><rect x="35" y="0" width="2" height="50" fill="#fff" opacity=".6"/><rect y="50" width="64" height="14" fill="url(#water)"/><ellipse cx="32" cy="52" rx="14" ry="4" fill="#fff" opacity=".8"/>' + TREE(10, 22, 0.7) + TREE(56, 26, 0.7),
    'lake': SKY + MOUNT + '<rect y="50" width="64" height="14" fill="#5fbf5a"/><ellipse cx="32" cy="52" rx="30" ry="10" fill="url(#water)"/><ellipse cx="32" cy="52" rx="24" ry="7" fill="#4aa8ec"/><path d="M10 52 L14 54 L16 50" stroke="#dff3ff" stroke-width="1.5" fill="none"/>' + TREE(6, 48, 0.8) + TREE(58, 48, 0.8),
    'sunrise-sunset': '<rect width="64" height="64" rx="8" fill="url(#dusk)"/><circle cx="32" cy="44" r="11" fill="#ffd54a"/><path d="M32 26 L32 20 M20 30 L16 26 M44 30 L48 26 M14 44 L8 44 M50 44 L56 44" stroke="#ffe680" stroke-width="2" stroke-linecap="round"/><rect y="44" width="64" height="20" fill="#3b2a5a"/><path d="M0 44 L10 34 L20 44 M40 44 L50 32 L64 44Z" fill="#3b2a5a"/>' + WAVES(52, '#8a6bb5') + WAVES(58, '#8a6bb5'),
}

for name, body in ICONS.items():
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{DEFS}{body}</svg>'
    (OUT / f'{name}.svg').write_text(svg)
print(f'wrote {len(ICONS)} icons to {OUT}')
