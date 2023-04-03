import styled from 'styled-components'
import Sidebar from '../components/UI/sidebar/Sidebar'
import { PageWrapper } from './MyMemes'

const CreateMemes = () => {
  return (
    <PageWrapper>
      <Sidebar />
      <AddPanel></AddPanel>
    </PageWrapper>
  )
}

const AddPanel = styled.div`
  display: flex;
  justify-content: center;
`

export default CreateMemes
