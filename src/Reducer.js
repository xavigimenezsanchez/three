const Reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            if (state.length === 0) {
                return [{...action.value, id:1}]
            }
            return [...state, {...action.value, id:state.reduce((x,y) => x.id>y.id?x:y).id + 1}]
        case "DEL":
          return remove(state, action);
        case "SETUUID":
            const id = state.findIndex(x=> x.id===action.value.id);
            state[id].uuid = action.value.uuid
            return [...state]
        case "SET":
            return action.value
        default:
          return [...state];
      }
}

const remove = (state, action) => {
    const index = state.findIndex(x=> x.id === action.value)
    if (index !== -1) 
        state.splice(index,1)
    return [...state]
}
export default Reducer