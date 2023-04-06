import styled from 'styled-components'
import Sidebar from '../components/UI/sidebar/Sidebar'
import colors from '../constants/colors'
import pic from '../assets/profOriental.jpg'
import Button from '../components/UI/Button'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PageWrapper } from './Home'
import { Position } from '../models/enums/Position'
import { IColor } from '../models/IColor'

const CreateMemes = () => {
  const spacingWidths: number[] = useMemo(
    () => [10, 15, 20, 25, 35, 45, 50],
    []
  )
  const spacingColors: IColor[] = useMemo(
    () => [
      { name: 'Blue', value: colors.blue },
      { name: 'Orange', value: colors.orange },
    ],
    []
  )
  const [spacingPosition, setSpacingPosition] = useState(Position.Top)
  const [spacingColor, setSpacingColor] = useState(spacingColors[0].value)
  const [showSpacing, setShowSpacing] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [spacing, setSpacing] = useState(spacingWidths[0] / 100)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentPic, setCurrentPic] = useState(pic)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    fillCanvas(canvas!, ctx!)
  }, [showSpacing, spacing, spacingPosition, spacingColor])

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
        blockHeight = canvas.height * spacing
        canvas.height = canvas.height + blockHeight

        ctx.fillStyle = spacingColor

        switch (spacingPosition) {
          case Position.Top:
            ctx.fillRect(0, 0, canvas.width, blockHeight)
            ctx.drawImage(
              img,
              0,
              blockHeight,
              canvas.width,
              canvas.height - blockHeight
            )
            break
          case Position.Bottom:
            ctx.fillRect(0, img.height, canvas.width, blockHeight)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height - blockHeight)
            break
          case Position.TopAndBottom:
            canvas.height = canvas.height + blockHeight
            ctx.fillStyle = spacingColor
            ctx.fillRect(0, 0, canvas.width, blockHeight)
            ctx.fillRect(
              0,
              canvas.height - blockHeight,
              canvas.width,
              blockHeight
            )
            ctx.drawImage(
              img,
              0,
              blockHeight,
              canvas.width,
              canvas.height - blockHeight * 2
            )
            break
        }
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }
  }

  // let isPainting = false
  // let lineWidth = 5
  // let startX
  // let startY
  // const drawCanvas = () => {
  //   isPainting = true
  // }

  return (
    <PageWrapper>
      <Sidebar />
      <AddPanel>
        <Header>
          <Button
            text='Rotate'
            onClick={() => setRotation((prev) => prev + 90)}
            style={{
              width: '50px',
              fontSize: '10px',
              borderRadius: '10px',
            }}
          ></Button>
          <Button
            text='Spacing'
            onClick={() => setShowSpacing((prev) => !prev)}
            style={{
              width: '50px',
              fontSize: '10px',
              borderRadius: '10px',
            }}
          ></Button>
          <Button
            text='Add Image'
            // onClick={}
            style={{
              width: '70px',
              fontSize: '10px',
              borderRadius: '10px',
            }}
          ></Button>
          <Button
            text='Draw'
            // onClick={}
            style={{
              width: '50px',
              fontSize: '10px',
              borderRadius: '10px',
            }}
          ></Button>
        </Header>
        <SpacingSelections>
          <PositionSelection
            onChange={(e) => setSpacingPosition(parseInt(e.target.value))}
          >
            <option value={Position.Top}>Top</option>
            <option value={Position.Bottom}>Bottom</option>
            <option value={Position.TopAndBottom}>Top and Bottom</option>
          </PositionSelection>
          <ColorSelection onChange={(e) => setSpacingColor(e.target.value)}>
            {spacingColors.map((value, key) => (
              <option value={value.value} key={`SizeSelection${key}`}>
                {value.name}
              </option>
            ))}
          </ColorSelection>
          <SizeSelection
            onChange={(e) => setSpacing(parseFloat(e.target.value))}
          >
            {spacingWidths.map((value, key) => (
              <option
                value={value / 100}
                key={`SizeSelection${key}`}
              >{`${value.toString()}%`}</option>
            ))}
          </SizeSelection>
          <input id='stroke' name='stroke' type='color' />
          <input id='linewidth' name='linewidth' type='number' value='5' />
          <Button
            id='clear'
            // onClick={() =>}
            text='Clear'
            style={{
              width: '50px',
            }}
          ></Button>
        </SpacingSelections>
        {/* <Spacing ref={divRef} /> */}
        <MemCanvas
          ref={canvasRef}
          style={{ transform: `rotate(${rotation}deg)` }}
        ></MemCanvas>
      </AddPanel>
    </PageWrapper>
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
  width: 300px;
  height: 50px;
  margin-left: 100px;
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
