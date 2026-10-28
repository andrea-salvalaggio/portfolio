<template>
    <div ref="root" class="glare-wrap" @mousemove="move" @mouseenter="enter" @mouseleave="leave">
        <slot />
    </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)

let rect: DOMRect | null = null
let frame = 0
let pointerX = 0
let pointerY = 0

const update = () => {
    frame = 0
    const el = root.value
    if (!el) return

    rect ??= el.getBoundingClientRect()

    el.style.setProperty('--gx', `${((pointerX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--gy', `${((pointerY - rect.top) / rect.height) * 100}%`)
}

// The cached rect is stale after a scroll
const invalidateRect = () => {
    rect = null
}

const move = (e: MouseEvent) => {
    pointerX = e.clientX
    pointerY = e.clientY

    if (!frame) frame = requestAnimationFrame(update)
}

const enter = () => {
    rect = root.value?.getBoundingClientRect() ?? null
    window.addEventListener('scroll', invalidateRect, { passive: true })
    root.value?.classList.add('is-hover')
}

const leave = () => {
    cancelAnimationFrame(frame)
    frame = 0
    window.removeEventListener('scroll', invalidateRect)
    root.value?.classList.remove('is-hover')
}

onBeforeUnmount(leave)
</script>

<style lang="scss">
@include down($bp-sm) {
    .glare-wrap {
        &:not(:first-child) {
            margin-top: $spacer;
        }
    }
}

@include up($bp-sm) {
    .glare-wrap {
        position: relative;
        display: inline-block;
        overflow: clip;
        border-radius: $radius-5;
        
        &:not(:first-child) {
            margin-top: $spacer-3;
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
            background:
                radial-gradient(circle 180px at var(--gx, 50%) var(--gy, 50%),
                    rgba(255, 255, 255, .16),
                    rgba(255, 255, 255, .06) 35%,
                    rgba(255, 255, 255, .02) 65%,
                    transparent 85%),
                radial-gradient(circle 500px at var(--gx, 50%) var(--gy, 50%),
                    rgba(255, 255, 255, .06),
                    rgba(255, 255, 255, .02) 50%,
                    transparent 85%);

            transition: opacity .25s ease;
        }
    }

    // Lit 1px edge that follows the cursor, same look as the buttons
    .glare-wrap::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 2;
        padding: 1px;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(circle 220px at var(--gx, 50%) var(--gy, 50%), rgba($white, .45), transparent 70%);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
        transition: opacity .25s ease;
    }

    .glare-wrap.is-hover {
        &::before,
        &::after {
            opacity: 1;
        }
    }
}
</style>