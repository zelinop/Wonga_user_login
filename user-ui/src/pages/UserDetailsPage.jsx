import PageCard from '../shared/components/PageCard'
import { useAuth } from '../features/auth/hooks/useAuth'

function UserDetailsPage() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  return (
    <PageCard
      title="Welcome"
      subtitle="You are signed in. Here are your user details."
    >
      <dl className="details-list">
        <div>
          <dt>First name</dt>
          <dd>{user.FirstName}</dd>
        </div>
        <div>
          <dt>Last name</dt>
          <dd>{user.LastName}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{user.Email}</dd>
        </div>
      </dl>
      <div className="modal-footer">
        <button className="footer-link-button" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </PageCard>
  )
}

export default UserDetailsPage
