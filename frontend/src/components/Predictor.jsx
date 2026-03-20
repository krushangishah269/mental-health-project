import { useState } from "react";
import axios from "axios";

function Predictor(){
// const [userId,setUserId] = useState("");
const [age,setAge] = useState("");
const [stress,setStress] = useState("");
const [sleep,setSleep] = useState("");
const [result,setResult] = useState("");

const predict = async () => {

const response = await axios.post(
"http://127.0.0.1:5000/predict",
{
// user_id:userId,
age: Number(age),
stress_level: Number(stress),
sleep_quality: Number(sleep)
}
);

setResult(response.data.prediction);

};

return(

<div style={{textAlign:"center",marginTop:"80px"}}>

<h1>Mental Health Risk Predictor</h1>

{/* <input placeholder="User ID"
onChange={(e)=>setUserId(e.target.value)}
/><br/><br/> */}

<input placeholder="Age"
onChange={(e)=>setAge(e.target.value)}
/><br/><br/>

<input placeholder="Stress Level"
onChange={(e)=>setStress(e.target.value)}
/><br/><br/>

<input placeholder="Sleep Quality"
onChange={(e)=>setSleep(e.target.value)}
/><br/><br/>

<button onClick={predict}>
Predict
</button>

<h2>{result && `Prediction: ${result}`}</h2>

</div>

);

}

export default Predictor;