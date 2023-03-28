import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import Icon from '../Icon'
import colors from '../../../constants/colors'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface ItemProps {
  icon: string
  iconColor: string
  size: number
  text: string
  route: string
}
const SidebarItem: FC<ItemProps & HTMLAttributes<HTMLInputElement>> = ({
  icon,
  iconColor,
  size,
  text,
  route,
}) => {
  const location = useLocation()
  return (
    <LinkWrapper to={route}>
      <Bar>
        {location.pathname === route && <ActivityIndicator />}
        <Icon icon={icon} size={size} color={iconColor} />
        {text}
      </Bar>
    </LinkWrapper>
  )
}
const Bar = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 200px;
`
const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: ${colors.blue};
`
const ActivityIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 5px;
  height: 40px;
  background-color: ${colors.orange};
`

export default SidebarItem
