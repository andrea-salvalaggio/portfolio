<template>
    <section class="hero-section">
        <div class="container p-0">
            <div class="row">
                <div class="col-12 col-md-2">
                    <img v-if="mounted" :src="profileImg" class="img-fluid rounded-circle img-profile lazyload" alt="Profile picture">
                </div>
                <div class="col-12 col-md-9">
                    <h1 class="hero-title fw-bold mb-3">Hey! I’m Andrea</h1>
                    <p class="hero-description mb-4">
                        Web & Frontend Designer based in Padua, Italy
                        with a design-first mindset. I focus on building intuitive, responsive,
                        combining aesthetics with clean and maintainable code.
                    </p>
                    <div class="hero-links d-flex flex-wrap">
                        <a href="https://drive.google.com/file/d/1DX-yTtHCVmeSe1dJYeU8f3gXjvwp4_KL/view?usp=sharing" class="btn-link" target="_blank" aria-label="Download CV">
                            Download CV <img src="/img/icons/arrow-top-right.svg" class="btn-icon lazyload" alt="Arrow" />
                        </a>
                        <a href="mailto:andrea.salvalaggio95@gmail.com" class="btn-link mx-2 mx-md-3" aria-label="Contact me">
                            Contact me <img src="/img/icons/arrow-top-right.svg" class="btn-icon lazyload" alt="Arrow" />
                        </a>
                        <a href="https://linkedin.com/in/andrea-salvalaggio" class="btn-link" target="_blank" aria-label="LinkedIn">
                            LinkedIn <img src="/img/icons/arrow-top-right.svg" class="btn-icon lazyload" alt="Arrow" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const { isDark } = useDarkMode()

const mounted = ref(false)

onMounted(() => {
    mounted.value = true
})

const profileImg = computed(() =>
    isDark.value
        ? '/img/profile-dark.png'
        : '/img/profile-light.png'
)
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.hero-title {
    @media (max-width: 576px) {
        font-size: $font-size-big;
    }
}

.hero-description {
    font-size: 18px;
}

.hero-links {
    .btn-link {
        display: flex;
        align-items: center;
        color: $dark;
        background-color: $gray-100;
        padding: .35rem 1.25rem;
        border-radius: $radius-pill;
        text-decoration: none;
        white-space: nowrap;

        .btn-icon {
            margin-left: $spacer-3;
            transform: scale(1.35);
        }

        @media(max-width: 576px) {
            margin-bottom: $spacer-2;
        }
    }
}

@media(max-width: 768px) {
    .img-profile {
        width: 90px;
        height: 90px;
        margin-bottom: $spacer;
    }
} 
</style>