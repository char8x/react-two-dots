import { COLOR_BLUE, COLOR_YELLOW, COLOR_RED, COLOR_PURPLE } from './constants'

export const blueCol = Array.from({ length: 4 }).map(e => COLOR_BLUE)
export const yellowCol = Array.from({ length: 4 }).map(e => COLOR_YELLOW)
export const redCol = Array.from({ length: 4 }).map(e => COLOR_RED)
export const purpleCol = Array.from({ length: 4 }).map(e => COLOR_PURPLE)
export const matrix = [blueCol, yellowCol, redCol, purpleCol]
