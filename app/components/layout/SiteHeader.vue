<template>
    <header>
        <div class="mb-5 d-flex align-items-center enter" style="--i: 0">
            <NuxtImg format="webp" src="/img/profile.png" width="44" height="44" densities="x1 x2" class="rounded-circle img-profile"
                alt="Profile picture" fetchpriority="high" preload />
            <div class="hero-id">
                <component :is="as" class="hero-name m-0">Andrea Salvalaggio</component>
                <p class="hero-role m-0">
                    <span class="visually-hidden">Web Designer and Frontend Developer</span>
                    <span class="role-rotator" aria-hidden="true">
                        <span class="role-item">Web Designer</span>
                        <span class="role-item">Frontend Developer</span>
                    </span>
                </p>
            </div>
            <a :href="contactUrl" class="nav-cta ms-auto">
                Email
                <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="nav-cta-icon" alt="" aria-hidden="true">
            </a>
        </div>
    </header>
</template>

<script setup lang="ts">
import connections from '~/data/connections.json'

// "as" lets a page that owns the h1 (the 404) render the name as a paragraph
withDefaults(defineProps<{ as?: string }>(), { as: 'h1' })

const contactUrl = connections.find((connection) => connection.url.startsWith('mailto:'))?.url
</script>

<style scoped lang="scss">
.img-profile {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border: 1px solid $gray-800;
}

.hero-id {
    margin-left: $spacer-3;
}

.hero-name,
.hero-role {
    font-size: 14px;
    line-height: 20px;
}

.hero-name {
    font-weight: $font-weight-medium;
    color: $light;
}

.role-rotator {
    display: inline-grid;
    overflow: hidden;
    vertical-align: top;
}

.role-item {
    grid-area: 1 / 1;
    animation: role-swap 8s cubic-bezier(0.65, 0, 0.35, 1) infinite;

    & + & {
        animation-delay: -4s;
    }
}

@keyframes role-swap {
    0%,
    38% {
        opacity: 1;
        transform: translateY(0);
    }

    50% {
        opacity: 0;
        transform: translateY(-100%);
    }

    50.01%,
    88% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.nav-cta {
    flex-shrink: 0;
    color: $dark;
    background-color: $gray-100;
    transition: background-color 220ms ease-in-out, transform 160ms cubic-bezier(0.25, 1, 0.5, 1);

    &:hover {
        color: $dark;
        background-color: $white;
    }
}

.nav-cta-icon {
    margin-left: $spacer-1;
    filter: brightness(0);
    opacity: 0.7;
    transform: scale(1.35);
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

@include up($bp-sm) {
    .nav-cta:hover .nav-cta-icon {
        transform: scale(1.35) rotate(45deg);
    }
}

@media (prefers-reduced-motion: reduce) {
    .role-item {
        animation: none;

        & + & {
            display: none;
        }
    }
}
</style>
