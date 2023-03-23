import { FC, HTMLAttributes, CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import Icon, { IconProps } from './Icon'

interface ButtonProps {
  text?: string
  style?: CSSProperties
  icon?: ReactNode
}

const Button: FC<ButtonProps & HTMLAttributes<HTMLInputElement>> = ({
  text,
  style,
  icon,
}) => {
  return (
    <SimpleButton style={style}>
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
`

export default Button
