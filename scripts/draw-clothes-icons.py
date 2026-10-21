#!/usr/bin/env python3
"""Flat SVG clothes illustrations for public/img/clothes (Basic 1 / 9A Clothes). Original artwork.
Run once: python3 scripts/draw-clothes-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'clothes'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#fff8e1"/>'
SKIN = '#f5c6a5'
ICONS = {
    'belt': BG + '<rect x="6" y="28" width="52" height="10" rx="3" fill="#6d4c41"/><rect x="26" y="25" width="14" height="16" rx="2" fill="none" stroke="#f9a825" stroke-width="3"/><rect x="32" y="27" width="2" height="12" fill="#f9a825"/><circle cx="14" cy="33" r="1.5" fill="#3e2723"/><circle cx="20" cy="33" r="1.5" fill="#3e2723"/>',
    'boots': BG + '<path d="M18 8 h14 v26 l10 6 a4 4 0 0 1 -2 6 h-22 z" fill="#c0392b"/><rect x="16" y="46" width="26" height="6" rx="2" fill="#5d4037"/><path d="M22 14 l6 0 M22 20 l6 0 M22 26 l6 0" stroke="#fff" stroke-width="1.5"/>',
    'coat': BG + '<path d="M22 8 h20 l10 8 v40 h-40 v-40z" fill="#4d96ff"/><path d="M22 8 l10 10 l10 -10" fill="#2f6fd6"/><rect x="31" y="18" width="2" height="38" fill="#2f6fd6"/><circle cx="27" cy="26" r="1.8" fill="#1b3f80"/><circle cx="37" cy="26" r="1.8" fill="#1b3f80"/><circle cx="27" cy="36" r="1.8" fill="#1b3f80"/><circle cx="37" cy="36" r="1.8" fill="#1b3f80"/><rect x="18" y="30" width="28" height="4" fill="#2f6fd6"/>',
    'dress': BG + '<path d="M24 6 h16 l2 14 h-20z" fill="#e63946"/><path d="M22 20 h20 l10 36 h-40z" fill="#e63946"/><rect x="22" y="20" width="20" height="3" fill="#8d1a26"/><path d="M26 6 l6 8 l6 -8" fill="#fff8e1"/>',
    'hat': BG + '<ellipse cx="32" cy="42" rx="26" ry="8" fill="#d4a056"/><path d="M16 42 q0 -26 16 -26 q16 0 16 26z" fill="#e2b674"/><rect x="16" y="34" width="32" height="5" fill="#333"/>',
    'jacket': BG + '<path d="M20 12 h24 l10 6 v26 h-8 v12 h-28 v-12 h-8 v-26z" fill="#c68a4b"/><path d="M26 12 l6 10 l6 -10" fill="#8d5a2b"/><rect x="31" y="22" width="2" height="34" fill="#8d5a2b"/><rect x="22" y="40" width="7" height="6" rx="1" fill="#8d5a2b"/><rect x="35" y="40" width="7" height="6" rx="1" fill="#8d5a2b"/>',
    'jeans': BG + '<path d="M20 6 h24 v16 l-3 36 h-7 l-2 -30 l-2 30 h-7 l-3 -36z" fill="#3b6fb6"/><rect x="20" y="6" width="24" height="5" fill="#2a5290"/><path d="M22 14 q4 3 8 0 M34 14 q4 3 8 0" stroke="#e0b060" stroke-width="1" fill="none"/>',
    'pants': BG + '<path d="M20 6 h24 v16 l-3 36 h-7 l-2 -30 l-2 30 h-7 l-3 -36z" fill="#c9962e"/><rect x="20" y="6" width="24" height="5" fill="#a87a20"/>',
    'shirt': BG + '<path d="M22 8 h20 l12 8 l-4 8 l-6 -2 v34 h-24 v-34 l-6 2 l-4 -8z" fill="#f48fb1"/><path d="M14 8 h36 M14 16 h36 M14 24 h36 M14 32 h36 M14 40 h36 M14 48 h36" stroke="#fff" stroke-width="1.2"/><path d="M26 8 l6 8 l6 -8" fill="#fff"/><rect x="31.3" y="16" width="1.4" height="38" fill="#c2185b"/>',
    'shoes': BG + '<path d="M8 36 q10 -10 22 -4 l16 4 a4 4 0 0 1 0 8 h-38z" fill="#26a69a"/><path d="M12 40 q10 -8 20 -4" stroke="#fff" stroke-width="1.5" fill="none"/><circle cx="24" cy="36" r="2" fill="#f9a825"/>',
    'skirt': BG + '<rect x="22" y="10" width="20" height="5" fill="#8d1a26"/><path d="M22 15 h20 l12 40 h-44z" fill="#e63946"/><path d="M28 15 l-4 40 M32 15 v40 M36 15 l4 40" stroke="#b71c1c" stroke-width="1.2"/>',
    'socks': BG + '<path d="M22 6 h14 v26 l10 8 a5 5 0 0 1 -4 8 h-14 l-6 -8z" fill="#8bc34a"/><rect x="22" y="6" width="14" height="4" fill="#fff"/><path d="M22 16 h14 M22 24 h14" stroke="#7e57c2" stroke-width="3"/><path d="M22 20 h14 M22 28 h14" stroke="#ffeb3b" stroke-width="3"/>',
    'suit': BG + '<path d="M18 12 h28 l6 6 v38 h-40 v-38z" fill="#455a64"/><path d="M26 12 l6 14 l6 -14" fill="#fff"/><path d="M30 14 l2 4 l2 -4 l-2 10z" fill="#c62828"/><path d="M24 12 l8 18 l8 -18 l6 6 l-14 38 l-14 -38z" fill="#37474f"/>',
    'sweater': BG + '<path d="M22 12 h20 l12 8 l-4 8 l-6 -2 v30 h-24 v-30 l-6 2 l-4 -8z" fill="#1e3a8a"/><path d="M16 26 h32 M16 32 h32 M16 38 h32 M16 44 h32" stroke="#fff" stroke-width="2"/><rect x="26" y="6" width="12" height="8" rx="3" fill="#1e3a8a"/>',
    't-shirt': BG + '<path d="M22 10 h20 l12 8 l-4 8 l-6 -2 v32 h-24 v-32 l-6 2 l-4 -8z" fill="#64b5f6"/><path d="M26 10 q6 6 12 0" stroke="#fff" stroke-width="2" fill="none"/>',
    # grammar helpers
    'wearing': BG + f'<circle cx="32" cy="12" r="6" fill="{SKIN}"/><path d="M20 20 h24 v22 h-24z" fill="#64b5f6"/><rect x="22" y="42" width="9" height="16" fill="#3b6fb6"/><rect x="33" y="42" width="9" height="16" fill="#3b6fb6"/><text x="48" y="14" font-family="sans-serif" font-size="8" fill="#333">now</text>',
    'listening': BG + f'<circle cx="32" cy="24" r="10" fill="{SKIN}"/><path d="M18 24 a14 14 0 0 1 28 0" stroke="#333" stroke-width="4" fill="none"/><rect x="16" y="22" width="6" height="10" rx="2" fill="#333"/><rect x="42" y="22" width="6" height="10" rx="2" fill="#333"/><path d="M24 46 q8 -6 16 0 M22 54 q10 -8 20 0" stroke="#e63946" stroke-width="2" fill="none"/>',
    'not-sleeping': BG + f'<rect x="8" y="34" width="48" height="16" rx="3" fill="#90caf9"/><circle cx="18" cy="30" r="6" fill="{SKIN}"/><circle cx="16" cy="29" r="1.2" fill="#333"/><circle cx="20" cy="29" r="1.2" fill="#333"/><circle cx="48" cy="14" r="8" fill="#ffeb3b"/><path d="M8 8 l48 48" stroke="#e63946" stroke-width="3"/>',
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
