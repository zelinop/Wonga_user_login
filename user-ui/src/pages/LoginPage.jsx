import AuthForm from '../shared/components/AuthForm'
import PageCard from '../shared/components/PageCard'
import { useLoginPageLogic } from './hooks/useLoginPageLogic'

function LoginPage() {
  const { loginFields, error, handleLogin, goToRegister } = useLoginPageLogic()

  return (
    <PageCard title="Login" subtitle="Sign in to access your welcome details.">
      <AuthForm
        fields={loginFields}
        submitLabel="Sign in"
        onSubmit={handleLogin}
        error={error}
      />
      <div className="modal-footer">
        <span>Don&apos;t have an account?</span>
        <button
          className="footer-link-button"
          type="button"
          onClick={goToRegister}
        >
          Register
        </button>
      </div>
    </PageCard>
  )
}

export default LoginPage
