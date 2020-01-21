import React from 'react';
import { Table,Divider} from 'antd';

export default (props)=>{
  const columns=[
    {
      title:'NickName',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title:'Email',
      dataIndex: 'email',
      key: 'email',

    },
    {
      title:'Phone Number',
      dataIndex: 'phone',
      key: 'phone',

    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#"
            onClick={(e)=>{
              e.preventDefault();
              props.handleEdit(record);
            }}
            >Edit</a>
            <Divider type="vertical" />
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              props.handleDelete(record.id);
            }}>Delete</a>
          </span>
        )
    }

    
  ]
  return(
    <Table rowKey="id" columns={columns} dataSource={props.users} />
  )
}
   
