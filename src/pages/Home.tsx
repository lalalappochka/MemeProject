import MemPost from '../components/MemPost'
import Sidebar from '../components/UI/sidebar/Sidebar'
import profile from '../assets/profile.jpg'
import prof from '../assets/profOriental.jpg'
import mem from '../assets/profile.jpg'
import styled from 'styled-components'
import cat from '../assets/catMeme.jpg'
import memeskiska from '../assets/memes_kiska.png'
import { PageWrapper, MemesList } from './MyMemes'

const Home = () => {
  return (
    <PageWrapper>
      <Sidebar />
      <MemesList>
        <MemPost imgUrl={profile} text='Lalalappochka' memUrl={mem}></MemPost>
        <MemPost imgUrl={prof} text='Lapa' memUrl={prof}></MemPost>
        <MemPost imgUrl={prof} text='neLapa' memUrl={cat}></MemPost>
        <MemPost imgUrl={prof} text='neLapa' memUrl={memeskiska}></MemPost>
      </MemesList>
    </PageWrapper>
  )
}
const Title = styled.h2``
export default Home
