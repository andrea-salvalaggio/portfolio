<template>
    <div class="experience-row" :class="{ 'experience-row--current': experience.current }">
        <span class="experience-version">{{ version }}</span>
        <div class="experience-head">
            <h3 class="experience-title m-0">{{ experience.role }}</h3>
            <p class="experience-company m-0">{{ experience.company }}</p>
        </div>
        <div class="experience-meta d-flex align-items-center">
            <span class="experience-period">{{ experience.period }}</span>
            <span v-if="experience.current" class="experience-current">
                <span class="live-dot" aria-hidden="true" />Now
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    experience: {
        type: Object,
        required: true
    },
    // Newest first, so the latest role is the highest version
    version: {
        type: String,
        required: true
    }
})
</script>

<style scoped lang="scss">
.experience-row {
    display: grid;
    grid-template-columns: 4.5rem 1fr auto;
    align-items: center;
    gap: $spacer;
    padding: $spacer;

    @include down($bp-sm) {
        grid-template-columns: 3.5rem 1fr;

        .experience-meta {
            grid-column: 2;
        }
    }

    @include down($bp-compact) {
        grid-template-columns: 1fr;
        gap: $spacer-2;

        .experience-meta {
            grid-column: 1;
            margin-top: $spacer-1;
        }
    }
}

.experience-version,
.experience-period,
.experience-current {
    font-family: $font-mono;
    font-size: 14px;
    line-height: 20px;
}

.experience-version {
    justify-self: start;
    padding: $spacer-0 $spacer-1;
    color: $light;
    border: 1px solid $gray-700;
    border-radius: $radius-1;
    background-color: $gray-950;
}

.experience-row--current {
    padding-block: $spacer-4;
}

.experience-title {
    @include serif-wide;

    font-family: $font-serif;
    font-size: 21px;
    font-weight: $font-weight-regular;
    line-height: 24px;
    letter-spacing: 0.01em;
    color: $primary;
}

.experience-company {
    font-size: 16px;
    line-height: 24px;
}

.experience-meta {
    gap: $spacer-2;
}

.experience-period {
    color: $gray-400;
    white-space: nowrap;
}

.experience-current {
    display: inline-flex;
    align-items: center;
    gap: $spacer-2;
    padding: 2px $spacer-3 2px 10px;
    text-transform: uppercase;
    color: $light;
    border: 1px solid rgba($blue, 0.35);
    border-radius: $radius-pill;
    background-color: rgba($blue, 0.12);
}
</style>
