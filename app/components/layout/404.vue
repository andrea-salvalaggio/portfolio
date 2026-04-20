<template>
    <section class="error-section">
        <div class="container p-0">
            <div class="col-12">
                <h1 class="error-title fw-bold">404</h1>
                <p class="mb-4">
                    Ops! The page you are looking for does not exist <font-awesome-icon :icon="['fas', 'face-frown']" class="ms-1"/> <br>
                    Please check the URL or return to the homepage.
                </p>
                <NuxtLink to="/">Return home</NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@import "bootstrap/scss/bootstrap";

.error-title {
    @include media-breakpoint-down(sm) {
        font-size: $font-size-big;
    }
}

a {
    color: $dark
}
</style>