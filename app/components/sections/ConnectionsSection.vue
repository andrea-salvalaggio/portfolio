<template>
    <section class="connections-section mt-5 mt-sm-9">
        <div class="container p-0">
            <div class="row">
                <h2 class="h6 fw-light col-12 col-md-3 mb-4 mb-md-0">Connections</h2>
                <div class="col-12 col-md-9 connections-links">
                    <div class="row flex-wrap g-2">
                        <div class="col-12 col-md-6" v-for="connection in connections" :key="connection.id">
                            <UiConnectionsLink :connection="connection" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import connections from '~/data/connections.json'
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;
@include link-hover-fade(".connections-links");
</style>