<template>
    <div class="experience-content d-flex justify-content-between">
        <div class="d-flex flex-grow-1">
            <img :src="experience.logo" :alt="experience.company" class="experience-logo rounded-pill me-sm-3" />
            <div class="experience-head">
                <div class="h6 experience-title fw-light mb-1">{{ experience.role }}</div>
                <p class="experience-text m-0">{{ experience.company }}</p>
            </div>
        </div>
        <div class="experience-bottom">
            <p class="experience-period m-0 text-end">{{ experience.period }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    experience: {
        type: String,
        required: true
    }
})
</script>

<style scoped lang="scss">
.experience-logo {
    width: 50px;
    height: 50px;
    border: 1px solid $gray-800;
    margin-right: $spacer-3;
}

.experience-content {
    padding-bottom: $spacer-4;
}

.experience-title {
    color: $primary;
}

.experience-text,
.experience-period {
    line-height: normal;
}

@media (max-width: 576px) {
    .experience-content {
        flex-wrap: wrap;
        flex-grow: 0;
        padding-bottom: $spacer-5;
    }

    .experience-bottom {
        margin-left: 3.75rem;
        margin-top: 0.75rem;

        .experience-period {
            color: $gray-400;
            background-color: rgba($white, 0.1);
            border-radius: $radius-pill;
            padding: .25rem 1rem;
        }
    }
}
</style>
