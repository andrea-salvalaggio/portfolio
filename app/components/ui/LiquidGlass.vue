<template>
    <div class="liquid-glass">
        <svg class="liquid-glass__filters" aria-hidden="true">
            <defs>
                <filter id="liquid-glass-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.025" numOctaves="2" seed="8" result="noise" />

                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R"
                        yChannelSelector="G" />
                </filter>
            </defs>
        </svg>

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

.liquid-glass__filters {
    position: absolute;
    width: 0;
    height: 0;
}

.liquid-glass__surface {
    position: absolute;
    inset: 0;
    border: 1px solid rgba($white, 0.12);
    border-radius: inherit;
    background: rgba($white, 0.05);
    backdrop-filter:
        url("#liquid-glass-filter") blur(3px) saturate(150%);

    -webkit-backdrop-filter:
        blur(3px) saturate(150%);

    box-shadow:
        inset 0 1px 0 rgba($white, 0.16),
        inset 0 -1px 0 rgba($black, 0.08),
        0 8px 30px rgba($black, 0.15);
}
</style>