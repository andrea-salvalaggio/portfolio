<template>
    <section class="hero-section">
        <div class="container p-0">
            <div class="row g-md-0">
                <div class="col-12 mb-4">
                    <div class="hero-avatar">
                        <NuxtImg format="webp" src="/img/profile.png" width="90" height="90" densities="x1 x2" class="img-fluid rounded-circle img-profile"
                            alt="Profile picture" fetchpriority="high" preload />
                        <span class="status-dot" title="Available for new projects">
                            <span class="visually-hidden">Available for new projects</span>
                        </span>
                    </div>
                </div>
                <div class="col-12 col-md-10">
                    <h1 class="hero-title fw-bold mb-3">Hey! I’m Andrea</h1>
                    <p class="hero-description mb-4">
                        Web & Frontend Developer based in Padua, Italy
                        with a design-first mindset. I focus on building intuitive, responsive,
                        combining aesthetics with clean and maintainable code.
                    </p>
                    <div class="hero-links d-md-flex">
                        <div class="flex-wrap row gx-1 gx-sm-2">
                            <a href="mailto:andrea.salvalaggio95@gmail.com" class="btn-link btn-link--primary me-md-3"
                                aria-label="Contact me">
                                Contact me <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon"
                                    alt="" aria-hidden="true">
                            </a>
                            <a href="https://drive.google.com/file/d/1IKwbs_N8WZrnHX9v3Jl8cWi9HPtqZgAC/view?usp=sharing"
                                class="btn-link me-md-3" target="_blank" rel="noopener noreferrer" aria-label="Download CV">
                                Download CV <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon"
                                    alt="" aria-hidden="true">
                            </a>
                            <a href="https://linkedin.com/in/andrea-salvalaggio" class="btn-link" target="_blank" rel="noopener noreferrer"
                                aria-label="LinkedIn">
                                LinkedIn <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon" alt="" aria-hidden="true">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use "@/assets/scss/mixins/buttons" as *;

@include link-hover-fade(".hero-links");

/* Typing: clip-path and transform are composited, unlike an animated width.
   The cursor starts at -2px so its right edge follows the clip-path edge. */
.hero-title {
    position: relative;
    display: inline-block;
    font-size: $font-size-biggest;
    width: 11ch;
    white-space: nowrap;
    animation: type 2.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 2px;
        height: 1em;
        background-color: $gray-300;
        translate: 0 -50%;
        animation:
            cursor-move 2.2s cubic-bezier(0.65, 0, 0.35, 1) forwards,
            cursor-blink 0.8s ease-in-out infinite,
            cursor-hide 0s 1.8s forwards;
    }

    @include down($bp-sm) {
        font-size: 2.75rem;
    }

    @keyframes type {
        from {
            clip-path: inset(0 100% 0 0);
        }

        to {
            clip-path: inset(0 0 0 0);
        }
    }

    @keyframes cursor-move {
        from {
            transform: translateX(-2px);
        }

        to {
            transform: translateX(calc(11ch - 2px));
        }
    }

    @keyframes cursor-blink {
        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0;
        }
    }

    @keyframes cursor-hide {
        to {
            opacity: 0;
        }
    }
}

.hero-description {
    font-size: $font-size-smaller;
}

.hero-links {
    .btn-link {
        width: fit-content;
        display: flex;
        align-items: center;
        color: $light;
        border: 1px solid $gray-800;
        background-color: $gray-900;
        padding: .45rem 1.75rem;
        border-radius: $radius-pill;
        text-decoration: none;
        white-space: nowrap;

        .btn-icon {
            margin-left: $spacer;
            transform: scale(1.35);
        }
        
        @include down($bp-md) {
            width: 100%;
            justify-content: space-between;
            padding: $spacer $spacer-4;
            margin-bottom: $spacer;
        }
    }
}

.hero-links .btn-link--primary {
    color: $dark;
    border-color: $gray-100;
    background-color: $gray-100;

    .btn-icon {
        filter: brightness(0);
        opacity: 0.7;
    }

    &:hover {
        color: $dark;
        background-color: $white;
    }
}

.hero-avatar {
    position: relative;
    display: inline-block;
    line-height: 0;
}

.status-dot {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 18px;
    height: 18px;
    border: 3px solid $dark;
    border-radius: 50%;
    background-color: $green;

    &::after {
        content: "";
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        background-color: $green;
        animation: status-pulse 2s ease-out infinite;
    }
}

@keyframes status-pulse {
    from {
        opacity: 0.6;
        transform: scale(1);
    }

    to {
        opacity: 0;
        transform: scale(2.2);
    }
}

@media (prefers-reduced-motion: reduce) {
    .status-dot::after {
        animation: none;
    }
}

.img-profile {
    border: 1px solid $gray-800;
}

@include down($bp-md) {
    .img-profile {
        width: 90px;
        height: 90px;
    }
}
</style>