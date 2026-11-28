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
            <span class="nav-cta-ring ms-auto">
                <a :href="contactUrl" class="nav-cta">
                    <img src="/img/icons/mail.svg" width="18" height="18" class="nav-cta-icon" alt="" aria-hidden="true">
                    Email
                </a>
            </span>
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

@property --cta-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: true;
}

.nav-cta-ring {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    flex-shrink: 0;
    border-radius: $radius-2;
    animation: cta-ring 5.5s linear infinite;
    transition: translate 500ms cubic-bezier(0.25, 1, 0.5, 1);

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        background: conic-gradient(from var(--cta-angle), transparent 0deg, transparent 180deg, $blue 280deg, $white 335deg, transparent 360deg);
        filter: blur(12px);
        opacity: 0.95;
    }
}

@keyframes cta-ring {
    to {
        --cta-angle: 360deg;
    }
}

.nav-cta {
    --cta-fill: #{$gray-100};

    color: $dark;
    border: 1.5px solid transparent;
    background:
        linear-gradient(var(--cta-fill), var(--cta-fill)) padding-box,
        conic-gradient(from var(--cta-angle), var(--cta-fill) 0deg, var(--cta-fill) 180deg, $blue 280deg, $white 335deg, var(--cta-fill) 360deg) border-box;
    transition: transform 160ms cubic-bezier(0.25, 1, 0.5, 1);
    -webkit-tap-highlight-color: transparent;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            --cta-fill: #{$white};

            color: $dark;
        }
    }
}

.nav-cta-icon {
    filter: brightness(0);
}

@media (prefers-reduced-motion: reduce) {
    .nav-cta-ring {
        animation: none;
    }

    .role-item {
        animation: none;

        & + & {
            display: none;
        }
    }
}
</style>
