const urlMen = "https://dummyjson.com/products/category/mens-watches";
const urlWomen = "https://dummyjson.com/products/category/womens-watches";

async function getData() {
    try {
        const [mensWatches, womensWatches] = await Promise.all([
            fetch(urlMen).then(res => res.json()),
            fetch(urlWomen).then(res => res.json())
        ]);

        const cache = [...mensWatches.products, ...womensWatches.products];

        sessionStorage.setItem("data", JSON.stringify(cache));

        return cache
    } catch (error) {
        console.log("API error:", error);
        return [];
    }
}

export async function cacheData() {
    const cached = sessionStorage.getItem("data")

    if (cached) {
        return JSON.parse(cached)
    } else {
        return await getData();
    }
}

