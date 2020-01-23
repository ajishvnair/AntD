import React,{useReducer} from 'react';
import ComponentB from './ComponentB';

const initialState=0;
const reducer=(state,action)=>{
    switch(action){
        case 'increment':
            return state+1;
        case 'decrement':
            return state-1;
        case 'reset':
            return initialState;
        default:
            return state;
    }
}
export const CounterContext=React.createContext();
function ComponentA(){
    const[count,dispatch]=useReducer(reducer,initialState);
    return(
        <div>
        <div>Count---{count}</div>
        <CounterContext.Provider value={{countState:count,countDispatch:dispatch}}>
            <ComponentB/>
        </CounterContext.Provider>
        
        </div>
    )
}
export default ComponentA;