import styled, { CSSProperties } from 'styled-components'
import { FC, HTMLAttributes } from 'react'

interface ImgProps {
  imgUrl: string
  style?: CSSProperties
}

const MemImg: FC<ImgProps & HTMLAttributes<HTMLInputElement>> = ({
  imgUrl,
  style,
}) => {
  return <Image src={imgUrl} style={style}></Image>
}

const Image = styled.img`
  width: 500px;
  height: 500px;
  transition: transform 0.2s ease-in-out;
`

export default MemImg
