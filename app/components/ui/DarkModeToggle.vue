<template>
    <button class="btn btn-link nav-link" @click="toggleDarkMode" :title="isDark ? 'Light Mode' : 'Dark Mode'">
        <font-awesome-icon :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']" />
    </button>
</template>

<script setup>
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>