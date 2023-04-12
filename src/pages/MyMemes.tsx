import MemPost from '../components/MemPost'
import Sidebar from '../components/UI/sidebar/Sidebar'
import profile from '../assets/profile.jpg'
import prof from '../assets/profOriental.jpg'
import mem from '../assets/profile.jpg'
import styled from 'styled-components'
import cat from '../assets/catMeme.jpg'
import memeskiska from '../assets/memes_kiska.png'
import colors from '../constants/colors'
import { useMemo } from 'react'
import { PageWrapper } from './Home'

const MyMemes = () => {
  // const myPosts: MemProps[] = useMemo(
  //   () => [
  //     {
  //       imgUrl: profile,
  //       text: 'Lalalappochka',
  //       memUrl: mem,
  //     },
  //     {
  //       imgUrl: prof,
  //       text: 'Lalalappochka',
  //       memUrl: prof,
  //     },
  //     {
  //       imgUrl: prof,
  //       text: 'Lalalappochka',
  //       memUrl: cat,
  //     },
  //     {
  //       imgUrl: prof,
  //       text: 'Lalalappochka',
  //       memUrl: memeskiska,
  //     },
  //   ],
  //   []
  // )
  return (
    <PageWrapper>
      <Sidebar />
      <MemesList>
        {/* {myPosts.map((value, index) => (
          <MemPost
            key={'SidebarItem' + index}
            imgUrl={value.imgUrl}
            text={value.text}
            memUrl={value.memUrl}
          />
        ))} */}
      </MemesList>
    </PageWrapper>
  )
}

export const MemesList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 1336px;
  background-color: ${colors.aliceblue};
  height: 100%;
  padding: 20px 0;
`

export default MyMemes
