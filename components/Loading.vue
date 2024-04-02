<template>
    <div class="loading">
        <div>
            <span class="relative flex h-3 w-3 mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-600 opacity-75"></span>
                <span class="animate-ping delay-75 relative inline-flex rounded-full h-3 w-3 bg-bg-gray-500"></span>
            </span>
            <p>Fetching data...</p>
        </div>
        <div class="overlay">
        </div>
    </div>
</template>

<style>
    .loading {
        @apply fixed h-full w-full inset-0 flex items-center justify-center;
        z-index: 1001;

        > div:first-child {
            @apply z-20 flex items-center font-bold bg-white p-12 rounded-xl shadow-lg;
        }

        .overlay {
            @apply absolute inset-0 h-full w-full bg-white/50;
        }
    }
</style>
