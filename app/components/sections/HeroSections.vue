<template>
    <section class="hero-section reveal">
        <div class="container p-0">
            <div class="row g-md-0">
                <div class="col-12 mb-4">
                    <img src="/img/profile.png" width="75" height="75" class="img-fluid rounded-circle img-profile"
                        alt="Profile picture" fetchpriority="high">
                </div>
                <div class="col-12 col-md-10">
                    <h1 class="hero-title fw-bold mb-3">Hey! I’m Andrea</h1>
                    <p class="hero-description mb-4">
                        Web & Frontend Designer based in Padua, Italy
                        with a design-first mindset. I focus on building intuitive, responsive,
                        combining aesthetics with clean and maintainable code.
                    </p>
                    <div class="hero-links d-md-flex">
                        <div class="flex-wrap row gx-1 gx-sm-2">
                            <a href="https://drive.google.com/file/d/1IKwbs_N8WZrnHX9v3Jl8cWi9HPtqZgAC/view?usp=sharing"
                                class="btn-link" target="_blank" aria-label="Download CV">
                                Download CV <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon"
                                    alt="Arrow" />
                            </a>
                            <a href="mailto:andrea.salvalaggio95@gmail.com" class="btn-link mx-md-3"
                                aria-label="Contact me">
                                Contact me <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon"
                                    alt="Arrow" />
                            </a>
                            <a href="https://linkedin.com/in/andrea-salvalaggio" class="btn-link" target="_blank"
                                aria-label="LinkedIn">
                                LinkedIn <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon" alt="Arrow" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
useReveal()
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use "@/assets/scss/mixins/buttons" as *;

@include link-hover-fade(".hero-links");

.hero-title {
    position: relative;
    display: inline-block;
    font-size: $font-size-biggest;
    width: 11ch;
    white-space: nowrap;
    overflow: hidden;
    animation: type 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        width: 2px;
        height: 1em;
        background-color: $gray-300;
        transform: translateY(-50%);
        animation:
            cursor-blink 0.8s ease-in-out infinite,
            cursor-hide 0s 1.8s forwards;
    }

    @media(max-width: 576px) {
        font-size: 2.75rem;
    }

    @keyframes type {
        from {
            width: 0;
        }

        to {
            width: 11ch;
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
        
        @media (max-width: 768px) {
            width: 100%;
            justify-content: space-between;
            padding: $spacer $spacer-4;
            margin-bottom: $spacer;
        }
    }
}

.img-profile {
    border: 1px solid $gray-800;
}

@media (max-width: 768px) {
    .img-profile {
        width: 90px;
        height: 90px;
        margin-bottom: $spacer;
    }
}
</style>