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
                <span class="nav-cta-icon" aria-hidden="true">
                    <img src="/img/icons/mail.svg" width="18" height="18" class="icon-mail" alt="">
                    <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="icon-arrow" alt="">
                </span>
                Email
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
    // gap and centering come from .nav-cta (inline-flex); icons stack in one 18px cell
    display: inline-grid;
    place-items: center;
    width: 18px;
    height: 18px;

    img {
        grid-area: 1 / 1;
        filter: brightness(0);
        transition: transform 320ms cubic-bezier(0.25, 1, 0.5, 1), opacity 200ms ease;
    }
}

.icon-arrow {
    opacity: 0;
    transform: translateY(10px) rotate(-45deg) scale(1.35);
}

// desktop only: the envelope "sends" up and an up arrow slides in from below
@include up($bp-sm) {
    @media (hover: hover) and (pointer: fine) {
        .nav-cta:hover {
            .icon-mail {
                opacity: 0;
                transform: translateY(-10px);
            }

            .icon-arrow {
                opacity: 1;
                transform: rotate(-45deg) scale(1.35);
            }
        }
    }
}

@media (prefers-reduced-motion: reduce) {
    // keep the swap as a plain crossfade
    .nav-cta .nav-cta-icon img {
        transform: none !important;
    }

    .nav-cta .nav-cta-icon .icon-arrow {
        transform: rotate(-45deg) scale(1.35) !important;
    }

    .role-item {
        animation: none;

        & + & {
            display: none;
        }
    }
}
</style>
