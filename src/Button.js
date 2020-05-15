import React, { useState } from 'react'
import './Button.css'

let index = 0;

const Button = ({dispatch , spheres}) => {
    const addSphere = () => {
        const sphere = {...spheres[index++]}
        sphere.y += 1.5
        sphere.x += 1.5
        sphere.z += 1.5
        sphere.uuid = null
        dispatch( {type: "ADD", value: sphere} )
    }

    return (<button onClick={addSphere}>+</button>)
}

export default Button