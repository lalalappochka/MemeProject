import {
  FC,
  HTMLAttributes,
  CSSProperties,
  ReactNode,
  ButtonHTMLAttributes,
} from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import Icon, { IconProps } from './Icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  style?: CSSProperties
  icon?: ReactNode
  // onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  text,
  style,
  icon,
  // onClick,
  ...nativeButtonProps
}) => {
  return (
    <SimpleButton style={style} {...nativeButtonProps}>
      {text}
      {icon}
    </SimpleButton>
  )
}

const SimpleButton = styled.button`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 30px;
  height: 30px;
  width: 250px;
  font-family: 'Poppins Regular';
  background-color: ${colors.orange};
  color: ${colors.night};
`

export default Button
