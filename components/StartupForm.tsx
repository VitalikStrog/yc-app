'use client'

import MDEditor from '@uiw/react-md-editor'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useActionState, useState } from 'react'
import { z } from 'zod'

import FormInput from '@/components/FormInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createPitch } from '@/lib/actions'
import { ActionStateType, ErrorsStateType } from '@/lib/types'
import { formSchema } from '@/lib/validation'

const StartupForm = () => {
	const router = useRouter()
	const { toast } = useToast()

	const [pitch, setPitch] = useState('')
	const [errors, setErrors] = useState<ErrorsStateType>({})

	const handleFormSubmit = async (
		prevState: ActionStateType,
		formData: FormData
	): Promise<ActionStateType> => {
		try {
			const formValues = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				category: formData.get('category') as string,
				link: formData.get('link') as string,
				views: 0,
				pitch
			}

			await formSchema.parseAsync(formValues)

			setErrors({})

			const { result } = await createPitch(prevState, formData, pitch)

			if (result.status === 'SUCCESS') {
				toast({
					title: 'Success',
					description: 'Your startup pitch has been created successfully .',
					variant: 'default'
				})
			}

			router.push(`/startup/${result._id}`)

			return { error: '', status: 'SUCCESS' }
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors = error.flatten().fieldErrors

				setErrors(fieldErrors as ErrorsStateType)
				toast({
					title: 'Error',
					description: 'Please check your inputs and try again.',
					variant: 'destructive'
				})

				return { ...prevState, error: 'Validation failed', status: 'ERROR' }
			}

			toast({
				title: 'Error',
				description: 'An unexpected error has occurred.',
				variant: 'destructive'
			})

			return { ...prevState, error: 'An unexpected error has occurred', status: 'ERROR' }
		}
	}

	const [state, formAction, isPending] = useActionState<ActionStateType, FormData>(
		handleFormSubmit,
		{
			error: '',
			status: 'INITIAL'
		}
	)
	return (
		<form action={formAction} className="startup-form">
			<FormInput
				label="Title"
				name="title"
				error={errors?.title}
				className="startup-form_input"
				placeholder="Startup Title"
			>
				<Input />
			</FormInput>
			<FormInput
				label="Description"
				name="description"
				className="startup-form_textarea"
				error={errors?.description}
				placeholder="Startup Description"
			>
				<Textarea />
			</FormInput>
			<FormInput
				label="Category"
				name="category"
				error={errors?.category}
				className="startup-form_input"
				placeholder="Startup Category (Tech, Health, Education ... )"
			>
				<Input />
			</FormInput>
			<FormInput
				label="Image URL"
				name="link"
				error={errors?.link}
				className="startup-form_input"
				placeholder="Startup Image URL"
			>
				<Input />
			</FormInput>
			<div data-color-mode="light">
				<label htmlFor="Pitch" className="startup-form_label">
					Pitch
				</label>
				<MDEditor
					id="pitch"
					preview="edit"
					value={pitch}
					onChange={(value) => setPitch(value || '')}
					height={300}
					style={{ borderRadius: 20, overflow: 'hidden' }}
					textareaProps={{
						placeholder: 'Briefly describe your idea and what problem it solves'
					}}
					previewOptions={{
						disallowedElements: ['style']
					}}
				/>
				{errors?.pitch && <p className="startup-form_error">{errors.pitch}</p>}
			</div>
			<Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
				{isPending ? 'Submitting...' : 'Submit Your Pitch'}
				<Send className="size-6 ml-2" />
			</Button>
		</form>
	)
}

export default StartupForm
