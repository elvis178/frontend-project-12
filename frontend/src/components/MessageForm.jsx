import { Button, Form } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useFormik } from 'formik'
import * as filter from 'leo-profanity'
import { useAddMessageMutation } from '../api/apiMessages'
import useAuth from '../hooks/index'

const MessageForm = ({ activeChannelId }) => {
  const { t } = useTranslation()
  const formControlEl = useRef(null)
  const { username } = useAuth()
  const [addMessage] = useAddMessageMutation()

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      try {
        const filteredBody = filter.clean(values.body)
        const newMessage = { body: filteredBody, channelId: activeChannelId, username }
        await addMessage(newMessage)
        formik.resetForm()
        formControlEl.current.focus()
      }
      catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit} noValidate>
        <Form.Group className="input-group has-validation">
          <Form.Control
            name="body"
            required
            aria-label={t('formMesseges.input')}
            placeholder={t('formMesseges.placeholder')}
            className="border-0 p-0 ps-2"
            value={formik.values.body}
            ref={formControlEl}
            onChange={formik.handleChange}
            autoFocus
          />
          <Button
            type="submit"
            disabled={!formik.values.body}
            className="btn-group-vertical"
            variant="light"
          >
            <ArrowRightSquare size={20} />
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default MessageForm
