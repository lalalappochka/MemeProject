import Sidebar from '../components/UI/sidebar/Sidebar'
import styled from 'styled-components'
import colors from '../constants/colors'
import { PageWrapper } from './Home'
import { useGetMemesQuery } from '../store/services/meme.api'
import { IMeme } from '../models/IMeme'
import { useMemo } from 'react'
import MemPost from '../components/MemPost'

const MyMemes = () => {
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
