import React, { useReducer } from 'react';
import Scene from './Scene'
import Button from './Button'
import appReducer from "./Reducer"
import './App.css';


const initSpheres = [
    {id: 1, radius:1, color: 'green', x:0, y:0, z:1},
    {id: 2, radius:1.1, color: 'red', x:3, y:1, z:2},
    {id: 3, radius:0.4, color: 'blue', x:-3, y:1, z:0},
    {id: 4, radius:1.3, color: 'orange', x:-2, y:2, z:-2}  
  ]

function App() {
  const [spheres, dispatch] = useReducer(appReducer,initSpheres)
  return (<>
            <Scene dispatch={dispatch} spheres={spheres}/> 
            <Button  dispatch={dispatch} spheres={spheres}/> 
          </>)
}

export default App;
