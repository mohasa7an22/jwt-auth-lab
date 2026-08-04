import { useState, useEffect } from 'react'
import axios from 'axios'

function Entries() {
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

  return (
    <div>
      <h1>Public Entries</h1>
      {entries.length === 0 ? (
        <p>No public entries yet</p>
      ) : (
        <ul>
          {entries.map(entry => (
            <li key={entry._id}>
              <h2>{entry.title}</h2>
              <h3> By: {entry.owner.username}</h3>
              <p>{entry.entrybody}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Entries