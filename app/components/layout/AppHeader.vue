<template>
    <header class="mt-3 mt-sm-4">
        <div class="gradient"/>
        <nav class="navbar p-0 pt-2" aria-label="Main navigation">
            <div class="container p-sm-0">
                <ul class="navbar-nav flex-row nav-wrapper">
                    <UiLiquidGlass />

                    <li class="nav-item">
                        <NuxtLink to="/about" class="nav-link" active-class="active">About</NuxtLink>
                    </li>

                    <li class="nav-item">
                        <a :href="contactUrl" class="nav-cta d-flex align-items-center rounded-pill text-decoration-none">
                            Contact
                            <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="nav-cta-icon" alt="" aria-hidden="true">
                        </a>
                    </li>
                </ul>

                <NuxtLink to="/" class="navbar-brand d-flex m-0 p-0" aria-label="Home">
                    <UiLiquidGlass />
                    <img src="/img/icons/logo.svg" alt="" width="22" height="22" >
                </NuxtLink>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import connections from '~/data/connections.json'

const contactUrl = connections.find((connection) => connection.url.startsWith('mailto:'))?.url
</script>

<style scoped lang="scss">
header {
    position: sticky;
    top: 1.5rem;
    z-index: 1000;
    width: 100%;

    @include down($bp-sm) {
        position: fixed;
        top: 1rem;
    }
}

.gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    background: linear-gradient(180deg,rgba($dark, 1) 25%, rgba($dark, 0) 100%);
}

.navbar {
    position: relative;
    isolation: isolate;

    .container {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: $spacer;
    }

    .navbar-brand {
        width: 57px;
        height: 57px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: $radius-pill;
        transform: scale(1);
        transition: transform 0.25s ease-in-out;

        @include up($bp-md) {
            &:hover {
                transform: scale(1.2);
                background-color: rgba($white, 0.07);
            }
        }
    }

    .nav-wrapper {
        position: relative;
        // Same inset as above and below, so the button sits close to the pill's edge
        padding-right: $spacer-2;
    }

    .nav-item {
        position: relative;
        z-index: 1;
        display: flex;

        // The pill is the only primary action: it fills the pill's height as an end cap, in the light button style of the hero
        .nav-cta {
            gap: $spacer-3;
            padding: .375rem $spacer-4;
            color: $dark;
            background-color: $gray-100;
            transition: background-color 220ms ease-in-out;

            &:hover {
                background-color: $white;
            }
        }

        .nav-cta-icon {
            filter: brightness(0);
            opacity: 0.7;
            transform: scale(1.35);
            transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        // Same arrow motion as the other buttons
        @include up($bp-sm) {
            .nav-cta:hover .nav-cta-icon {
                transform: scale(1.35) rotate(45deg);
            }
        }

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
                font-weight: $font-weight-regular;
            }
        }
    }
}
</style>