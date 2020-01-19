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
        status:"unfilled",
        userInfo:{ }
    };
    storeUserInfo=(userInfo)=>{
        // console.log('from main page');
        let status="filled";
        this.setState(()=>({status,userInfo}));
    }
    render(){
        return(
            <div>
            <Layout>
                <Header/>
                <Row>
                    <Col span={15}>
                        <SubmitForm storeUserInfo={this.storeUserInfo}/>
                    </Col>
                    <Col span={9}>
                       {this.state.status!=='unfilled' && <DisplayInfo 
                       userInfo={this.state.userInfo}/>} 
                    </Col>
                </Row>   
            </Layout>
            </div>
            
        )
    }
}
export default Container;