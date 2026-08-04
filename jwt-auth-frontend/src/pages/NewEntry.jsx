import {useState} from 'react'
import axios from 'axios'
import {useAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router'


function NewEntry() {
    const {user} = useAuth()
    const [formData, setFormData] = useState({
        title:"",
        entrybody:"",
        isPublic: false,
    })
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const navigate = useNavigate()

    function handleChange(event) {
  const { name, type, value, checked } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
}
    async function handleSubmit(event){
        event.preventDefault()
        try{
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACK_END_SERVER_URL}/entries`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            navigate(`/entries`)
        } catch(err){
            setError(err.response.data.message)
            setLoading(false)
        }   
    }
  return (
    <div>
      <h1>New Entry</h1>
      <p className="error">{error}</p>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange}/>
      
        <label htmlFor="entrybody">Entry Body</label>
        <input type="text" name="entrybody" value={formData.entrybody} onChange={handleChange}/>
      
        <label htmlFor="isPublic">Public</label>
        <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange}/>
      
        <button type="submit" disabled={isLoading}> {isLoading ? 'Creating Entry...' : 'Create Entry'} </button>
      </form>
    </div>
  )
}

export default NewEntry
