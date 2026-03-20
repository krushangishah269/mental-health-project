import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(){

const [name,setName] = useState("")
const [error, setError] = useState("")
const navigate = useNavigate()

const handleStart = () => {

if(name.trim() === ""){
  setError("Please enter your name")
  return
}

setError("")
navigate("/test", { state: { name: name } })

}

return(

<div className="container">

<h1>Mental Health Risk Checker</h1>

<label>Enter your name</label>

<input
placeholder="Your name"
value={name}
onChange={(e) => {
  const value = e.target.value
  setName(value)

  if(value.trim() === ""){
    setError("Please enter your name")
  }else{
    setError("")
  }
}}
/>

{error && <p className="error">{error}</p>}

<button onClick={handleStart}>
Take Test
</button>

</div>

)

}

export default Home