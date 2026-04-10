<template>
    <button class="btn btn-link nav-link" type="button" @click="toggleTheme">
        <font-awesome-icon :icon="themeIcon" />
    </button>
</template>

<script setup>
import { useDarkMode } from '@/composables/useDarkMode'

const { toggleTheme, themeIcon, themeLabel } = useDarkMode()
</script>