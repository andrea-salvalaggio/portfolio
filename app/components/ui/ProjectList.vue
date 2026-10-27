<template>
    <div class="project-list">
        <ul class="project-items" @mouseleave="hide">
            <li v-for="(project, i) in projects" :key="project.id" class="project-item">
                <component :is="isExternal(project.url) ? 'a' : NuxtLink" v-bind="linkProps(project)"
                    class="project-link" @mouseenter="onEnter(i, $event)" @focus="onFocus(i, $event)" @blur="hide">
                    <h3 class="project-title">
                        {{ project.title }}
                        <span v-if="isExternal(project.url)" class="visually-hidden">(opens in a new tab)</span>
                    </h3>
                    <img src="/img/icons/arrow-top-right.svg" width="12" height="12" class="project-arrow" alt=""
                        aria-hidden="true">
                </component>
            </li>
        </ul>

        <!-- Teleported: a transformed ancestor (.reveal) would break position: fixed -->
        <ClientOnly>
            <Teleport to="body">
                <div ref="previewRef" class="project-preview" aria-hidden="true">
                    <div class="preview-tilt">
                        <div class="preview-card" :class="{ 'is-visible': activeIndex !== null }"
                            :style="{ '--accent': activeProject?.accent }">
                            <NuxtImg v-for="(project, i) in projects" :key="project.id" format="webp"
                                :src="project.image" alt="" width="680" height="408" decoding="async"
                                class="preview-image" :class="{ 'is-active': i === activeIndex }" />
                        </div>
                    </div>
                </div>
            </Teleport>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

interface Project {
    id: number
    title: string
    image: string
    url: string
    target?: string
    accent?: string
}

const props = defineProps<{ projects: Project[] }>()

const previewRef = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(null)
const activeProject = computed(() => activeIndex.value === null ? null : props.projects[activeIndex.value])

const isExternal = (url: string) => /^(https?:)?\/\//.test(url)

const linkProps = (project: Project) => isExternal(project.url)
    ? { href: project.url, target: project.target, rel: 'noopener noreferrer' }
    : { to: project.url }

/* The preview only exists for mouse users on wider screens (same breakpoint as $bp-sm) */
const canHover = () => window.matchMedia('(min-width: 576px) and (hover: hover) and (pointer: fine)').matches
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let targetX = 0
let targetY = 0
let x = 0
let y = 0
let frame = 0

const render = () => {
    frame = 0

    const reduced = prefersReducedMotion()
    const ease = reduced ? 1 : 0.14
    const dx = targetX - x
    const dy = targetY - y

    x += dx * ease
    y += dy * ease

    // Lean into the horizontal movement, then settle back
    const tilt = reduced ? 0 : Math.max(-8, Math.min(8, dx * 0.08))

    if (previewRef.value) {
        previewRef.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
        previewRef.value.style.setProperty('--tilt', `${tilt}deg`)
    }

    if (activeIndex.value !== null || Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        frame = requestAnimationFrame(render)
    }
}

const start = () => {
    if (!frame) frame = requestAnimationFrame(render)
}

const follow = (e: MouseEvent) => {
    // Nothing to move while the preview is hidden; reveal() snaps it to the cursor
    if (activeIndex.value === null) return

    targetX = e.clientX
    targetY = e.clientY
    start()
}

const reveal = (i: number, cx: number, cy: number) => {
    targetX = cx
    targetY = cy

    // First appearance: start at the cursor instead of flying in from the last position
    if (activeIndex.value === null) {
        x = cx
        y = cy
    }

    activeIndex.value = i
    start()
}

const onEnter = (i: number, e: MouseEvent) => {
    if (canHover()) reveal(i, e.clientX, e.clientY)
}

const onFocus = (i: number, e: FocusEvent) => {
    const el = e.currentTarget as HTMLElement

    // Keyboard focus only; mouse users are handled by hover
    if (!canHover() || !el.matches(':focus-visible')) return

    const rect = el.getBoundingClientRect()
    reveal(i, rect.left + rect.width * 0.7, rect.top + rect.height / 2)
}

const hide = () => {
    activeIndex.value = null
}

onMounted(() => window.addEventListener('mousemove', follow, { passive: true }))

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', follow)
    cancelAnimationFrame(frame)
})
</script>

<style scoped lang="scss">
.project-items {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid $gray-800;
}

.project-item {
    border-bottom: 1px solid $gray-800;
    transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.project-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacer-4;
    padding: $spacer 0;
    color: $primary;
    text-decoration: none;
}

.project-title {
    margin: 0;
    font-size: $font-size-small;
    font-weight: $font-weight-medium;
    line-height: $line-height-small;
    color: $light;
}

.project-arrow {
    flex-shrink: 0;
    opacity: 0.6;
}

.project-preview {
    display: none;
}

@include up($bp-sm) {
    .project-title {
        font-size: $font-size-medium;
    }

    .project-link {
        padding: $spacer-4 0;
    }
}

@media (hover: hover) and (pointer: fine) {
    @include up($bp-sm) {
        .project-items:hover .project-item:not(:hover):not(:focus-within) {
            opacity: 0.3;
        }

        .project-arrow {
            transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
        }

        .project-link:hover .project-arrow,
        .project-link:focus-visible .project-arrow {
            opacity: 1;
            transform: rotate(45deg);
        }

        .project-preview {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 20;
            display: block;
            width: 0;
            height: 0;
            pointer-events: none;
            will-change: transform;
        }

        .preview-tilt {
            position: absolute;
            transform: translate(-50%, -50%) rotate(var(--tilt, 0deg));
        }

        .preview-card {
            position: relative;
            width: 340px;
            aspect-ratio: 5 / 3;
            overflow: clip;
            border: 1px solid $gray-800;
            border-radius: $radius-4;
            background-color: $gray-900;
            opacity: 0;
            transform: scale(0.9);
            transition:
                opacity 0.3s ease,
                transform 0.45s cubic-bezier(0.25, 1, 0.5, 1),
                box-shadow 0.4s ease;

            &.is-visible {
                opacity: 1;
                transform: scale(1);
                box-shadow:
                    0 0 2.5rem 0 color-mix(in srgb, var(--accent, transparent) 45%, transparent),
                    0 0 6rem 1rem color-mix(in srgb, var(--accent, transparent) 30%, transparent),
                    0 0 12rem 3rem color-mix(in srgb, var(--accent, transparent) 18%, transparent);
            }
        }

        .preview-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 0.35s ease;

            &.is-active {
                opacity: 1;
            }
        }
    }
}
</style>
