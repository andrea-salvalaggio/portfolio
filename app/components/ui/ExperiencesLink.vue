<template>
    <div class="experience-row">
        <span class="experience-version">{{ version }}</span>
        <div class="experience-head">
            <h3 class="experience-title m-0">{{ experience.role }}</h3>
            <p class="experience-company m-0">{{ experience.company }}</p>
        </div>
        <div class="experience-meta d-flex align-items-center">
            <span class="experience-period">{{ experience.period }}</span>
            <span v-if="experience.current" class="experience-current">Current</span>
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
    background-color: $gray-900;
}

.experience-title {
    font-size: 16px;
    font-weight: $font-weight-medium;
    line-height: 24px;
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
    padding: $spacer-0 $spacer-2;
    text-transform: uppercase;
    color: $white;
    border-radius: $radius-1;
    background-color: $blue;
}
</style>
