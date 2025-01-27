<template>
    <div>
        <div class="hamburger" @click="navClick($event)">
            <p></p>
            <p></p>
            <p></p>
        </div>
        <nav class="main-nav">
            <button class="nav-toggle float-right" @click="navClick($event)">
                <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6">
                    <use href="#cross" />
                </svg>
            </button>
            <h1 class="text-3xl font-bold">Save Union Street</h1>
            <div class="flex flex-col justify-end items-baseline gap-16 pb-8 h-full">
                <div class="w-full">
                    <label for="search" class="font-bold">Search Union Street for:</label>
                    <input type="text" class="p-2 mt-1 w-full" id="search" @change="search($event)" name="search" placeholder="search">
                </div>
                <ul>
                    <li @click="navClick($event)">
                        <nuxt-link to="/">
                            <span>Occupancy Map</span>
                            <svg>
                                <use href="#arrow-right" />
                            </svg>
                        </nuxt-link>
                    </li>
                    <!-- <li @click="navClick($event)">
                        <nuxt-link to="heat-map" class="flex items-center">
                            <svg class="h-5 w-5 cursor-pointer hover:fill-red-700 mr-2" @click="createHeatMap($event)">
                                <use href="#heatmap" />
                            </svg>
                            <span class="text-2xl font-bold">Heat Map</span>
                        </nuxt-link>
                    </li> -->
                    <li @click="navClick($event)">
                        <nuxt-link to="stores">
                            <span>Stores List</span>
                            <svg>
                                <use href="#arrow-right" />
                            </svg>
                        </nuxt-link>
                    </li>
                </ul>
                <ul>
                    <li @click="navClick($event)"><nuxt-link to="report">Generate Report</nuxt-link></li>
                    <li @click="navClick($event)"><nuxt-link to="report-a-problem">Report A Problem</nuxt-link></li>
                </ul>
                <Buycoffee />
            </div>
        </nav>
    </div>
</template>

<style>
    :root {
        --hamburger-width: 24px;
        --hamburger-height: 4px;
    }

    .main-nav {
        @apply fixed top-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white p-6 shadow-xl transition-all;
        left: -100%;
        z-index: 1001;

        ul:first-of-type {
            li {
                @apply text-2xl font-bold;

                a {
                    @apply relative left-0 transition-all;
                }

                svg {
                    @apply h-5 w-5 cursor-pointer inline opacity-0 transition-all;
                }

                &:hover {
                    a {
                        @apply left-1;
                    }

                    svg {
                        @apply opacity-100;
                    }
                }
            }
        }
    }

    .main-nav.open {
        @apply left-0 transition-all;
    }

    .hamburger {
        @apply fixed top-0 right-0 rounded-full bg-white p-2 m-4 shadow-xl;
        z-index: 1001;

        &:hover {
            @apply cursor-pointer;
        }

        > p {
            @apply bg-black rounded;
            width: var(--hamburger-width);
            height: var(--hamburger-height);

            &:not(:last-child) {
                margin-bottom: calc(var(--hamburger-height) / 1.25);
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
                console.log("toggle map");

                nav.classList.toggle('open');
            },
            search($event) {
                this.$root.$refs.index.search($event);
            }
        }
    }
</script>
