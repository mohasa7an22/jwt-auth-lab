import {useState, useEffect} from 'react'
import axios from 'axios'

function AdminPage() {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    
    async function fetchUsers() {
        try{
            const response = await axios.get(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      setUsers(response.data)
        } catch(err){
            console.error(err)
            setError('Failed to load users')
        } finally {
            setLoading (false)
        }
    }
    async function handleToggleAdmin(id) {
        try{
            await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/toggle-admin/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      fetchUsers()
        } catch(err){
            console.error(err)
            setError("Failed to make Admin")
        }
    }
    useEffect(()=> {
        fetchUsers()
    },[])
      if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Admin Panel</h1>
      {users.length === 0 ? (
        <p>no users found</p>
      ): (
        <ul>
        {users.map((oneUser)=>(
            <li key={oneUser._id}>
            {oneUser.username} - {oneUser.role}
            <button onClick={() => handleToggleAdmin(oneUser._id)}>
                {oneUser.role === 'admin' ? "remove admin" : "make admin"}
            </button>
            </li>
        ))}
        </ul>
      )}
    </div>
  )
}

export default AdminPage
