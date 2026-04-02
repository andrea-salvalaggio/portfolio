<template>
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
            <NuxtLink to="/" class="navbar-brand">
                <img src="@/assets/img/logo.svg" alt="Logo">
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
</template>

<script setup>
const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stack', label: 'Stack' }
]
</script>