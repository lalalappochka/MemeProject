import styled from 'styled-components'
import colors from '../constants/colors'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Icon from '../components/UI/Icon'
import { Link } from 'react-router-dom'
import {
  Container,
  FormContainer,
  Logo,
  Title,
  InputWrapper,
  SocialLogin,
  Line,
  Dash,
  IconLogin,
  Text,
  Figure,
} from './Login'
import { useAppDispatch } from '../hooks/redux-hooks'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../store/slices/userSlice'
import { ChangeEvent, useState } from 'react'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const dispatch = useAppDispatch()
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user)
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          })
        )
      })
      .catch(console.error)
  }
  return (
    <Container>
      <FormContainer>
        <Logo />
        <Title>Registration</Title>
        <InputWrapper>
          <Input
            placeholder='email'
            type='email'
            value={email}
            onInputChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder='password'
            type='password'
            value={pass}
            onInputChange={(e) => setPass(e.target.value)}
          ></Input>
          <Button
            text='Sign Up'
            style={{
              marginTop: '12px',
            }}
            onClick={() => handleRegister(email, pass)}
          ></Button>
        </InputWrapper>
        <SocialLogin>
          <Line>
            <Dash />
            <Text>or</Text>
            <Dash />
          </Line>
          <IconLogin>
            <Icon icon='twitter' color={colors.blue} size={24} />
            <Icon icon='google' color={colors.orange} size={24} />
          </IconLogin>
          <Link to='/login'>Have an account?</Link>
        </SocialLogin>
      </FormContainer>
      <Figure />
    </Container>
  )
}

export default Registration
