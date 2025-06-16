'use server'

import slugify from 'slugify'

import { auth } from '@/auth'
import { ActionStateType, FormStateType } from '@/lib/types'
import { parseServerActionResponse } from '@/lib/utils'
import { writeClient } from '@/sanity/lib/write-client'

export const createPitch = async (state: ActionStateType, form: FormData, pitch: string) => {
	const session = await auth()

	if (!session) {
		return parseServerActionResponse({ error: 'Not signed in', status: 'ERROR' })
	}

	const { title, description, category, link } = Object.fromEntries(
		Array.from(form).filter(([key]) => key !== 'pitch')
	) as FormStateType

	const slug = slugify(title as string, { lower: true, strict: true })

	try {
		const startup = {
			title,
			description,
			category,
			image: link,
			slug: {
				_type: 'slug',
				current: slug
			},
			pitch,
			author: {
				_type: 'reference',
				_ref: session?.id
			}
		}

		const result = await writeClient.create({ _type: 'startup', ...startup })

		return parseServerActionResponse({ result, status: 'SUCCESS' })
	} catch (error) {
		console.error(error)

		return parseServerActionResponse({ error: error, status: 'ERROR' })
	}
}
