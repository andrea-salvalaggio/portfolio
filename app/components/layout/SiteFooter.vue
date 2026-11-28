<template>
    <footer class="site-footer">
        <div class="container p-0">
            <div class="footer-row">
                <p class="m-0">© {{ year }} Andrea Salvalaggio</p>
                <p class="footer-clock m-0" :class="{ 'is-ready': time }">
                    <span class="live-dot footer-dot" aria-hidden="true" />
                    <span>Padua, IT</span>
                    <span class="footer-sep" aria-hidden="true" />
                    <time>{{ time || '00:00' }}</time>
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear()

// Padua time, whatever the visitor's zone. Client only: a prerendered time would be stale, so it fades in once known
const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit' })
const time = ref('')
let timer

onMounted(() => {
    const tick = () => { time.value = formatter.format(new Date()) }

    tick()
    timer = setInterval(tick, 10000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped lang="scss">
.site-footer {
    margin-top: $spacer-6;
    padding: $spacer-0 $spacer-4 $spacer-4;

    @include down($bp-compact) {
        padding-inline: $spacer;
    }
}

.footer-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $spacer-2 $spacer;
    padding-top: $spacer-3;
    font-size: $font-size-tinyer;
    border-top: 1px solid $gray-800;
}

.footer-clock {
    display: inline-flex;
    align-items: center;
    gap: $spacer-2;
    font-family: $font-mono;
    font-variant-numeric: tabular-nums;
    opacity: 0;
    transition: opacity 0.4s ease;

    &.is-ready {
        opacity: 1;
    }
}

.footer-dot {
    width: 6px;
    height: 6px;
}

.footer-sep {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: currentColor;
}
</style>
