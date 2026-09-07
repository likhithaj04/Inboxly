import React from 'react'
import { useState } from 'react'
import api from '../services/api'

export default function Preference() {
    const [value, setValue] = useState('')
    const [userData, setUserData] = useState([])

    async function handlePreference() {
        await api.post("/user/preference", {
            Preference: userData
        })
        setUserData(" ")
    }

    function handleAdd() {
       const allPreference = [...userData, value]
        setUserData(allPreference)
        // console.log(allPreference);
    }


    return (
        <div className='w-120 p-5'>
            <div className='flex flex-col gap-3'>
                <h1>Add Preference</h1>
                <input type='text' className='h-10 p-2'
                    placeholder='type your preference '
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></input>
                <textarea value={userData} readOnly className='border rounded-xs border-blue-900'/>
                <div className='flex gap-4'>
                    <button className=' border-2 rounded-xs border-cyan-600 hover:cursor-pointer w-20 p-1' onClick={handleAdd}>Add More</button>
                    <button className=' border-2 rounded-xs border-cyan-600 hover:cursor-pointer w-23 p-1' onClick={handlePreference}>Submit preference</button></div>
            </div>
        </div>
    )
}
