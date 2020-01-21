import React from 'react';
import { 
    Layout,
    Row,
    Col
 } from 'antd';
 import Header from './Header';
 const {Content} = Layout;
import SubmitForm from './SubmitForm';
import DisplayInfo from './DisplayInfo';

class Container extends React.Component{
    state={
       selectedUser:{
        id: "",
        name: "",
        phone:"",
        email: "",
        password: ""
       },
       users:[]
    };
    storeUserInfo=(userInfo)=>{
        const user={
            name:userInfo['name'],
            phone:userInfo['phone'],
            email:userInfo['email'],
            password:userInfo['password']
        };
        fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        this.setState((prevState)=>({
            users:prevState.users.concat(userInfo),
            selectedUser:{
                id: "",
                name: "",
                phone:"",
                email: "",
                password: ""
              }  
        }))

        
    }
    handleDelete=(id)=>{
        fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE'
        })
        this.setState((prevState)=>({
            users:prevState.users.filter((user)=>user.id!==id)
        }))
    }
    handleEdit=(selectedUser)=>{
        this.setState(()=>({selectedUser}));
    }
    handleUpdate=(id,updatedDate)=>{
        const users=this.state.users.slice();
        for(let i=0;i<users.length;i++){
            if(users[i].id===id){
                users[i].name=updatedDate['name'];
                users[i].phone=updatedDate['phone'];
                users[i].email=updatedDate['email'];
                users[i].password=updatedDate['password'];
            }
        }
        this.setState(()=>({users,
              selectedUser:{
                id: "",
                name: "",
                phone:"",
                email: "",
                password: ""
              }  
        }));
        fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name:updatedDate['name'],
            phone:updatedDate['phone'],
            email:updatedDate['email'],
            password:updatedDate['password'],
            id:id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    }
    render(){
        return(
            <div>
            <Layout>
                <Header/>
                <Row>
                    <Col span={13}>
                        <SubmitForm selectedUser={this.state.selectedUser} 
                        storeUserInfo={this.storeUserInfo}
                        handleUpdate={this.handleUpdate}
                        />
                    </Col>
                    <Col span={11}>
                       {this.state.users.length!==0 && <DisplayInfo 
                        users={this.state.users} 
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        
                        />}
                    </Col>
                </Row>   
            </Layout>
            </div>
            
        )
    }
    componentDidMount(){
       const data= fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(users => {
            this.setState(()=>({users}));
        });
        
    }
    
}
export default Container;