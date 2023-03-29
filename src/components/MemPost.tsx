import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'

interface MemProps {
  imgUrl: string
  text: string
  memUrl: string
}
const MemPost: FC<MemProps & HTMLAttributes<HTMLInputElement>> = ({
  imgUrl,
  text,
  memUrl,
}) => {
  return (
    <Post>
      <Header>
        <Profile src={imgUrl} />
        {text}
      </Header>
      <Mem src={memUrl} />
    </Post>
  )
}

const Post = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 500px;
  width: 500px;
  margin-top: 40px;
  background-color: ${colors.gainsboro};
  border-radius: 20px;
  box-shadow: 4px 2px 10px ${colors.grey};
`
const Profile = styled.img`
  border-radius: 100px;
  height: 70px;
  width: 70px;
  margin-right: 10px;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  margin-bottom: 10px;
`
const Mem = styled.img`
  height: 350px;
  width: 400px;
`

export default MemPost
