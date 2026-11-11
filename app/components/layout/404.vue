<template>
    <section class="error-section">
        <div class="container p-0">
            <h1 class="error-title fw-medium" aria-label="404" @pointerenter="onEnter">
                <span aria-hidden="true">
                    <span v-for="(c, i) in chars" :key="i" :class="{ pending: i >= revealed }">{{ c }}</span>
                </span>
            </h1>
            <p class="mb-4">
                Ops! The page you are looking for doesn't exist <font-awesome-icon :icon="['fas', 'face-frown']"/> <br>
                Please check the URL or return to the homepage.
            </p>
            <NuxtLink to="/">Return home</NuxtLink>
        </div>
    </section>
</template>

<script setup>
const { chars, revealed, play } = useScramble('404')

// Replay on mouse hover only: touch taps would restart it for no reason
const onEnter = (e) => {
    if (e.pointerType === 'mouse') play()
}
</script>

<style scoped lang="scss">
.pending {
    opacity: 0.5;
}

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