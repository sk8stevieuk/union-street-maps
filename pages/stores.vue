<template>
    <section class="container mx-auto px-12">
        <Header :title="'Stores'" />
        <div v-if="showError" class="error">
            <svg class="fill-current h-5 w-5">
                <use href="#alert" />
            </svg>
            <p>{{ errorMessage }}</p>
        </div>
        <form class="flex flex-row items-center justify-end gap-4 mb-8 flex-wrap-reverse">
            <fieldset class="checkbox flex">
                <input type="checkbox" id="local-checkbox" name="local" class="w-auto mr-1" @change="filterList($event)">
                <label for="local-checkbox">Local only?</label>
            </fieldset>
            <fieldset class="w-auto">
                <label for="filter-search" class="sr-only">Search</label>
                <input type="text" id="filter-search" name="search" class="w-auto mr-1" placeholder="Search stores" @keyup="filterList($event)">
            </fieldset>
            <fieldset class="w-auto">
                <label for="filter-category" class="sr-only">Filter by category</label>
                <!-- <datalist id="test">
                    <select v-for="topLevelItem in topLevelTags" :label="topLevelItem.name">
                        <option v-if="tag.level != 1 && tag.parent == topLevelItem.id" v-for="tag in tagsRaw" :value="tag.id">{{ tag.name }}</option>
                    </select>
                </datalist>
                <input type="text" @change="filterList($event)" list="test"> -->
                <select id="filter-category" @change="filterList($event)" class="w-auto">
                    <option disabled selected value="null">Filter by category</option>
                    <option value="">All</option>
                    <optgroup v-for="topLevelItem in topLevelTags" :label="topLevelItem.name">
                        <option v-if="tag.level != 1 && tag.parent == topLevelItem.id" v-for="tag in tagsRaw" :value="tag.id">{{ tag.name }}</option>
                    </optgroup>
                    <option v-if="tag.level != 1 && tag.parent == null" v-for="tag in tagsRaw" :value="tag.id">{{ tag.name }}</option>
                </select>
            </fieldset>
        </form>
        <ul class="shop-list">
            <li v-for="shop in shops">
                <a href="#">
                    <img v-if="shop.Image != null" :src="shop.Image" :alt="shop.Title" loading="lazy">
                    <img v-else src="https://placehold.co/500x500" alt="placeholder image" loading="lazy">
                    <div class="card-content">
                        <div>
                            <h3>{{ shop.Title }}</h3>
                            <span class="text-gray-500 text-sm">{{ shop.Number }} Union Street, Aberdeen</span>
                        </div>
                        <p>{{ shop.Description }}</p>
                        <div class="tags">
                            <p v-for="(tag, tagIndex) in shop.Tags" class="pill">{{ tags[tag] }}</p>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </section>
</template>

<style>
    .shop-list {
        @apply grid grid-cols-1 gap-8;

        li {
            a {
                @apply flex flex-col gap-4 overflow-hidden shadow-md;

                .card-content {
                    @apply flex flex-col gap-4 p-4;
                }

                h3 {
                    @apply font-bold text-xl;
                }

                img {
                    @apply aspect-square object-contain;
                }

                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;
                }

                &:hover {
                    @apply shadow-xl;
                }
            }
        }

        @screen md {
            @apply grid-cols-3;
        }

        @screen lg {
            @apply grid-cols-4;
        }
    }

    .tags {
        @apply flex flex-row gap-2;
        flex-flow: wrap;
    }

    .pill {
        @apply border border-primary-500 text-primary-500 px-4 py-2 rounded-md text-sm;
    }

    .error {
        @apply bg-red-200 border border-red-700 text-red-700 p-4 mb-4 rounded-md flex items-center;
    }
</style>

<script>
    export default {
        data: () => ({
            allShops: null,
            shops: null,
            tagsRaw: null,
            tags: null,
            topLevelTags: null,
            showError: false,
            errorMessage: "Generic error: Unknown problem."
        }),
        methods:{
            filterList(e) {
                let filter = document.querySelector("#filter-category").value;
                let local = document.querySelector("#local-checkbox").checked;
                let search = document.querySelector("#filter-search").value;

                let shops = this.allShops;
                let filteredShops = [];

                if( filter != "" && filter != "null" ) {
                    shops.forEach((shop) => {
                        let tags = shop.Tags;

                        if( tags.includes(filter) ) {
                            if( local == true && shop.Local != true ) {
                                //Do nothing
                            } else {
                                filteredShops.push(shop);
                            }
                        }
                    });

                    this.shops = filteredShops;

                    if( filteredShops.length < 1 ) {
                        this.showError = true;
                        this.errorMessage = "Couldn't find anything with your chosen filter, please try again with another filter.";
                    } else {
                        this.showError = false;
                    }
                } else {
                    this.showError = false;

                    if( local == true ) {
                        shops.forEach((shop) => {
                            if( shop.Local ) {
                                filteredShops.push(shop);
                            }
                        });

                        this.shops = filteredShops;
                    } else {
                        filteredShops = this.allShops;
                        this.shops = this.allShops;
                    }
                }

                if( search != null && search.length > 0 ) {
                    String.prototype.fuzzy = function (s) {
                        var hay = this.toLowerCase(), i = 0, n = -1, l;
                        s = s.toLowerCase();
                        for (; l = s[i++] ;) if(!~(n = hay.indexOf(l, n + 1))) return false;
                        return true;
                    };

                    let searchedArray = [];

                    filteredShops.forEach((shop) => {
                        let title = shop.Title.toLowerCase();

                        if( title.fuzzy(search.toLowerCase()) ) {
                            searchedArray.push(shop);
                        }
                    });

                    this.shops = searchedArray;
                }
            }
        },
        mounted() {
            //Get stores form local storage
            let data = localStorage.getItem('shops');
            let tags = localStorage.getItem('tags');

            if( data != null ) {
                this.allShops = JSON.parse(data);
                this.shops = JSON.parse(data);
            }

            if( tags != null ) {
                tags = JSON.parse(tags);
                this.tagsRaw = tags;

                let tagArray = [];
                let topLevelTags = [];

                tags.forEach((tag) => {
                    tagArray[tag.id] = tag.name;

                    if( tag.level == 1 ) {
                        topLevelTags.push(tag);
                    }
                });

                this.tags = tagArray;
                this.topLevelTags = topLevelTags;
            }
        },
        async created() {

        }
    }
</script>
