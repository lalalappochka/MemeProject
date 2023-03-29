import { useMemo } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import { ItemProps } from './SideBarItem'
import SidebarItem from './SideBarItem'
import UserPanel from './UserPanel'
import profile from '../../../assets/profile.jpg'

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
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 200px;
  font-family: 'Poppins Regular';
  font-size: 12px;
  color: ${colors.orange};
`
export default Sidebar
