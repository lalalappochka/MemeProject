import IcomoonReact from 'icomoon-react'
import { FC } from 'react'
import colors from '../../constants/colors'
import iconSet from '../../assets/selection.json'
import { CSSProperties } from 'styled-components'

export interface IconProps {
  icon: string
  color: string
  size: number
  style?: CSSProperties
  onClick?: () => void
}

const Icon: FC<IconProps> = ({
  icon,
  color,
  size,
  style,
  onClick,
}: IconProps) => (
  <IcomoonReact
    iconSet={iconSet}
    icon={icon!}
    color={color || colors.orange}
    size={size || 24}
    style={style}
    onClick={onClick}
  />
)

export default Icon
