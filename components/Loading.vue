<template>
    <div class="loading">
        <div>
            <p>Fetching data...</p>
        </div>
    </div>
</template>

<style>
    .loading {
        @apply fixed h-full w-full inset-0 bg-white flex items-center justify-center opacity-75;
        z-index: 1001;

        > div {
            @apply animate-pulse;
        }
    }
</style>
