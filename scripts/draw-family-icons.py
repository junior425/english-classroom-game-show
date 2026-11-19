#!/usr/bin/env python3
"""Flat SVG illustrations for public/img/family (Basic 1 / 2C Family and friends + possessives). Original artwork.
Run once: python3 scripts/draw-family-icons.py"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'img' / 'family'
OUT.mkdir(parents=True, exist_ok=True)
BG = '<rect width="64" height="64" rx="8" fill="#fff3e0"/>'
def label(t, y=60, size=6, fill='#4e342e'):
    return f'<text x="32" y="{y}" font-family="sans-serif" font-size="{size}" font-weight="bold" fill="{fill}" text-anchor="middle">{t}</text>'
def person(x, skin, hair, shirt, size=1.0, hair_style='short', y=24):
    r = 7 * size
    body_w = 10 * size
    out = f'<circle cx="{x}" cy="{y}" r="{r}" fill="{skin}"/>'
    if hair_style == 'short':
        out += f'<path d="M{x-r} {y-1} a{r} {r} 0 0 1 {2*r} 0z" fill="{hair}"/>'
    elif hair_style == 'long':
        out += f'<path d="M{x-r} {y+6} v-7 a{r} {r} 0 0 1 {2*r} 0 v7z" fill="{hair}"/><circle cx="{x}" cy="{y}" r="{r-2}" fill="{skin}"/>'
    elif hair_style == 'bald':
        pass
    out += f'<path d="M{x-body_w} {y+r+20} v-10 q0 -8 {body_w} -8 q{body_w} 0 {body_w} 8 v10z" fill="{shirt}"/>'
    return out
SK, SK2, SK3 = '#f1c27d', '#c68642', '#8d5524'
GREY, BROWN, BLACK, BLOND = '#cfd8dc', '#6d4c41', '#212121', '#fdd835'
ICONS = {
    'grandfather': BG + person(32, SK, GREY, '#546e7a', hair_style='bald') + '<path d="M26 22 a6 6 0 0 1 12 0" stroke="#cfd8dc" stroke-width="3" fill="none"/>' + label('grandfather'),
    'grandmother': BG + person(32, SK, GREY, '#ab47bc', hair_style='long') + label('grandmother'),
    'grandparents': BG + person(22, SK, GREY, '#546e7a', .8, 'bald', 26) + person(42, SK, GREY, '#ab47bc', .8, 'long', 26) + label('grandparents'),
    'mother': BG + person(32, SK2, BROWN, '#e53935', hair_style='long') + label('mother'),
    'father': BG + person(32, SK2, BLACK, '#1e88e5') + label('father'),
    'son': BG + person(32, SK2, BLACK, '#43a047', .8, 'short', 28) + label('son'),
    'daughter': BG + person(32, SK2, BROWN, '#ec407a', .8, 'long', 28) + label('daughter'),
    'parents': BG + person(22, SK2, BROWN, '#e53935', .8, 'long', 26) + person(42, SK2, BLACK, '#1e88e5', .8, 'short', 26) + label('parents'),
    'children': BG + person(22, SK2, BLACK, '#43a047', .7, 'short', 28) + person(42, SK2, BROWN, '#ec407a', .7, 'long', 28) + label('children'),
    'husband': BG + person(32, SK3, BLACK, '#37474f') + '<circle cx="46" cy="44" r="3" fill="none" stroke="#fbc02d" stroke-width="2"/>' + label('husband'),
    'wife': BG + person(32, SK, BLOND, '#8e24aa', hair_style='long') + '<circle cx="46" cy="44" r="3" fill="none" stroke="#fbc02d" stroke-width="2"/>' + label('wife'),
    'sister': BG + person(32, SK, BLOND, '#00acc1', .85, 'long', 26) + label('sister'),
    'brother': BG + person(32, SK, BROWN, '#fb8c00', .85, 'short', 26) + label('brother'),
    'boyfriend': BG + person(32, SK3, BLACK, '#5e35b1') + '<path d="M48 14 q-4 -5 -6 0 q-2 -5 -6 0 q0 5 6 9 q6 -4 6 -9z" fill="#e53935"/>' + label('boyfriend'),
    'girlfriend': BG + person(32, SK, BROWN, '#d81b60', hair_style='long') + '<path d="M48 14 q-4 -5 -6 0 q-2 -5 -6 0 q0 5 6 9 q6 -4 6 -9z" fill="#e53935"/>' + label('girlfriend'),
    'family-tree': BG + person(20, SK, GREY, '#546e7a', .5, 'bald', 12) + person(44, SK, GREY, '#ab47bc', .5, 'long', 12) + person(32, SK2, BROWN, '#e53935', .5, 'long', 30) + person(20, SK2, BLACK, '#43a047', .45, 'short', 46) + person(44, SK2, BROWN, '#ec407a', .45, 'long', 46) + label('family tree'),
    'my': BG + person(32, SK, BROWN, '#1e88e5') + '<path d="M20 50 l12 -8 l12 8" stroke="#4e342e" stroke-width="3" fill="none"/>' + label('I → my'),
    'your': BG + person(32, SK2, BLACK, '#43a047') + '<path d="M6 30 h12 l-4 -4 M18 30 l-4 4" stroke="#4e342e" stroke-width="3" fill="none"/>' + label('you → your'),
    'his': BG + person(32, SK3, BLACK, '#37474f') + label('he → his'),
    'her': BG + person(32, SK, BLOND, '#d81b60', hair_style='long') + label('she → her'),
    'its': BG + '<rect x="14" y="20" width="36" height="26" rx="4" fill="#ff8a65"/><path d="M14 20 l18 -10 l18 10z" fill="#bf360c"/><rect x="28" y="32" width="8" height="14" fill="#4e342e"/>' + label('it → its'),
    'our': BG + person(22, SK, BROWN, '#1e88e5', .8, 'short', 26) + person(42, SK2, BLACK, '#e53935', .8, 'long', 26) + '<circle cx="32" cy="12" r="4" fill="#fbc02d"/>' + label('we → our'),
    'their': BG + person(20, SK3, BLACK, '#43a047', .7, 'short', 26) + person(44, SK, BLOND, '#8e24aa', .7, 'long', 26) + '<path d="M4 30 h8 l-3 -3 M12 30 l-3 3" stroke="#4e342e" stroke-width="2" fill="none"/>' + label('they → their'),
    'apostrophe-s': BG + '<circle cx="18" cy="24" r="7" fill="#f1c27d"/><path d="M8 46 v-6 q0 -8 10 -8 q10 0 10 8 v6z" fill="#00acc1"/><ellipse cx="46" cy="30" rx="8" ry="5" fill="none" stroke="#333" stroke-width="2"/><ellipse cx="46" cy="30" rx="3" ry="5" fill="#333"/><path d="M28 24 h12" stroke="#4e342e" stroke-width="2"/>' + label("Olivia's sunglasses"),
}
for name, body in ICONS.items():
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{body}</svg>\n')
print(len(ICONS), 'icons')
