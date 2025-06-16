import React from 'react'

import StartupCard from '@/components/StartupCard'
import { StartupCardType } from '@/lib/types'
import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'

const UserStartups = async ({ id }: { id: string }) => {
	const startups: StartupCardType[] = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

	return (
		<>
			{startups.length > 0 ? (
				startups.map((startup) => <StartupCard key={startup._id} post={startup} />)
			) : (
				<p className="no-result">No posts yet</p>
			)}
		</>
	)
}

export default UserStartups
