import React, { Fragment, useContext } from 'react';
import UsersContext from '../context/UsersContext';

const Table = () => {

    const {authToken, registeredUsers, newUsers} = useContext(UsersContext)

    if (!authToken) return null

    return (
        <div className="table-div">
            <div className="table">
                <div>First Name</div>
                <div>Last Name</div>
                <div>Address</div>
                <div>SSN</div>

                {registeredUsers.map(user => 
                    <Fragment key={user.ssn}>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                        <div>{user.address}</div>
                        <div>{user.ssn}</div>
                    </Fragment>
                )}

                {newUsers.map(user => 
                    <Fragment key={user.ssn}>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                        <div>{user.address}</div>
                        <div>{user.ssn}</div>
                    </Fragment>
                )}

            </div>
        </div>
    );
};

export default Table;