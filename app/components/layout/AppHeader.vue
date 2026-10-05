<template>
    <header class="mt-sm-4">
        <nav class="navbar navbar-expand">
            <div class="container justify-content-end p-sm-0">
                <ul ref="navRef" class="navbar-nav align-items-center nav-wrapper">
                    <li ref="indicatorRef" class="nav-indicator" aria-hidden="true" />

                    <li v-for="link in navLinks" :key="link.to" class="nav-item mx-sm-1">
                        <NuxtLink :to="link.to" custom v-slot="{ href, navigate, isActive }">
                            <a :href="href" :class="[
                                'nav-link',
                                { active: isActive }
                            ]" @click="navigate">
                                {{ link.label }}
                            </a>
                        </NuxtLink>
                    </li>
                </ul>

                <NuxtLink to="/" class="navbar-brand d-none d-sm-flex m-0 ms-3 p-0">
                    <img src="/img/icons/logo.svg" class="navbar-logo" alt="Logo" width="22" height="22" />
                </NuxtLink>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import {
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch
} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stack', label: 'Stack' }
]

const navRef = ref<HTMLElement | null>(null)
const indicatorRef = ref<HTMLElement | null>(null)

function updateIndicator(animate = true) {
    nextTick(() => {
        const nav = navRef.value
        const indicator = indicatorRef.value
        const activeLink = nav?.querySelector('.nav-link.active') as HTMLElement | null

        if (!nav || !indicator || !activeLink) return

        const navRect = nav.getBoundingClientRect()
        const activeRect = activeLink.getBoundingClientRect()

        const indicatorWidth = 45
        const indicatorHeight = 1

        const x =
            activeRect.left -
            navRect.left +
            (activeRect.width - indicatorWidth) / 2

        const y =
            activeRect.bottom -
            navRect.top +
            2

        if (!animate) {
            indicator.style.transition = 'none'
        }

        indicator.style.width = `${indicatorWidth}px`
        indicator.style.height = `${indicatorHeight}px`
        indicator.style.transform = `translate(${x}px, ${y}px)`

        if (!animate) {
            indicator.offsetHeight
            indicator.style.transition =
                'transform 0.3s cubic-bezier(.22,1,.36,1)'
        }

        indicator.classList.add('is-visible')
    })
}

const onResize = () => {
    updateIndicator(false)
}

onMounted(() => {
    updateIndicator(false)

    window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})

watch(
    () => route.fullPath,
    () => updateIndicator()
)
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;

@include link-hover-fade(".navbar-nav");

.navbar {
    .navbar-brand {
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: $radius-pill;
        transform: scale(1);
        transition: transform 0.2s ease-in-out;

        &:hover {
            transform: scale(1.2);
            background-color: rgba($white, 0.09);
        }
    }

    .nav-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .nav-indicator {
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 2px;
        background-color: $white;
        border-radius: $radius-pill;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        will-change: transform;
        transition: transform 0.3s cubic-bezier(.22, 1, .36, 1);

        &.is-visible {
            opacity: 1;
        }
    }

    .nav-item {
        position: relative;
        z-index: 1;

        .nav-link {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: $spacer-1 $spacer;
            text-decoration: none;

            &.active,
            &:hover {
                color: $white;
            }
        }
    }
}
</style>