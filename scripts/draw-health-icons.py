#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/health (Advanced 1 / 8B Health & fitness verb phrases + 8C modals). Original artwork.
Run once: python3 scripts/draw-health-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'health'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#e8f5e9"/>'
PERSON = lambda fill, extra='': f'<circle cx="32" cy="16" r="7" fill="{fill}"/><path d="M20 50 v-14 q0 -8 12 -8 q12 0 12 8 v14z" fill="{fill}"/>{extra}'
TXT = lambda t, y=58, size=7, fill='#333': f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
ICONS = {
    'unhealthy-lifestyle': BG + '<rect x="6" y="38" width="52" height="14" rx="4" fill="#8d6e63"/>' + PERSON('#9e9e9e', '<rect x="44" y="24" width="12" height="10" fill="#333"/><rect x="46" y="26" width="8" height="6" fill="#64b5f6"/>') + '<path d="M8 18 q4 -6 8 0 q4 6 8 0" stroke="#ff7043" stroke-width="2" fill="none"/>',
    'bad-habits': BG + '<circle cx="20" cy="40" r="10" fill="#ffcc80"/><rect x="14" y="28" width="12" height="6" fill="#d84315"/><rect x="38" y="20" width="18" height="6" rx="3" fill="#fff" stroke="#999"/><path d="M50 14 q2 -6 0 -10" stroke="#aaa" stroke-width="2" fill="none"/><path d="M6 6 l52 52" stroke="#e63946" stroke-width="4"/>',
    'healthy-lifestyle': BG + '<circle cx="18" cy="34" r="9" fill="#e53935"/><path d="M18 25 l2 -5" stroke="#2e7d32" stroke-width="2"/><path d="M34 44 q6 -16 12 -2 M40 20 l6 -6" stroke="#2e7d32" stroke-width="3" fill="none"/><circle cx="46" cy="14" r="5" fill="#ffb74d"/><path d="M38 50 h18" stroke="#2e7d32" stroke-width="3"/>',
    'exercise': BG + PERSON('#1565c0', '<rect x="6" y="20" width="52" height="6" rx="3" fill="#333"/><rect x="4" y="14" width="8" height="18" rx="2" fill="#555"/><rect x="52" y="14" width="8" height="18" rx="2" fill="#555"/>'),
    'balanced-diet': BG + '<circle cx="32" cy="34" r="22" fill="#fff" stroke="#bdbdbd" stroke-width="2"/><path d="M32 34 L32 12 A22 22 0 0 1 51 45z" fill="#8bc34a"/><path d="M32 34 L51 45 A22 22 0 0 1 13 45z" fill="#ffb74d"/><path d="M32 34 L13 45 A22 22 0 0 1 32 12z" fill="#ef9a9a"/>',
    'stressed': BG + PERSON('#ab47bc', '<path d="M26 14 l4 2 M38 14 l-4 2" stroke="#fff" stroke-width="2"/>') + '<path d="M10 10 l6 6 M16 10 l-6 6 M48 8 l6 6 M54 8 l-6 6" stroke="#e63946" stroke-width="2"/><path d="M44 30 q8 -2 8 6" stroke="#333" stroke-width="2" fill="none"/>',
    'overweight': BG + '<circle cx="32" cy="14" r="7" fill="#ff8a65"/><ellipse cx="32" cy="38" rx="18" ry="14" fill="#ff8a65"/>',
    'in-shape': BG + '<circle cx="32" cy="12" r="6" fill="#43a047"/><path d="M22 20 h20 l-4 18 h-12z" fill="#43a047"/><path d="M14 24 l8 -4 M50 24 l-8 -4" stroke="#43a047" stroke-width="5"/><path d="M26 38 v14 M38 38 v14" stroke="#43a047" stroke-width="5"/>',
    'on-a-diet': BG + '<circle cx="32" cy="36" r="18" fill="#fff" stroke="#999" stroke-width="2"/><ellipse cx="28" cy="34" rx="6" ry="4" fill="#8bc34a"/><circle cx="38" cy="38" r="3" fill="#ef5350"/><rect x="50" y="20" width="6" height="26" rx="2" fill="#555"/><rect x="8" y="20" width="6" height="26" rx="2" fill="#555"/>',
    'underweight': BG + '<circle cx="32" cy="14" r="6" fill="#90a4ae"/><rect x="28" y="21" width="8" height="24" rx="3" fill="#90a4ae"/><path d="M30 45 v10 M34 45 v10" stroke="#90a4ae" stroke-width="3"/>',
    'good-nights-sleep': BG + '<rect x="6" y="36" width="52" height="14" rx="3" fill="#5c6bc0"/><circle cx="18" cy="32" r="6" fill="#ffe0b2"/><path d="M12 32 h44 v4 h-44z" fill="#fff"/>' + TXT('Z z z', 20, 10, '#283593'),
    'get-a-checkup': BG + '<rect x="14" y="10" width="36" height="46" rx="4" fill="#fff" stroke="#90a4ae" stroke-width="2"/><rect x="28" y="20" width="8" height="24" fill="#e63946"/><rect x="20" y="28" width="24" height="8" fill="#e63946"/>',
    'cut-down': BG + '<rect x="14" y="26" width="16" height="22" rx="2" fill="#795548"/><rect x="34" y="34" width="16" height="14" rx="2" fill="#a1887f"/><path d="M8 20 l48 -8" stroke="#2e7d32" stroke-width="3"/><path d="M50 10 l6 2 l-4 6" stroke="#2e7d32" stroke-width="3" fill="none"/>',
    'give-up-smoking': BG + '<rect x="12" y="30" width="36" height="6" rx="3" fill="#fff" stroke="#999"/><rect x="40" y="30" width="8" height="6" fill="#ff8a65"/><path d="M8 8 l48 48" stroke="#e63946" stroke-width="5"/>',
    # modals
    'have-to': BG + '<rect x="6" y="18" width="52" height="28" rx="6" fill="#e63946"/>' + TXT('MUST / HAVE TO', 30, 7, '#fff') + TXT('obligation', 40, 6, '#fff'),
    'dont-have-to': BG + '<rect x="6" y="18" width="52" height="28" rx="6" fill="#4d96ff"/>' + TXT("DON'T HAVE TO", 30, 7, '#fff') + TXT('not necessary', 40, 6, '#fff'),
    'cant': BG + '<rect x="6" y="18" width="52" height="28" rx="6" fill="#333"/>' + TXT("CAN'T", 30, 9, '#fff') + TXT('not allowed', 40, 6, '#fff'),
    'should': BG + '<rect x="6" y="18" width="52" height="28" rx="6" fill="#43a047"/>' + TXT('SHOULD', 30, 9, '#fff') + TXT('advice', 40, 6, '#fff'),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n')
print(f'{len(ICONS)} icons written to {OUT}')
