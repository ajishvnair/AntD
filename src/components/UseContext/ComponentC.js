import React from 'react';
import {userContext} from '../App';
function ComponentC(){
    return(
        <div>
        <userContext.Consumer>
        {
            user=>(user)
        }
        </userContext.Consumer>
        </div>
    )
}
export default ComponentC;