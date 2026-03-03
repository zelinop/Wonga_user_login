import { useState } from 'react'
import FormField from './FormField'
import PrimaryButton from './PrimaryButton'
function AuthForm({ fields, submitLabel, onSubmit, error }) {
  const initialValues = fields.reduce((accumulator, field) => {
    accumulator[field.name] = ''
    return accumulator
  }, {})

  const [formValues, setFormValues] = useState(initialValues)
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formValues)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          id={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formValues[field.name]}
          onChange={handleChange}
        />
      ))}

      {error && <p className="error-text">{error}</p>}

      <PrimaryButton type="submit" label={submitLabel} />
    </form>
  )
}

export default AuthForm
