import { Form, Input, Button } from 'antd'
import '../styles/cloud-storage-form.scss'
import setting from '../utils/setting'
import PropTypes from 'prop-types'
import user from '../stores/user'
import { repeat } from 'lodash'
import { t } from 'i18next'
import React from 'react'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
}

const StorageFormItem = function (field, secrets = {}, getFieldDecorator) {
  const name = field.name || field
  const type = field.type || 'text'
  return (
    <FormItem {...formItemLayout} label={name} key={name}>
      {getFieldDecorator(name, {
        rules: [{ required: true, whitespace: true, message: t('setting.common.cloud.validate', { field: name }) }]
      })(<Input placeholder={repeat('*', secrets[name] || 0)} type={type} autoComplete="off" />)}
    </FormItem>
  )
}

class CloudStorageForm extends React.Component {
  static propTypes = {
    fields: PropTypes.array,
    form: PropTypes.object,
    name: PropTypes.string
  }

  el = React.createRef()

  state = {
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { name } = this.props
        this.setState({ loading: true })
        setting({ [name]: values })
          .then(() => { user.requestUserInfo() })
          .finally(() => {
            this.setState({ loading: false })
          })
      }
    })
  }

  disableDetectPaste = e => {
    if (e.target.tagName === 'INPUT') e.stopPropagation()
  }

  render () {
    const { props: { fields, name, form: { getFieldDecorator } }, state: { loading } } = this

    return (
      <section ref={this.el} className="cloud-storage-form">
        <Form onSubmit={this.handleSubmit}>
          {fields.map(field => StorageFormItem(field, user[name], getFieldDecorator))}
          <FormItem className="save-button">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}>
              {t('setting.common.cloud.submit')}
            </Button>
          </FormItem>
        </Form>
      </section>
    )
  }

  componentDidMount = () => {
    const { el: { current: element }, disableDetectPaste } = this
    element.addEventListener('paste', disableDetectPaste)
  }

  componentWillUnmount = () => {
    const { el: { current: element }, disableDetectPaste } = this
    element.removeEventListener('paste', disableDetectPaste)
  }
}

export default Form.create()(CloudStorageForm)
