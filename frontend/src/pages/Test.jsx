import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

function Test(){

const [age,setAge] = useState("")
const [stress,setStress] = useState("")
const [sleep,setSleep] = useState("")

// separate errors
const [ageError,setAgeError] = useState("")
const [stressError,setStressError] = useState("")
const [sleepError,setSleepError] = useState("")
const [serverError,setServerError] = useState("")

const navigate = useNavigate()
const location = useLocation()

const name = location.state?.name || "User"

const predict = async () => {

let valid = true

// reset errors
setAgeError("")
setStressError("")
setSleepError("")
setServerError("")

// AGE VALIDATION
if(!age){
setAgeError("Age is required")
valid = false
}
else if(isNaN(age)){
setAgeError("Age must be numeric")
valid = false
}
else if(age <= 0){
setAgeError("Age must be positive")
valid = false
}

// STRESS VALIDATION
if(!stress){
setStressError("Stress level required")
valid = false
}
else if(stress < 1 || stress > 10){
setStressError("Stress level must be between 1 and 10")
valid = false
}

// SLEEP VALIDATION
if(!sleep){
setSleepError("Sleep quality required")
valid = false
}
else if(sleep < 1 || sleep > 10){
setSleepError("Sleep quality must be between 1 and 10")
valid = false
}

if(!valid) return

// API call
try{

const response = await axios.post(
"https://mental-health-project-8czr.onrender.com/predict",
{
age:Number(age),
stress_level:Number(stress),
sleep_quality:Number(sleep)
}
)

navigate("/result",{
state:{
prediction:response.data.prediction,
name:name,
stress:stress
}
})

}catch(error){
console.error(error)
setServerError("Server error")
}

}

return(

<div className="container">

<h2>Answer the following questions</h2>

{/* AGE */}
<label>Enter your age</label>
<input
placeholder="Age"
onChange={(e)=>setAge(e.target.value)}
/>
{ageError && <p className="error">{ageError}</p>}

{/* STRESS */}
<label>Stress level (1-10)</label>
<input
placeholder="Stress level"
onChange={(e)=>setStress(e.target.value)}
/>
{stressError && <p className="error">{stressError}</p>}

{/* SLEEP */}
<label>Sleep quality (1-10)</label>
<input
placeholder="Sleep quality"
onChange={(e)=>setSleep(e.target.value)}
/>
{sleepError && <p className="error">{sleepError}</p>}

{serverError && <p className="error">{serverError}</p>}

<button onClick={predict}>
Predict
</button>

</div>

);

}

export default Test