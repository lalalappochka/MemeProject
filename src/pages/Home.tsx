import Sidebar from '../components/UI/sidebar/Sidebar'
import styled from 'styled-components'
import { MemesList } from './MyMemes'
import { useMemo } from 'react'
import { useGetMemesQuery } from '../store/services/meme.api'
import { IMeme } from '../models/IMeme'
import MemPost from '../components/MemPost'

const Home = () => {
  const { data } = useGetMemesQuery()
  const posts: IMeme[] | undefined = useMemo(() => data, [data])
  return (
    <PageWrapper>
      <Sidebar />
      <MemesList>
        {posts &&
          posts.map((value) => (
            <MemPost key={'SidebarItem' + value.id} meme={value} />
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
