import React, { useState } from 'react';


const Panel = ({dispatch , spheres}) => {
    const [sphere, setSphere] = useState({id: null, radius:null, color: null})
    //const [spheres, setSpheres] = useState([{...sphere}])
    const handleChange = (e) => {
        const changeSphere = {...sphere}
        changeSphere[e.target.name] = e.target.value
        setSphere(changeSphere);
    }
    const addSphere = () => {
        //setSpheres([...spheres, {...sphere}])
        dispatch( {type: "ADD", value: sphere} )
    }
    return (
    <>
            <h1>Control Panel</h1>
            <hr />
            <label htmlFor="spheres">radius: </label>
            <input type="number" name="radius" min="1" value={sphere.radius} onChange= {handleChange}></input>
            <br/>
            <label htmlFor="favcolor">Select your favorite color:</label>
            <input type="color" id="favcolor" name="color" value={sphere.color} onChange= {handleChange}/> 
            <br/>
            <label htmlFor="x">x: </label>
            <input type="number" name="x"  value={sphere.x} onChange= {handleChange}></input>
            <br/>
            <label htmlFor="y">y: </label>
            <input type="number" name="y" min="1" value={sphere.y} onChange= {handleChange}></input>
            <br/>
            <label htmlFor="z">z: </label>
            <input type="number" name="z" min="1" value={sphere.z} onChange= {handleChange}></input>
            <br/>

            <button onClick={addSphere}>Add</button>

        {
            spheres.map((s,i)=> {
                return (<div key={i}>
                    <div><strong>Id: </strong>{s.id}</div>
                   <div><strong>radius: </strong>{s.radius}</div>
                    <div><strong>Color: </strong>{s.color}</div>
                <div><strong>x:</strong>{s.x}<strong>y:</strong>{s.y}<strong>z:</strong>{s.z}</div>
                    <button onClick={()=>{
                        dispatch({ type:'DEL', value: s.id}) 
                        }}>Delete</button>
                    <hr/>
                </div>)
            })
        }     
    </>

    )
}

export default Panel