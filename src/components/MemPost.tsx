import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import { IMeme } from '../models/IMeme'

interface MemProps {
  meme: IMeme
}
const MemPost: FC<MemProps & HTMLAttributes<HTMLInputElement>> = ({ meme }) => {
  return (
    <Post>
      <Header>
        {/* <Profile src={imgUrl} /> */}
        {meme.name}
      </Header>
      <Mem src={meme.url} />
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
  /* margin-top: 10px; */
  margin-bottom: 4px;
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
