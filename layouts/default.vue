<template>
    <div>
        <Sprite />
        <Loading v-if="loading" />
        <Nuxt />
        <Navigation />
    </div>
</template>

<script>
    export default {
        data: () => ({

        }),
        mounted() {

        }
    }
</script>
