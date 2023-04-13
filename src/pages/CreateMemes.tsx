import styled from 'styled-components'
import Sidebar from '../components/UI/sidebar/Sidebar'
import colors from '../constants/colors'
import Button from '../components/UI/Button'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { PageWrapper } from './Home'
import { Position } from '../models/enums/Position'
import { IColor } from '../models/IColor'
import { useGetMemesQuery } from '../store/services/meme.api'
import { IMeme } from '../models/IMeme'
import DraggableDiv, {
  START_DIV_HEIGHT,
  START_DIV_WIDTH,
} from '../components/DraggableDiv'
import Input from '../components/UI/Input'

const MAX_CANVAS_WIDTH = 500
const MAX_CANVAS_HEIGHT = 500

export interface Pos {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

interface DraggableInput {
  value: string
  position: Pos
  divSize: Size
  textSize: Size
}

const CreateMemes = () => {
  const { data } = useGetMemesQuery()
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
  const [currentPic, setCurrentPic] = useState<IMeme>()
  const memeTemplates: IMeme[] | undefined = useMemo(() => {
    if (data) {
      setCurrentPic(data[1])
    }
    return data
  }, [data])
  const [spacingPosition, setSpacingPosition] = useState(Position.Top)
  const [isDraggableShown, setIsDraggableShown] = useState(false)
  const [spacingColor, setSpacingColor] = useState(spacingColors[0].value)
  const [textInputs, setTextInputs] = useState<DraggableInput[]>([])
  const [showSpacing, setShowSpacing] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [spacing, setSpacing] = useState(spacingWidths[0] / 100)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  const drawCanvasRef = useRef<HTMLCanvasElement>(
    document.createElement('canvas')
  )
  const drawCanvasImageRef = useRef<HTMLImageElement>(new Image())
  const [isPainting, setIsPainting] = useState(false)
  const [paintingStroke, setPaintingStroke] = useState('#000')
  const [paintingWidth, setPaintingWidth] = useState(5)

  useEffect(() => {
    handleCanvasAction(fillCanvas)
  }, [showSpacing, spacing, spacingPosition, spacingColor, currentPic])

  useEffect(() => {
    handleCanvasAction(drawCanvas)
  }, [isPainting, paintingStroke, paintingWidth])

  const handleCanvasAction = (
    action: (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      drawCanvas: HTMLCanvasElement,
      drawCtx: CanvasRenderingContext2D
    ) => void
  ) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const drawCanvas = drawCanvasRef.current
    const drawCtx = drawCanvas.getContext('2d')!

    action(canvas!, ctx!, drawCanvas, drawCtx)
  }

  const fillCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawCanvas: HTMLCanvasElement,
    drawCtx: CanvasRenderingContext2D
  ) => {
    if (!currentPic) {
      return
    }

    const img = new Image(currentPic.width, currentPic.height)

    if (currentPic.width > MAX_CANVAS_WIDTH) {
      img.width = MAX_CANVAS_WIDTH
    }

    if (currentPic.height > MAX_CANVAS_HEIGHT) {
      img.height = MAX_CANVAS_HEIGHT
    }

    img.src = currentPic.url

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      drawCanvas.width = canvas.width
      drawCanvas.height = canvas.height

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
      if (drawCanvasImageRef.current.src) {
        ctx.drawImage(
          drawCanvasImageRef.current,
          0,
          0,
          canvas.width,
          canvas.height
        )
        drawCtx.drawImage(
          drawCanvasImageRef.current,
          0,
          0,
          drawCanvas.width,
          drawCanvas.height
        )
      }
      canvasWrapperRef.current!.style.width = `${canvas.width}px`
      canvasWrapperRef.current!.style.height = `${canvas.height}px`
    }
  }

  const drawCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawCanvas: HTMLCanvasElement,
    drawCtx: CanvasRenderingContext2D
  ) => {
    let lastX = 0
    let lastY = 0
    let isDrawing = false

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true
      lastX = e.offsetX
      lastY = e.offsetY
    }

    const draw = (ctx: CanvasRenderingContext2D, e: MouseEvent) => {
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineCap = 'round'
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.strokeStyle = paintingStroke
      ctx.lineWidth = paintingWidth
      ctx.stroke()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return

      draw(ctx, e)

      draw(drawCtx, e)

      lastX = e.offsetX
      lastY = e.offsetY
    }

    const handleMouseUpOut = () => {
      isDrawing = false
      drawCanvasImageRef.current.src = drawCanvas.toDataURL()
    }

    if (isPainting) {
      canvas.onmousedown = handleMouseDown
      canvas.onmousemove = handleMouseMove
      canvas.onmouseup = handleMouseUpOut
      canvas.onmouseout = handleMouseUpOut
    } else {
      canvas.onmousedown = null
      canvas.onmousemove = null
      canvas.onmouseup = null
      canvas.onmouseout = null
    }
  }

  const clearDrawing = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const drawCanvas = drawCanvasRef.current
    const drawCanvasCtx = drawCanvas.getContext('2d')!

    drawCanvasCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
    drawCanvasImageRef.current.src = ''

    fillCanvas(canvas!, ctx!, drawCanvas, drawCanvasCtx)
  }

  const handleAddTextInput = () => {
    const newDiv: DraggableInput = {
      value: '',
      position: { x: 0, y: 0 },
      divSize: { width: START_DIV_WIDTH, height: START_DIV_HEIGHT },
      textSize: { width: 0, height: 0 },
    }
    setTextInputs((prev) => [...prev, newDiv])
  }

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...textInputs]
    newValues[index] = {
      ...newValues[index],
      value: value,
    }
    setTextInputs(newValues)
  }

  const handleCreateMem = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawCanvas: HTMLCanvasElement,
    drawCtx: CanvasRenderingContext2D
  ) => {
    ctx.font = 'bold 22px Arial'
    ctx.fillStyle = 'black'
    textInputs.forEach((value) => {
      ctx.fillText(
        value.value,
        value.position.x + (value.divSize.width - value.textSize.width) / 2,
        value.position.y +
          (value.divSize.height + value.textSize.height) / 2 -
          4
      )
    })

    drawCtx.font = 'bold 22px Arial'
    drawCtx.fillStyle = 'black'
    textInputs.forEach((value) => {
      drawCtx.fillText(
        value.value,
        value.position.x + (value.divSize.width - value.textSize.width) / 2,
        value.position.y +
          (value.divSize.height + value.textSize.height) / 2 -
          4
      )
    })

    drawCanvasImageRef.current.src = drawCanvas.toDataURL()
  }

  const handleRemoveInput = (index: number) => {
    const newValues = [...textInputs]
    newValues.splice(index, 1)
    setTextInputs(newValues)
  }

  const handleChangePosition = (position: Pos, index: number) => {
    const newValues = [...textInputs]
    newValues[index] = {
      ...newValues[index],
      position: position,
    }
    setTextInputs(newValues)
  }

  const handleDivChangeSize = (size: Size, index: number) => {
    const newValues = [...textInputs]
    newValues[index] = {
      ...newValues[index],
      divSize: size,
    }
    setTextInputs(newValues)
  }

  const handleTextChangeSize = (size: Size, index: number) => {
    const newValues = [...textInputs]
    newValues[index] = {
      ...newValues[index],
      textSize: size,
    }
    setTextInputs(newValues)
  }

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
            text={isPainting ? 'Done' : 'Draw'}
            onClick={() => setIsPainting((prev) => !prev)}
            style={{
              width: '50px',
              fontSize: '10px',
              borderRadius: '10px',
            }}
          ></Button>
          <Button
            text='Add text input'
            onClick={handleAddTextInput}
            style={{
              width: '100px',
              fontSize: '10px',
              borderRadius: '10px',
            }}
          ></Button>
        </Header>
        <SpacingSelections
          style={{ visibility: showSpacing ? 'visible' : 'collapse' }}
        >
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
        </SpacingSelections>
        <DrawTools style={{ visibility: isPainting ? 'visible' : 'collapse' }}>
          <input
            id='stroke'
            name='stroke'
            value={paintingStroke}
            type='color'
            onChange={(e) => setPaintingStroke(e.target.value)}
          />
          <input
            id='linewidth'
            name='linewidth'
            type='range'
            value={paintingWidth}
            min={1}
            max={32}
            onChange={(e) => setPaintingWidth(parseInt(e.target.value))}
          />
          <Button
            id='clear'
            onClick={clearDrawing}
            text='Clear'
            style={{
              width: '50px',
            }}
          ></Button>
        </DrawTools>
        <MemEditingBlock>
          <MemCanvasWrapper
            ref={canvasWrapperRef}
            onMouseOver={() => setIsDraggableShown(true)}
            onMouseOut={() => setIsDraggableShown(false)}
          >
            <MemCanvas
              ref={canvasRef}
              style={{ transform: `rotate(${rotation}deg)` }}
            ></MemCanvas>
            {textInputs.map((value, index) => (
              <DraggableDiv
                key={`meme-draggable-${index}`}
                isShown={isDraggableShown}
                parentRef={canvasWrapperRef}
                text={value.value}
                position={value.position}
                setPosition={handleChangePosition}
                index={index}
                size={value.divSize}
                setDivSize={handleDivChangeSize}
                setTextSize={handleTextChangeSize}
              />
            ))}
          </MemCanvasWrapper>
          <InputsWrapper>
            {textInputs.map((value, index) => (
              <div style={{ display: 'flex' }} key={`meme-div-${index}`}>
                <Input
                  key={`meme-input-${index}`}
                  value={value.value}
                  onInputChange={(e) =>
                    handleInputChange(index, e.target.value)
                  }
                />
                <Button
                  key={`meme-button-${index}`}
                  onClick={() => handleRemoveInput(index)}
                  text={'Remove'}
                  style={{
                    width: '70px',
                    marginLeft: '10px',
                    marginBottom: '20px',
                  }}
                ></Button>
              </div>
            ))}
          </InputsWrapper>
        </MemEditingBlock>
        <Button
          text={'Create mem'}
          onClick={() => handleCanvasAction(handleCreateMem)}
          style={{
            backgroundColor: `${colors.blue}`,
            width: '100px',
            marginLeft: '90px',
            marginTop: '10px',
          }}
        />
        {/* <p
          onClick={() => handleCanvasAction(handleCreateMem)}
          style={{ marginLeft: '95px' }}
        >
          Create meme
        </p> */}
        {/* {convertedImageRef.current.src && (
          <a href={convertedImageRef.current.src} download='image.jpg'>
            Скачать
          </a>
        )} */}
      </AddPanel>
    </PageWrapper>
  )
}

const MemEditingBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  font-family: 'Poppins Regular';
`

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const AddPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1336px;
  background-color: ${colors.blue};
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 400px;
  height: 40px;
  margin-left: 100px;
  margin-top: 100px;
  margin-bottom: 20px;
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
  /* visibility: collapse; */
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
const DrawTools = styled.div`
  display: flex;
  flex-direction: row;
`
const MemCanvasWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
`

export default CreateMemes
