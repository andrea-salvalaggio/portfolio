<template>
    <div class="mobile-menu d-sm-none">
        <button ref="toggleRef" class="menu-toggle" :class="{ 'is-open': isOpen }" type="button"
            :aria-expanded="isOpen" aria-controls="mobile-navigation" @click="toggleMenu">
            <span>{{ isOpen ? 'Close' : 'Menu' }}</span>

            <span class="toggle-icon" aria-hidden="true">
                <span/>
                <span/>
            </span>
        </button>

        <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <nav v-if="isOpen" id="mobile-navigation" ref="navRef" class="menu-overlay" aria-label="Main navigation">
                <div class="menu-content container-fluid">
                    <div class="menu-links">
                        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="menu-link"
                            @click="closeMenu">
                            <span class="menu-label">
                                {{ link.label }}
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </nav>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const toggleRef = ref<HTMLButtonElement | null>(null)
const navRef = ref<HTMLElement | null>(null)

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Stack', to: '/stack' },
]

function toggleMenu() {
    isOpen.value = !isOpen.value
}

function closeMenu() {
    isOpen.value = false
}

// Escape closes the menu and Tab stays within the toggle and the links
function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeMenu()
        toggleRef.value?.focus()
        return
    }

    if (event.key !== 'Tab' || !toggleRef.value || !navRef.value) return

    const focusable = [toggleRef.value, ...navRef.value.querySelectorAll<HTMLElement>('a[href]')]
    const first = focusable[0]!
    const last = focusable[focusable.length - 1]!
    const active = document.activeElement

    if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
    } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
    }
}

function getOrigin() {
    const button = document.querySelector('.menu-toggle')
    const rect = button?.getBoundingClientRect()

    if (!rect) {
        return {
            x: window.innerWidth - 50,
            y: 40,
        }
    }

    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    }
}

function beforeEnter(el: Element) {
    const nav = el as HTMLElement
    const { x, y } = getOrigin()

    nav.style.setProperty('--origin-x', `${x}px`)
    nav.style.setProperty('--origin-y', `${y}px`)
}

const EASE_OUT = 'cubic-bezier(0.32, 0.72, 0, 1)'
const EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)'
const CLOSED = 'circle(0px at var(--origin-x) var(--origin-y))'
const OPEN = 'circle(150vmax at var(--origin-x) var(--origin-y))'

let overlayAnimation: Animation | null = null

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Decelerating reveal, then the links rise in one after the other
function enter(el: Element, done: () => void) {
    const nav = el as HTMLElement

    if (prefersReducedMotion()) {
        nav.style.clipPath = 'none'
        overlayAnimation = nav.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 })
        overlayAnimation.finished.then(done).catch(done)
        return
    }

    overlayAnimation = nav.animate(
        [{ clipPath: CLOSED }, { clipPath: OPEN }],
        { duration: 450, easing: EASE_OUT, fill: 'forwards' },
    )

    nav.querySelectorAll('.menu-link').forEach((link, i) => {
        link.animate(
            [
                { opacity: 0, transform: 'translateY(16px)' },
                { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 420, delay: 140 + i * 55, easing: EASE_OUT, fill: 'backwards' },
        )
    })

    const animation = overlayAnimation

    animation.finished
        .then(() => {
            // Fully open: drop the clip so the browser stops compositing it
            nav.style.clipPath = 'none'
            animation.cancel()
            done()
        })
        .catch(done)
}

// Faster than the entrance; it starts from the current clip if interrupted mid-enter
function leave(el: Element, done: () => void) {
    const nav = el as HTMLElement

    if (prefersReducedMotion()) {
        nav.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: 'forwards' })
            .finished.then(done).catch(done)
        return
    }

    const current = getComputedStyle(nav).clipPath
    const from = current && current !== 'none' ? current : OPEN

    overlayAnimation?.cancel()
    overlayAnimation = null
    nav.style.clipPath = ''

    nav.querySelectorAll('.menu-link').forEach((link) => {
        link.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 150, easing: 'ease-in', fill: 'forwards' },
        )
    })

    nav.animate(
        [{ clipPath: from }, { clipPath: CLOSED }],
        { duration: 320, easing: EASE_IN_OUT, fill: 'forwards' },
    ).finished.then(done).catch(done)
}

watch(isOpen, async (open) => {
    document.body.style.overflow = open ? 'hidden' : ''

    if (open) {
        document.addEventListener('keydown', handleKeydown)
        await nextTick()
        navRef.value?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true })
    } else {
        document.removeEventListener('keydown', handleKeydown)
    }
})

onBeforeUnmount(() => {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.mobile-menu {
    position: relative;
    z-index: 1000;
    border-radius: $radius-pill;
}

.menu-toggle {
    position: relative;
    z-index: 1002;
    display: inline-flex;
    align-items: center;
    gap: $spacer-3;
    padding: $spacer-3 $spacer-4;
    border: 1px solid $gray-800;
    border-radius: $radius-pill;
    color: $primary;
    background-color: $dark;
    font-size: $font-size-base;
    font-weight: $font-weight-light;
    cursor: pointer;
}

.toggle-icon {
    display: flex;
    width: 18px;
    flex-direction: column;
    gap: $spacer-1;
}

.toggle-icon span {
    display: block;
    width: 18px;
    height: 1.5px;
    background: currentColor;
    transition: transform 0.3s ease;
}

.is-open .toggle-icon span:first-child {
    transform: translateY(3.25px) rotate(45deg);
}

.is-open .toggle-icon span:last-child {
    width: 18px;
    transform: translateY(-3.25px) rotate(-45deg);
}

.menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 1001;
    overflow-y: auto;
    background: $dark;
    will-change: clip-path;
    clip-path: circle(0 at var(--origin-x) var(--origin-y));
}

.menu-content {
    display: flex;
    height: 100dvh;
    min-height: 100%;
    flex-direction: column;
    padding: $spacer-8 $spacer;
}

.menu-links {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: $spacer;
}

.menu-link {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: $spacer-2;
    padding: $spacer $spacer-0;
    border-bottom: 1px solid $gray-800;
    color: $primary;
    text-decoration: none;
}

.menu-label {
    width: fit-content;
    font-size: $font-size-smaller;
    font-weight: $font-weight-light;
    line-height: $line-height-base;
}
</style>
