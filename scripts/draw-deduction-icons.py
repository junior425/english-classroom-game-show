#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/deduction (Advanced 1 / 12C Modals of deduction). Original artwork.
Run once: python3 scripts/draw-deduction-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'deduction'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#e3f2fd"/>'
def label(t, y=60, size=6, fill='#0d47a1'):
    return f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
def badge(t, color):
    return f'<rect x="6" y="4" width="52" height="12" rx="6" fill="{color}"/><text x="32" y="13" font-family="sans-serif" font-size="7" font-weight="bold" fill="#fff" text-anchor="middle">{t}</text>'
MUST, CANT, MIGHT = '#43a047', '#e53935', '#fb8c00'
ICONS = {
    'bed': BG + badge('must be', MUST) + '<rect x="10" y="30" width="44" height="14" rx="3" fill="#8d6e63"/><rect x="12" y="24" width="14" height="8" rx="2" fill="#fff"/><rect x="10" y="44" width="4" height="8" fill="#5d4037"/><rect x="50" y="44" width="4" height="8" fill="#5d4037"/>' + label('They must be in bed.'),
    'vacation': BG + badge('might be', MIGHT) + '<circle cx="46" cy="24" r="6" fill="#fbc02d"/><path d="M6 46 q26 -8 52 0 v6 h-52z" fill="#ffe082"/><path d="M24 44 v-16 M24 28 q-10 -2 -12 6 M24 28 q10 -2 12 6" stroke="#2e7d32" stroke-width="3" fill="none"/>' + label('He might be on vacation.'),
    'cafe': BG + badge('might not like', MIGHT) + '<path d="M18 26 h24 v14 q0 8 -12 8 q-12 0 -12 -8z" fill="#fff" stroke="#6d4c41" stroke-width="2"/><path d="M42 30 q8 0 8 6 q0 6 -8 6" stroke="#6d4c41" stroke-width="2" fill="none"/><path d="M26 22 q2 -4 0 -8 M32 22 q2 -4 0 -8" stroke="#999" stroke-width="2" fill="none"/>' + label('coffee only, no tea'),
    'sick': BG + badge('may be', MIGHT) + '<circle cx="32" cy="24" r="9" fill="#f1c27d"/><path d="M27 29 q5 -3 10 0" stroke="#333" stroke-width="2" fill="none"/><rect x="36" y="14" width="12" height="4" rx="2" fill="#fff" stroke="#e53935" stroke-width="1.5"/><path d="M20 50 v-6 q0 -8 12 -8 q12 0 12 8 v6z" fill="#90caf9"/>' + label('She may be sick.'),
    'party': BG + badge('must be having', MUST) + '<path d="M20 48 l12 -30 l12 30z" fill="#ec407a"/><circle cx="14" cy="14" r="3" fill="#fbc02d"/><circle cx="50" cy="12" r="3" fill="#43a047"/><circle cx="54" cy="26" r="3" fill="#1e88e5"/><path d="M8 40 q4 -6 8 0" stroke="#333" stroke-width="2" fill="none"/>' + label('having a party'),
    'gloves': BG + badge('must be cold', MUST) + '<path d="M20 48 v-16 q0 -4 3 -4 q3 0 3 4 v-8 q0 -4 3 -4 q3 0 3 4 v6 q0 -4 3 -4 q3 0 3 4 v6 q2 -4 5 -2 v12 q0 6 -11 6 q-12 0 -12 -4z" fill="#5e35b1"/><text x="48" y="24" font-size="12">❄</text>' + label('wearing gloves'),
    'apartment': BG + badge("can't live here", CANT) + '<rect x="12" y="20" width="40" height="30" fill="#90a4ae"/><rect x="18" y="26" width="8" height="8" fill="#fff"/><rect x="38" y="26" width="8" height="8" fill="#fff"/><rect x="18" y="38" width="8" height="8" fill="#fff"/><rect x="38" y="38" width="8" height="8" fill="#fff"/><path d="M12 20 l20 -8 l20 8" fill="#e53935"/>' + label('this is a house'),
    'phone': BG + badge('might be in a meeting', MIGHT) + '<rect x="22" y="12" width="20" height="36" rx="4" fill="#333"/><rect x="25" y="16" width="14" height="26" fill="#90caf9"/><path d="M46 14 q6 6 0 12 M50 10 q10 10 0 20" stroke="#e53935" stroke-width="2" fill="none"/>' + label('not answering'),
    'british': BG + badge('may be British', MIGHT) + '<rect x="12" y="20" width="40" height="26" fill="#1e3a8a"/><path d="M12 20 l40 26 M52 20 l-40 26" stroke="#fff" stroke-width="5"/><path d="M12 20 l40 26 M52 20 l-40 26" stroke="#e53935" stroke-width="2"/><path d="M32 20 v26 M12 33 h40" stroke="#fff" stroke-width="7"/><path d="M32 20 v26 M12 33 h40" stroke="#e53935" stroke-width="4"/>' + label('speaking English'),
    'homework': BG + badge('must be doing', MUST) + '<rect x="14" y="16" width="36" height="34" rx="3" fill="#fff" stroke="#0d47a1" stroke-width="2"/><path d="M20 26 h24 M20 34 h24 M20 42 h14" stroke="#999" stroke-width="2"/><path d="M44 48 l6 -14 l4 2 l-6 14z" fill="#fbc02d"/>' + label('his homework'),
    'midnight': BG + badge("can't be playing", CANT) + '<circle cx="32" cy="28" r="14" fill="#fff" stroke="#0d47a1" stroke-width="3"/><path d="M32 28 V16 M32 28 V17" stroke="#0d47a1" stroke-width="3" stroke-linecap="round"/><text x="52" y="14" font-size="10">🌙</text>' + label("it's nearly midnight"),
    'cant-vs-mustnt': BG + '<rect x="6" y="18" width="24" height="20" rx="4" fill="#e53935"/><text x="18" y="26" font-size="5.5" font-weight="bold" fill="#fff" text-anchor="middle">can\'t</text><text x="18" y="33" font-size="4.5" fill="#fff" text-anchor="middle">not true</text><rect x="34" y="18" width="24" height="20" rx="4" fill="#616161"/><text x="46" y="26" font-size="5.5" font-weight="bold" fill="#fff" text-anchor="middle">mustn\'t</text><text x="46" y="33" font-size="4.5" fill="#fff" text-anchor="middle">prohibition</text>' + label("Look! can't ≠ mustn't"),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
