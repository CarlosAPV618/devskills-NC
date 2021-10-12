import React, { useEffect, useState } from 'react';
import UsersContext from './UsersContext';
import axios from 'axios';
import useLoadData from '../hooks/useLoadData';

const UsersProvider = ({children}) => {

    const initialState = {
        newUsers: [],
        registeredUsers: [],
        authToken: localStorage.getItem('authToken') || null,
        error: ''
    }

    const [state, setState] = useState(initialState)

    const loadData = useLoadData()
    useEffect(() => setState(state => ({...state, ...loadData})), [loadData])

    useEffect(() => {
        if (state.error) setTimeout(() => setState(state => ({...state, error: ''})), 2500)
    }, [state.error])

    const registerUser = async (user) => {
        const ssn = state.registeredUsers.map(user => user.ssn)
        if (ssn.includes(user.ssn)) return setState({...state, error: 'The ssn is already in use'})
        try {

            const {data} = await axios.post(
                'http://localhost:8081/api/members',
                user,
                {headers: { Authorization: 'Bearer ' + state.authToken }}
            )

            setState({...state, newUsers: [...state.newUsers, data]})
        } catch (error) {
            console.log(error.response?.data.mesage)
            setState({
                ...state, 
                error: error.response?.data.mesage || 'Something went wrong...'
            })
            setTimeout(() => setState({...state, error: ''}), 2500)
        }
    }
    
    return (
        <UsersContext.Provider
            value={{
                ...state,
                registerUser
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;