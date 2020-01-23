import React,{useReducer,useEffect} from 'react';
import axios from 'axios';
import DataFetching from './DataFetching';

const initialState={
    loading:true,
    post:{},
    error:''
};
const reducer=(state,action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS':
            return({
                loading:false,
                post:action.data,
                error:''
            })
        case 'FETCH_ERROR':
            return({
                loading:false,
                post:{},
                error:'Something Went wrong'
            })
        default:
            return state

    }
}
function DataFetchingTwo(){
    const[state,dispatch]=useReducer(reducer,initialState);
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(response=>{
            dispatch({type:'FETCH_SUCCESS',data:response.data})
        })
        .catch(error=>{
            dispatch({type:'FETCH_ERROR'})
        })
    },[])
    return(
        <div>
            {state.loading?'Loading...':state.post.title}
            {state.error?state.error:''};
        </div>
    )
}
export default DataFetchingTwo;