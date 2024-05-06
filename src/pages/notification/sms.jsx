import React, { useEffect, useContext } from 'react';
// import axios from 'axios';
import { Context } from '../../../context';

export const Sms = () => {

    const { state, dispatch } = useContext(Context);

    // useEffect(() => {
    //     axios.get("http://localhost:3000/home")
    //         .then((res) => {
    //             dispatch({ type: 'SET_DATA', payload: res.data });
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, [dispatch]);

    return (
        <>
            {state.data.map(item => (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                    <h1>{item.fname}</h1>
                </div>
            ))}
            <h1>salom</h1>
        </>
    );
};
