import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '1de6d220bamshe70385ffcc3b9cbp157663jsnfd3db49babc7'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';


const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
        reducerPath: 'cryptoApi',
        baseQuery: fetchBaseQuery({ baseUrl }),
        endpoints: (builder) =>({
            getCryptos: builder.query({
                query: (count) => createRequest(`/coins?limit=${count}`),
            })
        })
});

export const { useGetCryptosQuery } = cryptoApi;