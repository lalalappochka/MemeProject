import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'

interface PanelProps {
  text: string
  profileUrl: string
}

const UserPanel: FC<PanelProps & HTMLAttributes<HTMLInputElement>> = ({
  text,
  profileUrl,
}) => {
  return (
    <Panel>
      <Image src={profileUrl}></Image>
      {text}
    </Panel>
  )
}
const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
  gap: 5px;
  font-size: 15px;
`
const Image = styled.img`
  border-radius: 100px;
  height: 90px;
  width: 90px;
`

export default UserPanel
