import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '1de6d220bamshe70385ffcc3b9cbp157663jsnfd3db49babc7'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';
// Again need this from the Rapid API request, get from RapidAPI when it is running 

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })


export const cryptoNewsApi = createApi({
        reducerPath: 'cryptoNewsApi',
        baseQuery: fetchBaseQuery({ baseUrl }),
        endpoints: (builder) =>({
           getCryptoNews: builder.query({
                query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
            })
        })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;