<template>
    <section class="error-section">
        <div class="container p-0">
            <h1 class="error-title fw-medium">404</h1>
            <p class="mb-4">
                Ops! The page you are looking for doesn't exist <font-awesome-icon :icon="['fas', 'face-frown']"/> <br>
                Please check the URL or return to the homepage.
            </p>
            <NuxtLink to="/">Return home</NuxtLink>
        </div>
    </section>
</template>

<style scoped lang="scss">
.error-title {
    font-family: $font-mono;

    @include down($bp-sm) {
        font-size: $font-size-big;
    }
}

p {
    line-height: $line-height-base;
}
</style>