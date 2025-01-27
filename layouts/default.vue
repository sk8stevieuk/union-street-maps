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
            loading: false,
            shops: null
        }),
        mounted() {
           this.$nuxt.$on('updateLoading', ($event) => {
               console.log("update loading...");
               this.loading = $event;
           })
        }
    }
</script>

<style>
    form {
        @apply flex flex-col items-baseline w-full gap-4;

        > button {
            @apply bg-black text-white rounded-full px-4 py-2;
        }
    }

    [type='submit'] {
        @apply bg-black;
    }

    fieldset:not(.flex-row):not(.checkbox) {
        @apply flex flex-col;

        &:not(.w-auto) {
            @apply w-full;
        }

        > label {
            order: 1;
            @apply font-bold;
        }

        > small {
            @apply opacity-50;
            order: 2;
        }

        > input:not([type="checkbox"]), textarea, select {
            order: 3;
            @apply border rounded p-2 mt-1;

            &:not(.w-auto) {
                @apply w-full
            }
        }
    }

    input:not(type=[checkbox]):not(:required) + label:after, textarea:not(:required) + label:after, select:not(:required) + label:after {
        content: "(Optional)";
        @apply float-right opacity-50 italic;
    }
</style>
