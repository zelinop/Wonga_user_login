function FormField({ id, label, type = 'text', name, value, onChange }) {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  )
}

export default FormField
