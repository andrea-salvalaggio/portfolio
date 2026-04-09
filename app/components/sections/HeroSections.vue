<template>
    <div class="hero-section mt-9 p-3">
        <div class="container p-0">
            <div class="row">
                <div class="col-12 col-md-2">
                    <img src="@/assets/img/profile-light.png" class="img-fluid rounded-circle img-profile" alt="Profile picture">
                </div>
                <div class="col-12 col-md-9">
                    <h1 class="hero-title fw-bold mb-3">Hey! I’m Andrea</h1>
                    <p class="hero-description mb-4">
                        Web & Frontend Designer based in Padua, Italy
                        with a design-first mindset. I focus on building intuitive, responsive,
                        combining aesthetics with clean and maintainable code.
                    </p>
                    <div class="hero-links d-flex">
                        <a href="#" class="btn-link" target="_blank" aria-label="Download CV">Download CV <ArrowTop class="btn-icon"/></a>
                        <a href="mailto:andrea.salvalaggio95@gmail.com" class="btn-link mx-2 mx-md-3" aria-label="Contact me">Contact me <ArrowTop class="btn-icon"/></a>
                        <a href="https://www.instagram.com/andrea_salvalaggio/" class="btn-link" target="_blank" aria-label="Instagram">Instagram <ArrowTop class="btn-icon"/></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ArrowTop from '@/assets/img/icons/arrow-top-right.svg'
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.hero-section {
    margin-top: $spacer-8; 

    .hero-description {
        font-size: 18px;
    }

    .hero-links {
        .btn-link {
            display: flex;
            align-items: center;
            color: $dark;
            background-color: $gray-100;
            padding: .35rem 1.25rem;
            border-radius: $radius-pill;
            text-decoration: none;
            white-space: nowrap;

            .btn-icon {
                margin-left: $spacer-2;
                transform: scale(1.35);
            }
        }
    }

    @media(max-width: 768px) {
        .img-profile {
            width: 100px;
            height: 100px;
            margin-bottom: $spacer-4;
        }
    } 
}
</style>