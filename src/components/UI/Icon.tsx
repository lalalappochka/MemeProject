import IcomoonReact from 'icomoon-react'
import { FC } from 'react'
import colors from '../../constants/colors'
import iconSet from '../../assets/selection.json'

export interface IconProps {
  icon: string
  color: string
  size: number
}

const Icon: FC<IconProps> = ({ icon, color, size }: IconProps) => (
  <IcomoonReact
    iconSet={iconSet}
    icon={icon!}
    color={color || colors.orange}
    size={size || 24}
  />
)

export default Icon
