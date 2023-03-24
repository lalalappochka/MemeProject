import styled from 'styled-components'
import colors from '../constants/colors'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Icon from '../components/UI/Icon'
import { Link, useNavigate } from 'react-router-dom'
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

const Registration = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <FormContainer>
        <Logo />
        <Title>Registration</Title>
        <InputWrapper>
          <Input placeholder='email'></Input>
          <Input placeholder='password'></Input>
          <Button
            text='Sign Up'
            style={{
              marginTop: '12px',
            }}
            onClick={() => navigate('/user-profile')}
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
