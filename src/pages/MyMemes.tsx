import MemPost from '../components/MemPost'
import Sidebar from '../components/UI/sidebar/Sidebar'
import profile from '../assets/profile.jpg'
import prof from '../assets/profOriental.jpg'
import mem from '../assets/profile.jpg'
import styled from 'styled-components'
import cat from '../assets/catMeme.jpg'
import memeskiska from '../assets/memes_kiska.png'
import colors from '../constants/colors'

const MyMemes = () => {
  return (
    <PageWrapper>
      <Sidebar />
      <MemesList>
        <MemPost imgUrl={profile} text='Lalalappochka' memUrl={mem}></MemPost>
        <MemPost imgUrl={prof} text='Lalalappochka' memUrl={prof}></MemPost>
        <MemPost imgUrl={prof} text='Lalalappochka' memUrl={cat}></MemPost>
        <MemPost
          imgUrl={prof}
          text='Lalalappochka'
          memUrl={memeskiska}
        ></MemPost>
      </MemesList>
    </PageWrapper>
  )
}

export const PageWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${colors.darkblue};
`

export const MemesList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 1336px;
  background-color: aliceblue;
  height: 100%;
  padding: 20px 0;
`

export default MyMemes
