<template>
    <section id="stack" class="stacks-section page-section">
        <h2 class="section-label reveal reveal--item">Stack</h2>
        <ul class="card-grid">
            <li v-for="stack in stacks" :key="stack.id" class="stack-item d-flex align-items-center reveal reveal--item">
                <span class="stack-icon d-flex align-items-center justify-content-center" :style="{ '--tag-color': stack.color }">
                    <font-awesome-icon :icon="stack.icon" aria-hidden="true" />
                </span>
                <span>
                    <span class="stack-label d-block">{{ stack.label }}</span>
                    <span class="stack-description d-block">{{ stack.description }}</span>
                </span>
            </li>
        </ul>
    </section>
</template>

<script setup>
import stacks from '~/data/stacks.json'
</script>

<style scoped lang="scss">
.stack-item {
    position: relative;
    isolation: isolate;
    gap: $spacer-3;
    padding: $spacer-3;
    border: 1px solid transparent;
    border-radius: $radius-3;
    transition:
        background-color 0.6s ease,
        border-color 0.6s ease,
        opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1) var(--delay, 0ms),
        transform 1s cubic-bezier(0.25, 1, 0.5, 1) var(--delay, 0ms);

    @include up($bp-sm) {
        @media (hover: hover) and (pointer: fine) {
            &::before {
                content: "";
                position: absolute;
                inset: 0;
                z-index: -1;
                border-radius: inherit;
                background: radial-gradient(90% 140% at 0% 50%, color-mix(in srgb, var(--tag-color) 10%, transparent), transparent 70%);
                opacity: 0;
                transition: opacity 0.4s ease;
                pointer-events: none;
            }

            &:hover {
                border-color: $gray-800;
                background-color: $surface;

                &::before {
                    opacity: 1;
                }

                .stack-icon {
                    border-color: color-mix(in srgb, var(--tag-color) 45%, #{$gray-800});
                    box-shadow: 0 0 24px -4px color-mix(in srgb, var(--tag-color) 55%, transparent);
                }
            }
        }
    }

    @include down($bp-sm) {
        gap: 10px;
        min-width: 0;
        padding: $spacer-2;
        border-color: $gray-800;
        border-radius: 10px;
        background-color: $surface;

        .stack-icon {
            width: 32px;
            height: 32px;
            font-size: $font-size-base;
        }

        .stack-label {
            font-size: 15px;
        }

        .stack-description {
            display: none !important;
        }
    }
}

.card-grid {
    @include down($bp-sm) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: $spacer-2;
    }
}

.stack-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    font-size: $font-size-small;
    color: var(--tag-color);
    border: 1px solid $gray-800;
    border-radius: $radius-2;
    background-color: $surface;
    transition: border-color 0.3s ease, box-shadow 0.4s ease;
}

.stack-label {
    font-size: 16px;
    font-weight: $font-weight-medium;
    line-height: 20px;
    color: $light;
}

.stack-description {
    font-size: 15px;
    line-height: 24px;
    color: $gray-400;
}
</style>
