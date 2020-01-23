import React,{useState,useMemo} from 'react';

function CounterOne(){
    const[countOne,setCountOne]=useState(0);
    const[countTwo,setCountTwo]=useState(0);

    const incrementOne=()=>{
        setCountOne(countOne+1);
    }
    const incrementTwo=()=>{
        setCountTwo(countTwo+1);
    }
    const isEven=useMemo(()=>{
        let i=0;
        while(i<900000000)i++;
        return countOne%2===0
    },[countOne])
    return(
        <div>
        <div>
        <button onClick={incrementOne}>Counter one -{countOne}</button>
        </div>
        <span>{isEven?'Even':'odd'}</span>
        <div>
        <button onClick={incrementTwo}>Counter Two -{countTwo}</button>
        </div>
        </div>
    )
}
export default CounterOne;