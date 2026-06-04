const urlMen = "https://dummyjson.com/products/category/mens-watches";
const urlWomen = "https://dummyjson.com/products/category/womens-watches";

async function getData() {
    try {
        const mensRes = await fetch(urlMen);
        const womensRes = await fetch(urlWomen);

        const mensWatches = await mensRes.json();
        const womensWatches = await womensRes.json();

        const cache = [...mensWatches.products, ...womensWatches.products];
        console.log(cache);
        sessionStorage.setItem("data", JSON.stringify(cache));

        return cache
    } catch (error) {
        console.log(error);
    }
}

export async function cacheData() {
    const cached = JSON.parse(sessionStorage.getItem("data"));

    if (cached) {
        return cached;
    } else {
        return await getData();
    }
}

cacheData() 