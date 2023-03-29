import { FC, HTMLAttributes, CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import Icon, { IconProps } from './Icon'

interface ButtonProps {
  text?: string
  style?: CSSProperties
  icon?: ReactNode
  onClick?: () => void
}

const Button: FC<ButtonProps & HTMLAttributes<HTMLInputElement>> = ({
  text,
  style,
  icon,
  onClick,
}) => {
  return (
    <SimpleButton style={style} onClick={onClick}>
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
