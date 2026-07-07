<template>
    <div ref="root" class="glare-wrap" @mousemove="move" @mouseenter="enter" @mouseleave="leave">
        <slot />
    </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)

const move = (e: MouseEvent) => {
    const el = root.value
    if (!el) return

    const rect = el.getBoundingClientRect()

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    el.style.setProperty('--gx', `${x}%`)
    el.style.setProperty('--gy', `${y}%`)
}

const enter = () => {
    root.value?.classList.add('is-hover')
}

const leave = () => {
    root.value?.classList.remove('is-hover')
}
</script>

<style lang="scss">
@media (min-width: 576px) {
    .glare-wrap {
        position: relative;
        display: inline-block;
        overflow: clip;
        border-radius: $radius-1;
        
        &:not(:first-child) {
            margin-top: $spacer-1;
        }

        img {
            display: block;
            width: 100%;
            position: relative;
            z-index: 1;
        }
    }

    .glare-wrap {
        &::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0;
            mix-blend-mode: screen;
            background:
                radial-gradient(circle 180px at var(--gx, 50%) var(--gy, 50%),
                    rgba(255, 255, 255, .16),
                    rgba(255, 255, 255, .06) 35%,
                    rgba(255, 255, 255, .02) 65%,
                    transparent 85%),
                radial-gradient(circle 360px at var(--gx, 50%) var(--gy, 50%),
                    rgba(255, 255, 255, .08),
                    rgba(255, 255, 255, .03) 45%,
                    transparent 80%),
                radial-gradient(circle 600px at var(--gx, 50%) var(--gy, 50%),
                    rgba(255, 255, 255, .035),
                    transparent 85%),
                radial-gradient(circle 900px at var(--gx, 50%) var(--gy, 50%),
                    rgba(255, 255, 255, .015),
                    transparent 90%);
        
            transition: opacity .25s ease;
        }
    }

    .glare-wrap.is-hover {
        &::after {
            opacity: 1;
        }
    }
}
</style>