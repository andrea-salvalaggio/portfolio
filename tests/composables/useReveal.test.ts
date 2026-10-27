import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void

let callback: ObserverCallback
const observe = vi.fn()
const unobserve = vi.fn()
const constructed = vi.fn()

class FakeIntersectionObserver {
    constructor(cb: ObserverCallback) {
        callback = cb
        constructed()
    }

    observe = observe
    unobserve = unobserve
}

// The observer lives at module level, so each test gets a fresh module
const loadUseReveal = async () => (await import('~/composables/useReveal')).useReveal

const mountWithReveal = (useReveal: () => void) => {
    const host = document.createElement('div')
    document.body.appendChild(host)

    const app = createApp(defineComponent({
        setup() {
            useReveal()
            return () => h('div')
        }
    }))
    app.mount(host)

    return app
}

const addRevealElements = (count: number) =>
    Array.from({ length: count }, () => {
        const el = document.createElement('section')
        el.className = 'reveal'
        document.body.appendChild(el)
        return el
    })

describe('useReveal', () => {
    beforeEach(() => {
        vi.resetModules()
        vi.clearAllMocks()
        vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
        document.body.innerHTML = ''
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('observes every .reveal element on mount', async () => {
        const els = addRevealElements(3)
        mountWithReveal(await loadUseReveal())

        expect(observe).toHaveBeenCalledTimes(3)
        els.forEach((el) => expect(observe).toHaveBeenCalledWith(el))
    })

    it('shares one observer and never observes an element twice', async () => {
        addRevealElements(2)
        const useReveal = await loadUseReveal()

        mountWithReveal(useReveal)
        mountWithReveal(useReveal)

        expect(constructed).toHaveBeenCalledTimes(1)
        expect(observe).toHaveBeenCalledTimes(2)
    })

    it('reveals elements as they intersect, with a staggered delay', async () => {
        const els = addRevealElements(2)
        mountWithReveal(await loadUseReveal())

        callback([
            { target: els[0], isIntersecting: true },
            { target: els[1], isIntersecting: true }
        ])

        expect(els[0]!.classList.contains('visible')).toBe(true)
        expect(els[0]!.style.getPropertyValue('--delay')).toBe('0ms')
        expect(els[1]!.style.getPropertyValue('--delay')).toBe('100ms')
        expect(unobserve).toHaveBeenCalledWith(els[0])
        expect(unobserve).toHaveBeenCalledWith(els[1])
    })

    it('ignores elements that are not intersecting yet', async () => {
        const [el] = addRevealElements(1)
        mountWithReveal(await loadUseReveal())

        callback([{ target: el, isIntersecting: false }])

        expect(el!.classList.contains('visible')).toBe(false)
        expect(unobserve).not.toHaveBeenCalled()
    })

    it('stops observing the elements when the component unmounts', async () => {
        const els = addRevealElements(2)
        const app = mountWithReveal(await loadUseReveal())

        app.unmount()

        els.forEach((el) => expect(unobserve).toHaveBeenCalledWith(el))
    })
})
