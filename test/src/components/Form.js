import React, { useContext, useEffect, useState } from 'react';
import UsersContext from '../context/UsersContext';

const Form = () => {

    const {authToken, registerUser, error} = useContext(UsersContext)

    const [disable, setDisable] = useState(true)
    const [localError, setError] = useState('')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        ssn: '',
    })

    useEffect(() => {
        const emptyFields = Object.values(formData).filter(value => !value.length)
        !emptyFields.length ? setDisable(false) : setDisable(true)
    }, [formData])

    const handleSubmit = (e) => {
        e.preventDefault()

        for (let value of Object.values(formData)){
            if (!value || !value.trim() || !value.length > 1){
                setError('All fields are required')
                setTimeout(() => setError(''), 2500)
                return
            }
                
        }

        const ssn = formData.ssn.split('-')
        if (ssn.length !== 3 || ssn[0].length !== 3 || ssn[1].length !== 2 || ssn[2].length !== 4){
            setError('Invalid SSN format', ssn)
            setTimeout(() => setError(''), 2500)
            return
        }

        registerUser(formData)
        setFormData({firstName: '', lastName: '', address: '', ssn: ''})
    }
    
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }
    
    if (!authToken) return <p>Token could not be verified</p>

    return (
        <div className="form-div">
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange}
                    name='firstName'
                />
                <input 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleChange}
                    name='lastName'
                />
                <input 
                    placeholder="Address" 
                    value={formData.address}
                    onChange={handleChange}
                    name='address'
                />
                <input 
                    placeholder="SSN" 
                    value={formData.ssn}
                    onChange={handleChange}
                    name='ssn'
                />

                <div>
                    <button 
                        type='button'
                        onClick={() => setFormData({
                            firstName: '', lastName: '', address: '', ssn: ''
                        })}
                    >
                        Reset
                    </button>
                    <button 
                        disabled={disable}
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>

            {localError && (<p style={{textAlign: 'center', color: 'red'}}>{localError}</p>)}
            {error && (<p style={{textAlign: 'center', color: 'red'}}>{error}</p>)}
        </div>
    );
};

export default Form;