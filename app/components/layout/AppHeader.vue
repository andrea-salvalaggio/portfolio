<template>
    <header class="mt-3 mt-sm-4">
        <nav class="navbar navbar-expand p-0 pt-2">
            <div class="container justify-content-end justify-content-sm-center p-sm-0">
                <ul ref="navRef" class="navbar-nav align-items-center nav-wrapper">
                    <UiLiquidGlass />

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

                <NuxtLink to="/" class="navbar-brand d-flex m-0 ms-3 p-0">
                    <UiLiquidGlass />
                    <img src="/img/icons/logo.svg" class="navbar-logo" alt="Logo" width="22" height="22" />
                </NuxtLink>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stack', label: 'Stack' }
]
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;

@include link-hover-fade(".navbar-nav");

header {
    position: sticky;
    top: 1.5rem;
    z-index: 999;

    @media (max-width: 576px) {
        top: 1rem;
    }
}

.navbar {
    position: relative;
    isolation: isolate;

    .container {
        position: relative;
        z-index: 1;
    }

    .navbar-brand {
        width: 57px;
        height: 57px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: $radius-pill;
        transform: scale(1);
        transition: transform 0.2s ease-in-out;

        @media (min-width: 768px) {
            &:hover {
                transform: scale(1.2);
                background-color: rgba($white, 0.07);
            }
        }
    }

    .nav-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        &::before {
            content: "";
            display: none;
            position: absolute;
            position-anchor: --nav-active;
            width: 70px;
            height: 1.5px;
            left: anchor(center);
            top: anchor(bottom);
            transform: translateX(-50%) translateY(7px);
            background: linear-gradient(
                to right,
                transparent 0%,
                $white 30%,
                $white 60%,
                transparent 100%
            );
            border-radius: $radius-pill;
            pointer-events: none;
            z-index: 1;
            transition:
                left 0.3s cubic-bezier(.22, 1, .36, 1),
                top 0.3s cubic-bezier(.22, 1, .36, 1);
        }

        &:has(.nav-link.active) {
            &::before {
                display: block;
            }
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

            &.active {
                anchor-name: --nav-active;
                font-weight: $font-weight-regular;
            }
        }
    }
}
</style>