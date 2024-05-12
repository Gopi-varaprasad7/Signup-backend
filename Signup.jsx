import { useState } from "react";
import axios from 'axios'

const Signup = () => {

    const [value, setValue] =useState({
        name:"",
        email: "",
        password: ""
    })
   
    const handleChange = (e)=>{
        setValue({
            ...value ,[e.target.name]:e.target.value,
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const reg = await axios.post('http://localhost:5001/register',value);
        console.log(reg.data)
        setValue({
            name:"",
        email: "",
        password: ""
        })
        alert("account is created")
    }
  return (
    <div className='container'>
        <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder='name' value={value.name} name='name' />
        <input type="text" onChange={handleChange}  placeholder='email' value={value.email} name='email' />
        <input type="password" onChange={handleChange}  placeholder='password' value={value.password} name='password' />
        <button type="submit">signup</button>
      </form>
    </div>
  )
}

export default Signup;
