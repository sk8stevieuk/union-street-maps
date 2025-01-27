<template>
    <section class="container mx-auto flex flex-col gap-12">
        <Header :title="'Union Street Report'" />
        <ul class="flex flex-col gap-4">
            <li v-for="detail in details">
                <h3 class="font-bold">{{ detail.title }}</h3>
                <p>{{ detail.value }}</p>
            </li>
        </ul>
        <div>
            <header class="mb-4">
                <h3 class="text-xl">Ideal High Street
                </h3>
                <h4>According to you.gov poll <small class="ml-1 opacity-50"><a href="https://yougov.co.uk/consumer/articles/20984-heres-what-britains-ideal-high-street-looks">(Source)</a></small></h4>
            </header>
            <ul class="grid-boxes">
                <li>Bank</li>
                <li>Post Office</li>
                <li>Pharmacy</li>
                <li>Restaurant/Cafe</li>
                <li>Clothes Shop</li>
                <li>Newsagent</li>
                <li>Homeware Shop</li>
                <li>Barber/Hairdresser</li>
                <li>Book Shop</li>
                <li>Coffee Shop</li>
                <li>Department Store</li>
                <li>Supermarket</li>
                <li>Electronic Goods Shop</li>
                <li>Pub</li>
                <li>Cinema</li>
                <li>Takeaway</li>
                <li>Music/Film/Game Shop</li>
                <li>Charity Shop</li>
                <li>Travel Agent</li>
            </ul>
        </div>
    </section>
</template>

<style>
    .grid-boxes {
        @apply grid grid-cols-2 md:grid-cols-4 gap-2;

        > li {
            @apply border rounded p-4;
        }
    }
</style>

<script>
    export default {
        data: () => ({
            details: []
        }),
        methods:{
            async getDb() {
                return new Promise((resolve, reject) => {
                    let request = window.indexedDB.open('shop-ratings', 2);

                    request.onerror = e => {
                        console.log('Error opening db', e);
                        reject('Error');
                    };

                    request.onsuccess = e => {
                        resolve(e.target.result);
                    };
                });
            },
            async getDetailsFromDb() {
              	return new Promise((resolve, reject) => {
                		let trans = this.db.transaction(['details'], 'readonly');
                		trans.oncomplete = e => {
                			resolve(details);
                		};

                		let store = trans.objectStore('details');
                		let details = [];

                		store.openCursor().onsuccess = e => {
                  			let cursor = e.target.result;
                  			if (cursor) {
                  				details.push(cursor.value)
                  				cursor.continue();
                  			}
                		};
              	});
            },
        },
        async created() {
            this.db = await this.getDb();
            this.details = await this.getDetailsFromDb();
        }
    }
</script>
