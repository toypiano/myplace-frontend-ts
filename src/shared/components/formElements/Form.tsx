import React, { ReactNode } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  width: 100%;
  input,
  textarea {
    margin-bottom: 1em;
  }
  .form-actions {
    text-align: right;
  }
`

type FormProps = {
  className?: string
  children: ReactNode
  buttons: ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

const Form = (props: FormProps) => {
  return (
    <StyledForm className={props.className}>
      {props.children}
      <div className="form-actions">{props.buttons}</div>
    </StyledForm>
  )
}

export default Form