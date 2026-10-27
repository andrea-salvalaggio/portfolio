<template>
    <div class="liquid-glass">
        <div class="liquid-glass__surface"></div>
    </div>
</template>

<style scoped lang="scss">
.liquid-glass {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
}

.liquid-glass__surface {
    position: absolute;
    inset: 0;
    border: 1px solid rgba($white, 0.12);
    border-radius: inherit;
    background: linear-gradient(135deg,
            rgba($dark, 0.82) 0%,
            rgba($dark, 0.68) 50%,
            rgba($dark, 0.78) 100%);
    -webkit-backdrop-filter: blur(3px) saturate(150%);
    backdrop-filter: blur(3px) saturate(150%);
    box-shadow:
        inset 0 1px 0 rgba($white, 0.16),
        inset 0 -1px 0 rgba($black, 0.08),
        0 8px 30px rgba($black, 0.2);
}
</style>
