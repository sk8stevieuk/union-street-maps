<template>
    <div class="loading">
        <div>
            <span class="relative flex h-3 w-3 mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-600 opacity-75"></span>
                <span class="animate-ping delay-75 relative inline-flex rounded-full h-3 w-3 bg-bg-gray-500"></span>
            </span>
            <p>Fetching data...</p>
        </div>
    </div>
</template>

<style>
    .loading {
        @apply fixed h-full w-full inset-0 bg-white/75 flex items-center justify-center;
        z-index: 1001;

        > div {
            @apply flex items-center font-bold;
        }
    }
</style>
