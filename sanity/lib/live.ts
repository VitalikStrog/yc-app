import { defineLive } from 'next-sanity'
import 'server-only'

import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
	client: client.withConfig({
		// Live content is currently only available on the experimental API
		// https://www.sanity.io/docs/api-versioning
		apiVersion: 'vX'
	}),
	serverToken: process.env.NEXT_SANITY_API_READ_TOKEN,
	browserToken: process.env.NEXT_SANITY_API_READ_TOKEN
})
