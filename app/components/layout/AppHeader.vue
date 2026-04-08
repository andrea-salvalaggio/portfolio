<template>
    <header class="mt-4">
        <nav class="navbar navbar-expand sticky-top p-3">
            <div class="container p-0">
                <NuxtLink to="/" class="navbar-brand m-0 p-0">
                    <NavLogo class="navbar-logo" />
                </NuxtLink>

                <ul class="navbar-nav align-items-center">
                    <li class="nav-item mx-1" v-for="link in navLinks" :key="link.to">
                        <NuxtLink class="nav-link" :to="link.to">
                            {{ link.label }}
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

<script setup>
import NavLogo from '@/assets/img/icons/logo.svg'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stack', label: 'Stack' }
]
</script>

<style scoped lang="scss">
.navbar {
    .nav-item {
        .nav-link {
            border-radius: $radius-pill;
            padding: $spacer-1 1.25rem;
        }

        .router-link-active {
            background-color: $light;
        }
    }
}
</style>