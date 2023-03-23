import styled from 'styled-components'
import colors from '../../constants/colors'
import { FC, HTMLAttributes } from 'react'

interface InputProps {
  type?: string
  placeholder: string
}

const Input: FC<InputProps & HTMLAttributes<HTMLInputElement>> = ({
  type,
  placeholder,
}: InputProps) => {
  return <InfoInput type={type} placeholder={placeholder}></InfoInput>
}

const InfoInput = styled.input`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  height: 25px;
  width: 240px;
  text-indent: 10px;
  background-color: ${colors.white};
  border-color: ${colors.grey};
  font-family: 'Poppins Regular';
  font-size: 10px;
  margin-bottom: 14px;
`
export default Input
