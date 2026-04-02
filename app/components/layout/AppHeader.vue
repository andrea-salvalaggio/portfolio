<template>
    <header class="mt-4">
        <nav class="navbar navbar-expand-lg sticky-top px-4 py-3">
            <div class="container p-0">
                <NuxtLink to="/" class="navbar-brand m-0 p-0">
                    <navLogo class="navbar-logo" />
                </NuxtLink>

                <div class="navbar-nav">
                    <li class="nav-item" v-for="link in navLinks" :key="link.to">
                        <NuxtLink class="nav-link" :to="link.to">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </div>

                <div class="navbar-actions">
                    <button>
                        Light/Dark mode
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import navLogo from '@/assets/img/icons/logo.svg'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stack', label: 'Stack' }
]
</script>
