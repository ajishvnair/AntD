import React from 'react';
import {Card} from 'antd';

export default (props)=>(
    <div>
    <Card title="User iformation"  style={{ width: 300 }}>
      <p>Email :  {props.userInfo.email}</p>
      <p>NickName  :  {props.userInfo.nickname}</p>
      <p>Phone  :  {props.userInfo.phone}</p>
    </Card>
    </div>
)