import AuthForm from '../shared/components/AuthForm'
import PageCard from '../shared/components/PageCard'
import { useRegisterPageLogic } from './hooks/useRegisterPageLogic'

function RegisterPage() {
  const { registerFields, error, handleRegister, goToLogin } = useRegisterPageLogic()

  return (
    <PageCard
      title="Register"
      subtitle="Create a new account with your personal details."
    >
      <AuthForm
        fields={registerFields}
        submitLabel="Create account"
        onSubmit={handleRegister}
        error={error}
      />
      <div className="modal-footer">
        <span>Already have an account?</span>
        <button
          className="footer-link-button"
          type="button"
          onClick={goToLogin}
        >
          Login
        </button>
      </div>
    </PageCard>
  )
}

export default RegisterPage
