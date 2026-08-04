import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import { useAuth } from '../context/AuthContext'

function Entries() {
    const {user} = useAuth()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    async function fetchPublicEntries() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/entries`)
        
        setEntries(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPublicEntries()
  }, [])

  async function handleDelete(id) {
    try{
        await axios.delete(`${import.meta.env.VITE_BACK_END_SERVER_URL}/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        setEntries(entries.filter(entry => entry._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Public Entries</h1>
      {entries.length === 0 ? (
        <p>No public entries yet</p>
      ) : (
        <ul>
          {entries.map(entry => {
            const isOwner = user && entry.owner && entry.owner._id === user._id
            return (
              <li key={entry._id}>
                <h2>{entry.title}</h2>
                <h3> By: {entry.owner.username}</h3>
                <p>{entry.entrybody}</p>
                {isOwner && (
                  <>
                    <Link to={`/entries/${entry._id}/edit`}>Edit</Link>
                    <button onClick={() => handleDelete(entry._id)}>Delete</button>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Entries