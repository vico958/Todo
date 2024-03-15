import { ListItem, List } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <List color="white" fontSize="26px" spacing={4}>
        <ListItem>
            <NavLink to ="/">
                Dashboard
            </NavLink>
        </ListItem>

        <ListItem>
            <NavLink to="/create">
                New Task
            </NavLink>
        </ListItem>

        <ListItem>
            <NavLink to="/profile">
                Profile
            </NavLink>
        </ListItem>
    </List>
  )
}

export default Sidebar