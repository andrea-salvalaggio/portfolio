<template>
    <div class="projects-page p-3 py-5 py-sm-8">
        <div class="container p-0">
            <div class="row">
                <div class="col">
                    <h1 class="h2 fw-bold">Deliveboo</h1>
                    <p>
                        Food delivery web app that allows customers to order food from their favorite restaurant without
                        registration, but entering only the data necessary for delivery (Credit card number, name,
                        address). Restaurateurs can register in the platform and create, modify and delete dishes and
                        see customers orders.
                    </p>
                </div>
            </div>
            <div class="d-flex align-items-center mt-3">
                <img v-if="mounted" :src="profileImg" class="img-fluid rounded-circle img-profile lazyload" alt="Profile picture">
                <div class="flex-grow-1 ms-3">
                    <div class="h6 fw-light m-0">Andrea Salvalaggio</div>
                    <p class="m-0">
                        2022 – <a href="https://github.com/andrea-salvalaggio/laravel-deliveboo" target="_blank" rel="noopener noreferrer" aria-label="Visita project">Visit project</a>
                    </p>
                </div>
            </div>
            <div class="projects-thumb mt-5 mt-sm-9">
                <img src="/img/projects/deliveboo-1.png" alt="Deliveboo project desktop" class="img-fluid rounded-1 lazyload">
                <img src="/img/projects/deliveboo-2.png" alt="Deliveboo project backoffice" class="img-fluid rounded-1 lazyload mt-2">
                <img src="/img/projects/deliveboo-3.png" alt="Deliveboo project mobile" class="img-fluid rounded-1 lazyload mt-2">
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Deliveboo | Andrea Salvalaggio'
})

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

<style lang="scss">
.projects-page {

    .img-profile {
        width: 50px;
        height: 50px;
    }

    .projects-thumb {
        img {
            background-color: $primary;
        }
    }
}
</style>