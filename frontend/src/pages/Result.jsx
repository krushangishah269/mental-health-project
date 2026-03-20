import { useLocation } from "react-router-dom"

function Result(){

const location = useLocation()

const {prediction,name,stress} = location.state || {}

let risk = ""
let color = ""
let suggestion = ""

// Logic
if(prediction === 0){
  risk = "LOW"
  color = "green"
  suggestion = "Keep it up! Maintain good sleep and low stress."
}
else if(stress < 7){
  risk = "MODERATE"
  color = "#f0ec1e"
  suggestion = "Try to manage stress and improve sleep habits."
}
else{
  risk = "HIGH"
  color = "red"
  suggestion = "Reduce stress and improve your sleep cycle."
}

return(

<div className={`container ${risk.toLowerCase()}`}>

<h2>
  Hello, <span className="name">{name}</span>
</h2>

<h1 className="line2">
  Your mental health risk is{" "}
  <span style={{color: color, fontWeight:"bold"}}>
    {risk}
  </span>
</h1>

<p className="line3">
  {suggestion}
</p>

</div>

)

}

export default Result