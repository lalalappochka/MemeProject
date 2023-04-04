import MemPost, { MemProps } from '../components/MemPost'
import Sidebar from '../components/UI/sidebar/Sidebar'
import profile from '../assets/profile.jpg'
import prof from '../assets/profOriental.jpg'
import mem from '../assets/profile.jpg'
import styled from 'styled-components'
import cat from '../assets/catMeme.jpg'
import memeskiska from '../assets/memes_kiska.png'
import { MemesList } from './MyMemes'
import { useMemo } from 'react'

const Home = () => {
  const posts: MemProps[] = useMemo(
    () => [
      {
        imgUrl: profile,
        text: 'Lalalappochka',
        memUrl: mem,
      },
      {
        imgUrl: prof,
        text: 'Lalalappochka',
        memUrl: prof,
      },
      {
        imgUrl: prof,
        text: 'Lalalappochka',
        memUrl: cat,
      },
      {
        imgUrl: prof,
        text: 'Lalalappochka',
        memUrl: memeskiska,
      },
    ],
    []
  )
  return (
    <PageWrapper>
      <Sidebar />
      <MemesList>
        {posts.map((value, index) => (
          <MemPost
            key={'SidebarItem' + index}
            imgUrl={value.imgUrl}
            text={value.text}
            memUrl={value.memUrl}
          />
        ))}
      </MemesList>
    </PageWrapper>
  )
}
export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
export default Home
