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

    return (
        <div>
        <h1>My Entries</h1>
        {entries.length === 0 ? (
            <p>No entries yet</p>
        ) : (
            <ul>
                {entries.map(oneEntry => (
                    <li key={oneEntry._id}>
                        <h2>{oneEntry.title}</h2>
                        <p>{oneEntry.entrybody}</p>
                    </li>
                ))}
            </ul>
        )}
        </div>
    )
    }


    export default MyEntries