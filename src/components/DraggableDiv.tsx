import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import { Pos, Size } from '../pages/CreateMemes'

interface DraggableDivProps {
  isShown: boolean
  parentRef: React.RefObject<HTMLDivElement>
  text?: string
  position: Pos
  setPosition: (position: Pos, index: number) => void
  size: Size
  setDivSize: (size: Size, index: number) => void
  setTextSize: (size: Size, index: number) => void
  index: number
}

export const START_DIV_WIDTH = 250
export const START_DIV_HEIGHT = 100

const DraggableDiv = ({
  isShown,
  parentRef,
  text,
  position,
  setPosition,
  index,
  size,
  setDivSize,
  setTextSize,
}: DraggableDivProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const resizeNRef = useRef<HTMLDivElement>(null)
  const resizeERef = useRef<HTMLDivElement>(null)
  const resizeWRef = useRef<HTMLDivElement>(null)
  const resizeSRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Pos>({ x: 0, y: 0 })

  useEffect(() => {
    function handleWindowResize() {
      const parentRect = parentRef.current?.getBoundingClientRect()
      const divRect = divRef.current?.getBoundingClientRect()
      if (parentRect && divRect) {
        const maxX = parentRect.width - divRect.width
        const maxY = parentRect.height - divRect.height
        setPosition(
          {
            x: Math.min(Math.max(position.x, 0), maxX),
            y: Math.min(Math.max(position.y, 0), maxY),
          },
          index
        )
      }
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [position])

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true)
    const parentRect = parentRef.current?.getBoundingClientRect()
    const divRect = divRef.current?.getBoundingClientRect()
    if (parentRect && divRect) {
      setDragOffset({
        x: event.clientX - divRect.left,
        y: event.clientY - divRect.top,
      })
    }
  }

  function handleMouseUp() {
    setIsDragging(false)
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (isDragging) {
      const parentRect = parentRef.current?.getBoundingClientRect()
      const divRect = divRef.current?.getBoundingClientRect()
      if (parentRect && divRect) {
        const maxX = parentRect.width - divRect.width
        const maxY = parentRect.height - divRect.height
        setPosition(
          {
            x: Math.min(
              Math.max(event.clientX - parentRect.left - dragOffset.x, 0),
              maxX
            ),
            y: Math.min(
              Math.max(event.clientY - parentRect.top - dragOffset.y, 0),
              maxY
            ),
          },
          index
        )
      }
    }
  }

  useEffect(() => {
    const draggable = divRef.current!

    let xCord = 0
    let yCord = 0
    let leftOffset = position.x
    let topOffset = position.y

    let width = parseInt(draggable.style.width)
    let height = parseInt(draggable.style.height)

    //E
    function handleEResizeDown(event: MouseEvent) {
      event.stopPropagation()
      xCord = event.clientX
      document.addEventListener('mousemove', handleEResizeMove)
      document.addEventListener('mouseup', handleEResizeUp)
    }

    function handleEResizeUp() {
      const rect = parentRef.current!.getBoundingClientRect()
      if (leftOffset + width >= rect.width) {
        const dx = leftOffset + width - rect.width
        width = width - dx
        draggable.style.width = `${width}px`
      }
      setDivSize({ ...size, width: width }, index)
      document.removeEventListener('mousemove', handleEResizeMove)
      document.removeEventListener('mouseup', handleEResizeUp)
    }

    function handleEResizeMove(event: MouseEvent) {
      const dx = event.clientX - xCord
      xCord = event.clientX
      width = width + dx

      draggable.style.width = `${width}px`
    }

    //W
    function handleWResizeDown(event: MouseEvent) {
      event.stopPropagation()
      xCord = event.clientX
      document.addEventListener('mousemove', handleWResizeMove)
      document.addEventListener('mouseup', handleWResizeUp)
    }

    function handleWResizeUp() {
      if (leftOffset < 0) {
        width = width + leftOffset
        leftOffset = 0
        draggable.style.left = `${leftOffset}px`
        draggable.style.width = `${width}px`
      }
      setDivSize({ ...size, width: width }, index)
      document.removeEventListener('mousemove', handleWResizeMove)
      document.removeEventListener('mouseup', handleWResizeUp)
    }

    function handleWResizeMove(event: MouseEvent) {
      const dx = event.clientX - xCord
      xCord = event.clientX
      width = width - dx
      leftOffset += dx
      draggable.style.left = `${leftOffset}px`
      draggable.style.width = `${width}px`
    }

    //S
    function handleSResizeDown(event: MouseEvent) {
      event.stopPropagation()
      yCord = event.clientY
      document.addEventListener('mousemove', handleSResizeMove)
      document.addEventListener('mouseup', handleSResizeUp)
    }

    function handleSResizeUp() {
      const rect = parentRef.current!.getBoundingClientRect()
      if (topOffset + height >= rect.height) {
        const dy = topOffset + height - rect.height
        height = height - dy
        draggable.style.height = `${height}px`
      }
      setDivSize({ ...size, height: height }, index)
      document.removeEventListener('mousemove', handleSResizeMove)
      document.removeEventListener('mouseup', handleSResizeUp)
    }

    function handleSResizeMove(event: MouseEvent) {
      const dy = event.clientY - yCord
      yCord = event.clientY
      height = height + dy
      draggable.style.height = `${height}px`
    }

    //N
    function handleNResizeDown(event: MouseEvent) {
      event.stopPropagation()
      yCord = event.clientY
      document.addEventListener('mousemove', handleNResizeMove)
      document.addEventListener('mouseup', handleNResizeUp)
    }

    function handleNResizeUp() {
      if (topOffset < 0) {
        height = height + topOffset
        topOffset = 0
        draggable.style.top = `${topOffset}px`
        draggable.style.height = `${height}px`
      }
      setDivSize({ ...size, height: height }, index)
      document.removeEventListener('mousemove', handleNResizeMove)
      document.removeEventListener('mouseup', handleNResizeUp)
    }

    function handleNResizeMove(event: MouseEvent) {
      const dy = event.clientY - yCord
      yCord = event.clientY
      height = height - dy
      topOffset += dy
      draggable.style.top = `${topOffset}px`
      draggable.style.height = `${height}px`
    }

    //APPLYING
    resizeERef.current?.addEventListener('mousedown', handleEResizeDown)
    resizeWRef.current?.addEventListener('mousedown', handleWResizeDown)
    resizeSRef.current?.addEventListener('mousedown', handleSResizeDown)
    resizeNRef.current?.addEventListener('mousedown', handleNResizeDown)

    return () => {
      resizeERef.current?.removeEventListener('mousedown', handleEResizeDown)
      resizeWRef.current?.removeEventListener('mousedown', handleWResizeDown)
      resizeSRef.current?.removeEventListener('mousedown', handleSResizeDown)
      resizeNRef.current?.removeEventListener('mousedown', handleNResizeDown)
    }
  }, [position])

  useEffect(() => {
    if (!pRef) {
      return
    }
    const paragraphStyle = pRef.current!

    setTextSize(
      {
        width: paragraphStyle.clientWidth,
        height: paragraphStyle.clientHeight,
      },
      index
    )
  }, [text])

  return (
    <Draggable
      ref={divRef}
      style={{
        left: position.x,
        top: position.y,
        height: `${START_DIV_HEIGHT}px`,
        width: `${START_DIV_WIDTH}px`,
        border: isShown ? `2px dashed ${colors.night}` : 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <p
        ref={pRef}
        style={{
          fontFamily: 'Arial',
          fontSize: '22px',
          fontWeight: 'bold',
        }}
      >
        {text}
      </p>
      <WrapN>
        <ResizeN
          ref={resizeNRef}
          style={{ display: isShown ? 'block' : 'none' }}
        />
      </WrapN>
      <WrapE>
        <ResizeE
          ref={resizeERef}
          style={{ display: isShown ? 'block' : 'none' }}
        />
      </WrapE>
      <WrapS>
        <ResizeS
          ref={resizeSRef}
          style={{ display: isShown ? 'block' : 'none' }}
        />
      </WrapS>
      <WrapW>
        <ResizeW
          ref={resizeWRef}
          style={{ display: isShown ? 'block' : 'none' }}
        />
      </WrapW>
      {/* <ResizeNW />
      <ResizeNE />
      <ResizeSE />
      <ResizeSW /> */}
    </Draggable>
  )
}

const Draggable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  z-index: 3;
  position: absolute;
  background: transparent;
  cursor: move;
  min-width: 20px;
  min-height: 20px;
  user-select: none;
`

const WrapN = styled.div`
  cursor: move;
  position: absolute;
  top: 0;
  left: 50%;
`

const ResizeN = styled.div`
  z-index: 3;
  cursor: ns-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -10px;
  left: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

const WrapE = styled.div`
  cursor: move;
  position: absolute;
  top: 50%;
  right: 0;
`
const ResizeE = styled.div`
  z-index: 3;
  cursor: ew-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -10px;
  right: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

const WrapS = styled.div`
  cursor: move;
  position: absolute;
  bottom: 0;
  left: 50%;
`

const ResizeS = styled.div`
  z-index: 3;
  cursor: ns-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  left: -10px;
  bottom: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

const WrapW = styled.div`
  cursor: move;
  position: absolute;
  top: 50%;
  left: 0;
`

const ResizeW = styled.div`
  z-index: 3;
  cursor: ew-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -10px;
  left: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

const ResizeNW = styled.div`
  z-index: 3;
  cursor: nw-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -10px;
  left: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

const ResizeNE = styled.div`
  z-index: 3;
  cursor: ne-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -10px;
  right: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

const ResizeSE = styled.div`
  z-index: 3;
  cursor: nw-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  bottom: -10px;
  right: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

const ResizeSW = styled.div`
  z-index: 3;
  cursor: ne-resize;
  position: absolute;
  width: 16px;
  height: 16px;
  bottom: -10px;
  left: -10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 2px;
`

export default DraggableDiv
