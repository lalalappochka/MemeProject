import styled from 'styled-components'
import Button from '../Button'
import MemImg from './MemImg'
import { useState } from 'react'

const RotationImage = () => {
  const [rotation, setRotation] = useState(0)
  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90)
  }
}
