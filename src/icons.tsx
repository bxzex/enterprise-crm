import React from 'react'

type IconProps = { size?: number; className?: string }

// Small set of plain line glyphs drawn for this app.
const glyph = (d: string) => ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" className={className}>
    <path d={d} />
  </svg>
)

export const Search = glyph('M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10ZM10.7 10.7 14 14')
export const Menu = glyph('M2 4h12M2 8h12M2 12h12')
export const Plus = glyph('M8 3v10M3 8h10')
export const X = glyph('M3.5 3.5l9 9M12.5 3.5l-9 9')
export const Check = glyph('M3 8.5l3.2 3.2L13 4.5')
export const ChevronDown = glyph('M4 6l4 4 4-4')
export const Pencil = glyph('M2.5 13.5h3l8-8-3-3-8 8v3ZM9 4l3 3')
export const Trash = glyph('M2.5 4.5h11M6 4.5v-2h4v2M4 4.5l.7 9h6.6l.7-9M6.7 7v4M9.3 7v4')
export const Download = glyph('M8 2v8M4.5 7 8 10.5 11.5 7M2.5 13.5h11')
