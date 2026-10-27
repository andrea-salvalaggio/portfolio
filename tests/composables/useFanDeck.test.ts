import { describe, expect, it } from 'vitest'
import { useFanDeck, type FanCard } from '~/composables/useFanDeck'

const makeCards = (count: number): FanCard[] =>
    Array.from({ length: count }, (_, i) => ({ image: `/img/${i}.jpg`, alt: `Card ${i}` }))

describe('useFanDeck', () => {
    it('fans the cards around the center one', () => {
        const { cardStyles } = useFanDeck({ cards: makeCards(5) })
        const [first, , center] = cardStyles.value

        expect(center).toMatchObject({ '--x': '0px', '--y': '0px', '--r': '0deg', '--s': 1, '--z': 100 })
        // 2 steps away from the center: spacing 120, arc 10 * 2², rotation 10, scale decay 0.06
        expect(first).toMatchObject({ '--x': '-240px', '--y': '40px', '--r': '-20deg', '--z': 98 })
        expect(first!['--s']).toBeCloseTo(0.88)
    })

    it('keeps the stacking order symmetric', () => {
        const { cardStyles } = useFanDeck({ cards: makeCards(5) })

        expect(cardStyles.value.map((style) => style['--z'])).toEqual([98, 99, 100, 99, 98])
    })

    it('lifts and enlarges the hovered card and pushes its neighbours away', () => {
        const { cardStyles, hoveredIndex } = useFanDeck({ cards: makeCards(5) })
        const base = cardStyles.value.map((style) => ({ ...style }))

        hoveredIndex.value = 1

        const [left, hovered, right] = cardStyles.value

        // base y is 10 (one step from the center), lifted by 20
        expect(hovered!['--y']).toBe('-10px')
        expect(hovered!['--s']).toBeCloseTo(0.94 * 1.1)
        // the right neighbour is pushed right by 100 / (1 + 0.6)
        expect(right!['--x']).toBe(`${100 / 1.6}px`)
        expect(left!['--x']).toBe(`${-120 * 2 - 100 / 1.6}px`)
        expect(base[2]!['--x']).toBe('0px')
    })

    it('goes back to the base layout when the hover ends', () => {
        const { cardStyles, hoveredIndex } = useFanDeck({ cards: makeCards(5) })
        const base = JSON.stringify(cardStyles.value)

        hoveredIndex.value = 3
        expect(JSON.stringify(cardStyles.value)).not.toBe(base)

        hoveredIndex.value = null
        expect(JSON.stringify(cardStyles.value)).toBe(base)
    })

    it('lets the desktop settings override the defaults', () => {
        const { cardStyles } = useFanDeck({ cards: makeCards(3), desktopFanSettings: { spacing: 50 } })

        expect(cardStyles.value[0]!['--x']).toBe('-50px')
        expect(cardStyles.value[2]!['--x']).toBe('50px')
    })

    it('exposes the mobile position of each card as separate variables', () => {
        const cards: FanCard[] = [
            { image: 'a.jpg', alt: 'a', mobile: { x: -65, y: -60, rotate: -5, scale: 1, z: 0 } },
            { image: 'b.jpg', alt: 'b' }
        ]
        const { cardStyles } = useFanDeck({ cards })

        expect(cardStyles.value[0]).toMatchObject({ '--mx': '-65px', '--my': '-60px', '--mr': '-5deg', '--ms': 1, '--mz': 0 })
        // cards without a mobile position fall back to neutral values
        expect(cardStyles.value[1]).toMatchObject({ '--mx': '0px', '--my': '0px', '--mr': '0deg', '--ms': 1, '--mz': 1 })
    })
})
