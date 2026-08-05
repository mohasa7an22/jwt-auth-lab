import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user} = useAuth()
  return (
    <nav className='nav-links'>
      {user 
      ? 
      (<>
      <button onClick={logout}>Sign Out</button>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/my-entries'>My Entries</Link>
      <Link to='/entries'>Public Entries</Link>
      <Link to='/new-entry'>New Entry</Link>
      {user.role === 'admin' && <Link to='/admin'>Admin</Link>}
      </>) : 
      (<>
        <Link to='/entries'>Public Entries</Link>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>)}
    </nav>
  )
}

export default Navbar