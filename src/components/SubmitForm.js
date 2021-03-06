import React from 'react';
import {Form,Input,Tooltip,Icon,Select,Button} from 'antd';

class SubmitForm extends React.Component{
    state = {
        confirmDirty: false
      };
    handleOnFormSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            //console.log('Received values of form: ', values);
            if(this.props.selectedUser.email===''){
              this.props.storeUserInfo(values);
            }
            else{
              this.props.handleUpdate(this.props.selectedUser.id,values);
            }
            this.props.form.resetFields();
          }
         
        });
    }
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };

      handleButtonText=()=>{
        // console.log(this.props.selectedUser.email);
        if(this.props.selectedUser.email===''){
          return "Register";
        }
        else{
          return "Edit";
        }
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        
        const formItemLayout = {
            labelCol: {
              xs: { span: 12 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 12 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+91</Option>
              <Option value="87">+87</Option>
            </Select>,
          );
          
          //console.log(this.props.form)
        return(
            
            <div style={{paddingTop:"10px"}}>
            <Form {...formItemLayout} onSubmit={this.handleOnFormSubmit} ref={form => this.form = form}>
            <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              initialValue:this.props.selectedUser.email,
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            initialValue:this.props.selectedUser.password,
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {

            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
          <Form.Item 
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          >
          {getFieldDecorator('name', {
            initialValue:this.props.selectedUser.name,
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}   
          </Form.Item>
          <Form.Item label="Phone Number">
          {getFieldDecorator('phone', 
          {
            initialValue:this.props.selectedUser.phone,
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
           { this.handleButtonText()}
          </Button>
        </Form.Item>
        </Form>
        </div>
        )
    }
}
export default Form.create()(SubmitForm);