<template>
    <div>
        <div class="hamburger" @click="navClick($event)">
            <p></p>
            <p></p>
            <p></p>
        </div>
        <nav class="main-nav">
            <button class="nav-toggle float-right" @click="navClick($event)">X</button>
            <h1 class="text-3xl font-bold">Save Union Street</h1>
            <div class="flex flex-col justify-end items-baseline gap-16 h-full">
                <div class="w-full">
                    <label for="search" class="font-bold">Search Union Street for:</label>
                    <input type="text" class="p-2 mt-1 w-full" id="search" @change="search($event)" name="search" placeholder="search">
                </div>
                <ul>
                    <li><nuxt-link to="/" class="text-2xl font-bold">Occupancy Map</nuxt-link></li>
                    <li>
                        <nuxt-link to="heat-map" class="flex items-center">
                            <svg class="h-5 w-5 cursor-pointer hover:fill-red-700 mr-2" @click="createHeatMap($event)">
                                <use href="#heatmap" />
                            </svg>
                            <span class="text-2xl font-bold">Heat Map</span>
                        </nuxt-link>
                    </li>
                </ul>
                <ul>
                    <li>Generate Report</li>
                    <li><nuxt-link to="report-a-problem">Report A Problem</nuxt-link></li>
                </ul>
                <Buycoffee />
            </div>
        </nav>
    </div>
</template>

<style>
    :root {
        --hamburger-width: 28px;
        --hamburger-height: 6px;
    }

    .main-nav {
        @apply fixed top-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white p-6 transition-all;
        left: -100%;
        z-index: 1001;
    }

    .main-nav.open {
        @apply left-0 transition-all;
    }

    .hamburger {
        @apply fixed top-0 left-0 rounded-full bg-white p-2 ml-14 mt-2;
        z-index: 1001;

        &:hover {
            @apply cursor-pointer;
        }

        > p {
            @apply bg-black rounded;
            width: var(--hamburger-width);
            height: var(--hamburger-height);

            &:not(:last-child) {
                margin-bottom: calc(var(--hamburger-height) / 2);
            }
        }
    }

    input {
        @apply border rounded w-full;
    }
</style>

<script>
    export default {
        methods:{
            navClick($event) {
                const nav = document.querySelector('.main-nav');

                nav.classList.toggle('open');
            },
            search($event) {
                this.$root.$refs.index.search($event);
            }
        }
    }
</script>
