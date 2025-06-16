import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'

export default async function Page() {
	const session = await auth()

	if (!session) {
		redirect('/')
	}

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<h1 className="heading">Submit your startup</h1>
			</section>
			<StartupForm />
		</>
	)
}
