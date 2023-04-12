import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MemeResponse } from '../../models/MemeResponse'
import { IMeme } from '../../models/IMeme'

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string
export const memeApi = createApi({
  reducerPath: 'memeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  endpoints: (build) => ({
    getMemes: build.query<IMeme[], void>({
      query: () => ({
        url: 'get_memes',
        method: 'GET',
      }),
      transformResponse: (response: MemeResponse) => response.data.memes,
    }),
  }),
})

export const { useGetMemesQuery } = memeApi
