import styled from 'styled-components'
import Sidebar from '../components/UI/sidebar/Sidebar'
import colors from '../constants/colors'
import { Container } from './Login'
import MemImg from '../components/UI/mems/MemImg'
import pic from '../assets/profOriental.jpg'
import Button from '../components/UI/Button'
import { useEffect, useMemo, useRef, useState } from 'react'

const CreateMemes = () => {
  const [showSpacing, setShowSpacing] = useState(false)
  const [rotation, setRotation] = useState(0)
  // const [spacing, setSpacing] = useState(0.1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentPic, setCurrentPic] = useState(pic)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    fillCanvas(canvas!, ctx!)
  }, [showSpacing])

  const fillCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const img = new Image()

    img.src = currentPic

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      let blockHeight

      if (showSpacing) {
        const blockWidth = canvas.width
        blockHeight = canvas.height * 0.1
        canvas.height += blockHeight

        ctx.fillStyle = 'red'

        ctx.fillRect(0, 0, blockWidth, blockHeight)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, blockHeight ?? 0, canvas!.width, canvas!.height)
    }
  }

  return (
    <Container>
      <Sidebar />
      <AddPanel>
        <Header>
          <Button
            text='Rotate'
            onClick={() => setRotation((prev) => prev + 90)}
            style={{
              width: '50px',
              fontSize: '10px',
            }}
          ></Button>
          <Button
            text='Spacing'
            onClick={() => setShowSpacing((prev) => !prev)}
            style={{
              width: '50px',
              fontSize: '10px',
            }}
          ></Button>
          <Button
            text='Add Image'
            // onClick={}
            style={{
              width: '50px',
              fontSize: '10px',
            }}
          ></Button>
          <Button
            text='Draw'
            style={{
              width: '50px',
              fontSize: '10px',
            }}
          ></Button>
        </Header>
        <SpacingSelections>
          <PositionSelection>
            <option value='top'>Top</option>
            <option value='bottom' selected>
              Bottom
            </option>
            <option value='bothPositions'>Top and Bottom</option>
          </PositionSelection>
          <ColorSelection>
            <option value='black'>Black</option>
            <option value='white' selected>
              White
            </option>
          </ColorSelection>
          <SizeSelection>
            <option value='10' selected>
              10%
            </option>
            <option value='15'>15%</option>
            <option value='20'>20%</option>
            <option value='25'>25%</option>
            <option value='35'>35%</option>
            <option value='45'>45%</option>
            <option value='50'>50%</option>
          </SizeSelection>
        </SpacingSelections>
        {/* <Spacing ref={divRef} /> */}
        <MemCanvas
          ref={canvasRef}
          style={{ transform: `rotate(${rotation}deg)` }}
        ></MemCanvas>
        {/* <MemImg
          imgUrl={pic}
          style={{
            marginLeft: '50px',
            height: '350px',
            width: '400px',
            transform: `rotate(${rotation}deg)`,
          }}
        /> */}
      </AddPanel>
    </Container>
  )
}

const AddPanel = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 731px;
  width: 1336px;
  background-color: ${colors.aliceblue};
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 200px;
  height: 200px;
`

const MemCanvas = styled.canvas`
  margin: 0 auto;
  transition: transform 0.2s ease-in-out;
`
const SpacingSelections = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 250px;
`
const PositionSelection = styled.select`
  display: block;
  font-family: 'Poppins Regular';
  font-size: 11px;
  option {
    font-family: sans-serif;
  }
`
const ColorSelection = styled.select`
  display: block;
  font-family: 'Poppins Regular';
  font-size: 11px;
  option {
    font-family: sans-serif;
  }
`
const SizeSelection = styled.select`
  display: block;
  font-family: 'Poppins Regular';
  font-size: 11px;
  option {
    font-family: sans-serif;
  }
`

export default CreateMemes
