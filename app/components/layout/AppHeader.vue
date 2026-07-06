<template>
    <header class="mt-sm-4">
        <nav class="navbar navbar-expand sticky-top p-3">
            <div class="container p-0">
                <NuxtLink to="/" class="navbar-brand d-none d-sm-flex m-0 p-0">
                    <img src="/img/icons/logo.svg" class="navbar-logo" alt="Logo" width="22" height="22" />
                </NuxtLink>

                <ul ref="navRef" class="navbar-nav align-items-center nav-wrapper">
                    <li ref="pillRef" class="nav-pill"></li>

                    <li v-for="link in navLinks" :key="link.to" class="nav-item mx-sm-1">
                        <NuxtLink :to="link.to" custom v-slot="{ href, navigate, isActive }">
                            <a :href="href" @click="navigate" :class="[
                                'nav-link rounded-pill',
                                { active: isActive }
                            ]">
                                {{ link.label }}
                            </a>
                        </NuxtLink>
                    </li>
                </ul>

                <div class="navbar-actions">
                    <UiDarkModeToggle />
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stack', label: 'Stack' }
]

const navRef = ref<HTMLElement | null>(null)
const pillRef = ref<HTMLElement | null>(null)

function updatePill(animate = true) {
    nextTick(() => {
        const active = navRef.value?.querySelector('.nav-link.active') as HTMLElement | null

        if (!active || !pillRef.value) return

        if (!animate) {
            pillRef.value.style.transition = 'none'
        }

        const navRect = navRef.value!.getBoundingClientRect()
        const activeRect = active.getBoundingClientRect()

        pillRef.value.style.width = `${activeRect.width}px`
        pillRef.value.style.height = `${activeRect.height}px`
        pillRef.value.style.transform =
            `translateX(${activeRect.left - navRect.left}px)`

        if (!animate) {
            pillRef.value.offsetHeight
            pillRef.value.style.transition =
                'transform .3s cubic-bezier(.22,1,.36,1), width .3s cubic-bezier(.22,1,.36,1), background-color 220ms ease-in-out'
        }
    })
}

const onResize = () => updatePill(false)

onMounted(() => {
    updatePill(false)
    window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})

watch(
    () => route.fullPath,
    () => updatePill()
)
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;

@include link-hover-fade(".navbar-nav");

.navbar {

    .navbar-logo,
    .navbar-actions {
        transform: scale(1);
        transition: transform 0.2s ease-in-out;

        &:hover {
            transform: scale(1.2);
        }
    }

    .nav-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .nav-pill {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        background-color: $primary;
        border-radius: $radius-pill;
        pointer-events: none;
        z-index: 0;
    }

    .nav-item {
        position: relative;
        z-index: 1;

        .nav-link {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            padding: $spacer-1 $spacer;

            &.active {
                color: $dark;
            }
        }
    }

    .navbar-actions {
        width: 20px;
        height: 24px;
    }
}
</style>