<template>
    <div class="py-12">
        <h1 v-if="title != null" class="text-2xl font-bold">{{ title }}</h1>
    </div>
</template>


<script>
    export default {
        props: [
          'title'
        ]
    }
</script>
