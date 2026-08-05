    import React from 'react'
    import {useState, useEffect} from 'react'
    import axios from 'axios'
    import { useAuth } from '../context/AuthContext'
    function MyEntries() {
    const { user } = useAuth()
    const [entries, setEntries] = useState([])

    useEffect(() => {
        async function fetchMyEntries() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/entries/my-entries`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            })
            setEntries(response.data)
        } catch (error) {
            console.error(error)
        }
        }

        fetchMyEntries()
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
        <h1>My Entries</h1>
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


    export default MyEntries