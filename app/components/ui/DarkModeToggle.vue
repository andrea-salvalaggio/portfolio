<template>
    <button v-if="mounted" class="btn-link nav-link" type="button" @click="toggleTheme" aria-label="Dark mode toggle">
        <font-awesome-icon :icon="icon" />
    </button>
</template>

<script setup>
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleTheme } = useDarkMode()

const mounted = ref(false)

onMounted(() => {
    mounted.value = true
})

const icon = computed(() =>
    isDark.value ? ['fas', 'bolt'] : ['fas', 'moon']
)
</script>