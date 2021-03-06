import styled from 'styled-components'
import UserItem from './UserItem'
import UserItemSkeleton from './UserItemSkeleton'

import { User } from '../../shared/models/types'

const StyledUserList = styled.ul`
  list-style: none;
  width: 95%;
  max-width: 20rem;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
`

type UserListProps = {
  users: User[] | null
}

const UserList: React.FC<UserListProps> = (props) => {
  if (!props.users) {
    return (
      <StyledUserList>
        {[...Array(3)].map((item, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </StyledUserList>
    )
  }
  if (props.users.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    )
  }
  return (
    <StyledUserList>
      {props.users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </StyledUserList>
  )
}

export default UserList
