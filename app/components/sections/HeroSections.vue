<template>
    <div class="hero-section mt-9">
        <div class="container p-3">
            <div class="row">
                <div class="col col-md-2">
                    <img src="@/assets/img/profile-light.png" class="img-fluid rounded-circle" alt="Profile picture">
                </div>
                <div class="col col-md-9">
                    <h1 class="hero-title fw-bold mb-3">Hey! I’m Andrea</h1>
                    <p class="hero-description mb-4">
                        Web & Frontend Designer based in Padua, Italy
                        with a design-first mindset. I focus on building intuitive, responsive,
                        combining aesthetics with clean and maintainable code.
                    </p>
                    <div class="hero-links d-flex">
                        <a href="#" class="btn-link">GitHub</a>
                        <a href="#" class="btn-link mx-3">LinkedIn</a>
                        <a href="#" class="btn-link">Email</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.hero-section {
    margin-top: $spacer-8;

    .hero-title {
        font-size: $font-size-big;
    }

    .hero-description {
        font-size: 18px;
    }

    .hero-links {
        .btn-link {
            color: $dark;
            background-color: $gray-100;
            padding: $spacer-1 1.25rem;
            border-radius: $radius-pill;
            text-decoration: none;
        }
    }
}
</style>