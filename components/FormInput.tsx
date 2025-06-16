import React from 'react'

const FormInput: React.FC<{
	label: string
	name: string
	children: React.ReactElement<HTMLInputElement | HTMLTextAreaElement>
	placeholder: string
	className?: string

	error?: string
}> = ({ label, name, error, children, placeholder, className, ...props }) => {
	const input = React.cloneElement(children, {
		id: name,
		name,
		className,
		placeholder,
		required: true
	})

	return (
		<div>
			<label htmlFor={name} className="startup-form_label">
				{label}
			</label>
			{input}
			{error && <p className="startup-form_error">{error}</p>}
		</div>
	)
}

export default FormInput
