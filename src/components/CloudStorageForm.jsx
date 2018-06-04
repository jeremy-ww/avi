import '../styles/cloud-storage-form.scss'
import { translate } from 'react-i18next'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const FormItem = Form.Item

export class WrappedCloudStorageForm extends React.Component {
  render () {
    return (
      <CloudStorageForm {...this.props}></CloudStorageForm>
    )
  }
}

@translate(['translations'])
export default class CloudStorageForm extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    t: PropTypes.func
  }

  render () {
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 18 }
      }
    }
    const { props: { t } } = this
    return (
      <Form className="cloud-storage-form">
        <FormItem {...formItemLayout} label={t('setting.cloud.resource')}>
          <Input />
        </FormItem>
        <FormItem {...formItemLayout} label="Access Key">
          <Input />
        </FormItem>
        <FormItem {...formItemLayout} label="Secret Key">
          <Input type="password" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={t('setting.cloud.prefix')}>
          <Input placeholder={`Example: ${this.props.placeholder}`} />
        </FormItem>
      </Form>
    )
  }
}
