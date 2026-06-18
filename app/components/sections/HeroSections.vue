<template>
    <section class="hero-section reveal">
        <div class="container p-0">
            <div class="row flex-row-reverse justify-content-between g-md-0">
                <div class="col-12 col-md-2 text-md-end">
                    <img src="/img/profile.png" width="90" height="90" class="img-fluid rounded-circle img-profile"
                        alt="Profile picture" fetchpriority="high">
                </div>
                <div class="col-12 col-md-9">
                    <h1 class="hero-title fw-bold mb-3">Hey! I’m Andrea</h1>
                    <p class="hero-description mb-4">
                        Web & Frontend Designer based in Padua, Italy
                        with a design-first mindset. I focus on building intuitive, responsive,
                        combining aesthetics with clean and maintainable code.
                    </p>
                    <div class="hero-links d-md-flex">
                        <div class="flex-wrap row gx-1 g-sm-2">
                            <a href="https://drive.google.com/file/d/1DX-yTtHCVmeSe1dJYeU8f3gXjvwp4_KL/view?usp=sharing"
                                class="btn-link" target="_blank" aria-label="Download CV">
                                Download CV <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon"
                                    alt="Arrow" />
                            </a>
                            <a href="mailto:andrea.salvalaggio95@gmail.com" class="btn-link mx-md-2"
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
    @media(max-width: 576px) {
        font-size: $font-size-big;
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
        color: $dark;
        background-color: $gray-100;
        padding: .35rem 1.25rem;
        border-radius: $radius-pill;
        text-decoration: none;
        white-space: nowrap;

        .btn-icon {
            margin-left: $spacer-3;
            transform: scale(1.35);
        }

        @media (max-width: 576px) {
            margin-bottom: $spacer-2;
        }

        @media (max-width: 768px) {
            width: 100%;
            justify-content: space-between;
            border-radius: $radius-1;
            padding: $spacer $spacer-4;
        }
    }
}

@media (max-width: 768px) {
    .img-profile {
        width: 90px;
        height: 90px;
        margin-bottom: $spacer;
    }
}
</style>