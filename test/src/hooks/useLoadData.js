import { useEffect, useState } from "react"
import axios from "axios"

const useLoadData = () => {
    
    const [loadData, setLoadData] = useState({});

    useEffect(() => {
        const request = async () => {
            try {
                const {data} = await axios.post(
                    'http://localhost:8081/auth', 
                    {username: "sarah", password: "connor"}
                )
    
                setLoadData(state => ({...state, authToken: data.token}))
                localStorage.setItem('authToken', data.token || null)

            } catch (error) {
               console.log(error.response?.data.message) 
                setLoadData(state => ({
                    ...state, 
                    error: error.response?.data.mesage || 'Something went wrong...',
                    authToken: null
                }))
            }
        }
        request()
    }, [])

    useEffect(() => {
        const request = async () => {
            if (!localStorage.getItem('authToken')) return
            try {
                const {data} = await axios.get(
                    'http://localhost:8081/api/members', 
                    { headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')} }
                )
                setLoadData(state => ({...state, registeredUsers: data}))
            } catch (error) {
                console.log(error.response?.data.message)
                setLoadData(state => ({
                    ...state, 
                    error: error.response?.data.mesage || 'Something went wrong...'
                }))
            }
        }
        request()
    }, [])

    return loadData

}

export default useLoadData