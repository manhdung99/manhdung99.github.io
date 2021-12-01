import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {

  const [times,setTimes] = useState(0)
  const handleAddTime = () =>{
    setTimes(times => times+1)
  }
  return (
    <div className="App">
    <button
    onClick = {() => handleAddTime()}
    >Click me</button>
     { times > 0 && <span style ={{display:"block"}}> Click lan {times}</span> }
    </div>
  );
}

export default App;
