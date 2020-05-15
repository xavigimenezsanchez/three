import React, { useReducer } from 'react';
import Scene from './Scene'
import Panel from './Panel'
import appReducer from "./Reducer"
import './App.css';


const initSpheres = [
    {id: 1, radius:1, color: 'green', x:0, y:0, z:0},
    {id: 2, radius:2, color: 'red', x:4, y:1, z:2},
    {id: 3, radius:0.4, color: 'blue', x:-3, y:1, z:1},
    {id: 4, radius:1.3, color: 'orange', x:-2, y:2, z:-2}  
  ]

function App() {
  const [spheres, dispatch] = useReducer(appReducer,initSpheres)
  //const spheres = state
  return (<div className="container">
      <div className="col-5">
        <Scene dispatch={dispatch} spheres={spheres}/>
      </div>
      <div className="col-2">
        <Panel dispatch={dispatch} spheres={spheres}/>
      </div>
    </div>
  );
}

export default App;
