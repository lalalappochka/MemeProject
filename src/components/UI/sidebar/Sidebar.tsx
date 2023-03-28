import { useMemo } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import { ItemProps } from './SideBarItem'
import SidebarItem from './SideBarItem'

const Sidebar = () => {
  const items: ItemProps[] = useMemo(
    () => [
      {
        icon: 'home',
        iconColor: colors.orange,
        size: 24,
        text: 'Home',
        route: '/',
      },
      {
        icon: 'mem',
        iconColor: colors.orange,
        size: 24,
        text: 'Create mem',
        route: '/',
      },
      {
        icon: 'user',
        iconColor: colors.orange,
        size: 24,
        text: 'Profile',
        route: '/user-profile',
      },
    ],
    []
  )
  return (
    <SidebarContainer>
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

const SidebarContainer = styled.div``
export default Sidebar
