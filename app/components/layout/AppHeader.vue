<template>
    <header class="mt-sm-4">
        <nav class="navbar navbar-expand sticky-top p-3">
            <div class="container p-0">
                <NuxtLink to="/" class="navbar-brand d-none d-sm-flex m-0 p-0">
                    <img src="/img/icons/logo.svg" class="navbar-logo" alt="logo" />
                </NuxtLink>

                <ul class="navbar-nav align-items-center">
                    <li class="nav-item mx-sm-1" v-for="link in navLinks" :key="link.to">
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
            padding: $spacer-1 $spacer;
            transition: none;
        }

        .router-link-active {
            background-color: $primary;
        }
    }
}
</style>