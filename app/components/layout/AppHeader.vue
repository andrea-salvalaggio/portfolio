<template>
    <header class="mt-sm-4">
        <nav class="navbar navbar-expand sticky-top p-3">
            <div class="container p-0">
                <NuxtLink to="/" class="navbar-brand d-none d-sm-flex m-0 p-0">
                    <img src="/img/icons/logo.svg" class="navbar-logo" alt="Logo" width="22" height="22"/>
                </NuxtLink>

                <ul class="navbar-nav align-items-center">
                    <li class="nav-item mx-sm-1" v-for="link in navLinks" :key="link.to">
                        <NuxtLink class="nav-link btn-link rounded-pill" :to="link.to">
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
const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stack', label: 'Stack' }
]
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

    .nav-item {
        .nav-link {
            padding: $spacer-1 $spacer;
        }

        .router-link-active {
            color: $dark;
            background-color: $primary;
        }
    }

    .navbar-actions {
        width: 20px;
        height: 24px;
    }
}
</style>