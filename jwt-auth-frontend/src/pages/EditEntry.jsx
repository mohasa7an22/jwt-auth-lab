import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router'

function EditEntry() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        entrybody: "",
        isPublic: false,
  })
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const [saving, isSaving] = useState(false)

    useEffect(()=>{
        async function getEntry(){
            try{
                const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/entries/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        setFormData({
            title: response.data.title,
            entrybody: response.data.entrybody,
            isPublic: response.data.isPublic
        })
            } catch(err){
                console.error(err)
                setError("failed to load entry")
            } finally {
                setLoading(false)
            }
        }
        getEntry()
    },[id])

    function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      isSaving(true)
      await axios.put(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/entries/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      navigate('/entries')
    } catch (err) {
      console.error(err)
      setError(err.response.data.message || "Failed to update entry.")
      isSaving(false)
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit Entry</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label htmlFor="entrybody">Entry Body</label>
        <input type="text" name="entrybody" value={formData.entrybody} onChange={handleChange} />

        <label htmlFor="isPublic">Public</label>
        <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default EditEntry