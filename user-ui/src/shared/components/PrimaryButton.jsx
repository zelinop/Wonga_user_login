function PrimaryButton({ label, type = 'button' }) {
  return (
    <button className="primary-button" type={type}>
      {label}
    </button>
  )
}

export default PrimaryButton
