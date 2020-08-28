import React, { useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'
import Avatar from '../UIElements/Avatar'

import { StyledUser } from './navigation-styles'

type UserProps = {
  small?: boolean
}

const User = ({ small }: UserProps) => {
  const auth = useContext(AuthContext)
  return (
    <StyledUser small={!!small}>
      <div className="user__avatar">
        <Avatar
          src={
            auth.userImageUrl || require('../../image/Portrait_Placeholder.png')
          }
          alt={auth.userName || ''}
        />
      </div>
      <section className="user__body">
        <h1>{auth.userName}</h1>
        {small ? null : <p>See your places</p>}
      </section>
    </StyledUser>
  )
}

export default User