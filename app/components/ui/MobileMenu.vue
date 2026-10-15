<template>
    <div class="mobile-menu d-sm-none">
        <button class="menu-toggle" :class="{ 'is-open': isOpen }" type="button" :aria-expanded="isOpen"
            aria-controls="mobile-navigation" :aria-label="isOpen ? 'Close menu' : 'Open menu'" @click="toggleMenu"
            @keydown="handleKeydown">
            <span>{{ isOpen ? 'Close' : 'Menu' }}</span>

            <span class="toggle-icon" aria-hidden="true">
                <span></span>
                <span></span>
            </span>
        </button>

        <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <nav v-if="isOpen" id="mobile-navigation" class="menu-overlay" aria-label="Main navigation">
                <div class="menu-content container-fluid">
                    <div class="menu-links">
                        <NuxtLink v-for="(link, index) in links" :key="link.number" :to="link.to" class="menu-link"
                            :style="{ '--i': index }" @click="closeMenu">
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
import { ref, watch, onBeforeUnmount } from 'vue'

const isOpen = ref(false)

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

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') closeMenu()
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

function enter(el: Element, done: () => void) {
    const nav = el as HTMLElement

    nav.classList.add('is-entering')

    const animation = nav.animate(
        [
            {
                clipPath:
                    'circle(0px at var(--origin-x) var(--origin-y))',
            },
            {
                clipPath:
                    'circle(150vmax at var(--origin-x) var(--origin-y))',
            },
        ],
        {
            duration: 900,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            fill: 'forwards',
        },
    )

    animation.finished
        .then(() => {
            nav.classList.remove('is-entering')
            done()
        })
        .catch(() => {
            nav.classList.remove('is-entering')
            done()
        })
}

function leave(el: Element, done: () => void) {
    const nav = el as HTMLElement

    const animation = nav.animate(
        [
            {
                clipPath:
                    'circle(150vmax at var(--origin-x) var(--origin-y))',
            },
            {
                clipPath:
                    'circle(0px at var(--origin-x) var(--origin-y))',
            },
        ],
        {
            duration: 1000,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            fill: 'forwards',
        },
    )

    animation.finished
        .then(() => done())
        .catch(() => done())
}

watch(isOpen, (open) => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : ''
    }
})

onBeforeUnmount(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
    }
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
    clip-path: circle(0 at var(--origin-x) var(--origin-y));
}

.menu-content {
    display: flex;
    height: 100dvh;
    min-height: 100%;
    flex-direction: column;
    padding: $spacer-8 $spacer;
}

.menu-top,
.menu-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacer;
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

@keyframes link-in {
    from {
        opacity: 0;
        transform: translate3d(0, 12px, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
</style>
