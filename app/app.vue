<template>
    <main>
        <NuxtPage />
    </main>
    <footer class="site-footer">
        <div class="container p-0">
            <p class="m-0"><span>v{{ year }}</span> – Made by Andrea Salvalaggio</p>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
.site-footer {
    margin-top: $spacer-6;
    padding: $spacer-0 $spacer-4 $spacer-4;

    p {
        padding-top: $spacer-3;
        font-size: $font-size-tinyer;
        border-top: 1px solid $gray-800;
    }

    span {
        font-family: $font-mono;
    }
}
</style>
