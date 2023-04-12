import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'

interface DraggableDivProps {
  display: string
  parentRef: React.RefObject<HTMLDivElement>
}

interface Position {
  x: number
  y: number
}

const DraggableDiv = ({ display, parentRef }: DraggableDivProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })

  useEffect(() => {
    function handleWindowResize() {
      const parentRect = parentRef.current?.getBoundingClientRect()
      const divRect = divRef.current?.getBoundingClientRect()
      if (parentRect && divRect) {
        const maxX = parentRect.width - divRect.width
        const maxY = parentRect.height - divRect.height
        setPosition({
          x: Math.min(Math.max(position.x, 0), maxX),
          y: Math.min(Math.max(position.y, 0), maxY),
        })
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
        setPosition({
          x: Math.min(
            Math.max(event.clientX - parentRect.left - dragOffset.x, 0),
            maxX
          ),
          y: Math.min(
            Math.max(event.clientY - parentRect.top - dragOffset.y, 0),
            maxY
          ),
        })
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
      document.removeEventListener('mousemove', handleEResizeMove)
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
      document.removeEventListener('mousemove', handleWResizeMove)
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
      document.removeEventListener('mousemove', handleSResizeMove)
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
      document.removeEventListener('mousemove', handleNResizeMove)
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
    const resizeE = document.getElementById('resizeE')
    resizeE?.addEventListener('mousedown', handleEResizeDown)
    const resizeW = document.getElementById('resizeW')
    resizeW?.addEventListener('mousedown', handleWResizeDown)
    const resizeS = document.getElementById('resizeS')
    resizeS?.addEventListener('mousedown', handleSResizeDown)
    const resizeN = document.getElementById('resizeN')
    resizeN?.addEventListener('mousedown', handleNResizeDown)

    return () => {
      resizeE?.removeEventListener('mousedown', handleEResizeDown)
      resizeW?.removeEventListener('mousedown', handleWResizeDown)
      resizeS?.removeEventListener('mousedown', handleSResizeDown)
      resizeN?.removeEventListener('mousedown', handleNResizeDown)
    }
  }, [position])

  return (
    <Draggable
      ref={divRef}
      style={{
        display: `${display}`,
        left: position.x,
        top: position.y,
        height: '100px',
        width: '250px',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      afhfahfa
      <WrapN>
        <ResizeN id='resizeN' />
      </WrapN>
      <WrapE>
        <ResizeE id='resizeE' />
      </WrapE>
      <WrapS>
        <ResizeS id='resizeS' />
      </WrapS>
      <WrapW>
        <ResizeW id='resizeW' />
      </WrapW>
      {/* <ResizeNW />
      <ResizeNE />
      <ResizeSE />
      <ResizeSW /> */}
    </Draggable>
  )
}

const Draggable = styled.div`
  box-sizing: border-box;
  z-index: 3;
  position: absolute;
  border: 2px dashed ${colors.night};
  background: transparent;
  cursor: move;
  min-width: 20px;
  min-height: 20px;
  text-align: center;
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
