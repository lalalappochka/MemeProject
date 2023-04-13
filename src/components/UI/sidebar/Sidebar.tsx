import { useMemo } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import { ItemProps } from './SideBarItem'
import SidebarItem from './SideBarItem'
import UserPanel from './UserPanel'
import profile from '../../../assets/profile.jpg'
import Icon from '../Icon'
import { useAppDispatch } from '../../../hooks/redux-hooks'
import { removeUser } from '../../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const items: ItemProps[] = useMemo(
    () => [
      {
        icon: 'home',
        iconColor: colors.night,
        size: 24,
        text: 'Home',
        route: '/home',
      },
      {
        icon: 'mem',
        iconColor: colors.night,
        size: 24,
        text: 'Create mem',
        route: '/create-memes',
      },
      {
        icon: 'mem',
        iconColor: colors.night,
        size: 24,
        text: 'My memes',
        route: '/my-memes',
      },
      {
        icon: 'user',
        iconColor: colors.night,
        size: 24,
        text: 'Profile',
        route: '/user-profile',
      },
    ],
    []
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSignOut = () => {
    dispatch(removeUser())
    navigate('/login')
  }
  return (
    <SidebarContainer>
      <UserPanel text='Lalalappochka' profileUrl={profile} />
      {items.map((value, index) => (
        <SidebarItem
          key={'SidebarItem' + index}
          icon={value.icon}
          iconColor={value.iconColor}
          size={value.size}
          text={value.text}
          route={value.route}
        />
      ))}
      <Icon
        icon='sign-out'
        color={colors.night}
        size={24}
        style={{ marginTop: '340px', marginLeft: '10px' }}
        onClick={handleSignOut}
      />
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  font-family: 'Poppins Regular';
  font-size: 12px;
  background-color: ${colors.cyan};
  box-shadow: 1px 0 5px 0 rgba(18, 3, 54, 0.2);
`
export default Sidebar
