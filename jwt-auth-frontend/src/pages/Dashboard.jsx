import { useAuth } from "../context/AuthContext"

function Dashboard({}) {
  const { user } = useAuth()

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div>
      <h1>Welcome {capitalize(user.username)}</h1>
    </div>
  )
}

export default Dashboard