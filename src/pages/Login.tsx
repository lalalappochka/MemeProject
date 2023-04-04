import styled from 'styled-components'
import colors from '../constants/colors'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import logo from '../assets/logo.png'
import figure from '../assets/figure.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/UI/Icon'
require('checkboxes')

const Login = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <FormContainer>
        <Logo />
        <Title>Log In</Title>
        <InputWrapper>
          <Input placeholder='email'></Input>
          <Input placeholder='password'></Input>
          <CheckWrapper>
            <CheckBox>
              <input id='remember' type='checkbox' className='checkbox' />
              <label htmlFor='remember'>Remember me </label>
            </CheckBox>
            <Text>Forgot password</Text>
          </CheckWrapper>
          <Button
            text='Log In'
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
          <Link to='/registration'>Don&apos;t have an account?</Link>
        </SocialLogin>
      </FormContainer>
      <Figure />
    </Container>
  )
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.cyan};
  height: 100vh;
  width: 100%;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  background-color: ${colors.white};
  font-family: 'Poppins Regular';
  max-width: 380px;
  height: 480px;
`
export const Logo = styled.div`
  height: 115px;
  width: 110px;
  background-image: url(${logo});
  background-position: center;
  background-size: 115px 110px;
`
export const Title = styled.h2`
  display: flex;
  align-self: flex-start;
  margin-left: 68px;
  font-family: 'Poppins Medium';
`
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  font-size: 8px;
`
const CheckWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-family: 'Poppins Regular';
  color: ${colors.grey};
  font-size: 11px;
`
const CheckBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  border-width: 1px;
  font-family: 'Poppins Regular';
  color: ${colors.grey};
`
export const SocialLogin = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 380px;
  font-family: 'Poppins Regular';
  font-size: 11px;
  margin-top: 15px;
`
export const Text = styled.span``
export const Line = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 20px;
  width: 228px;
  font-size: 12px;
  font-family: 'Poppins Regular';
  color: ${colors.grey};
`
export const Dash = styled.div`
  border-bottom: dashed 2px ${colors.grey};
  width: 120px;
  margin-left: 10px;
  margin-right: 10px;
`
export const IconLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  margin-top: 8px;
  margin-bottom: 10px;
`
export const Figure = styled.div`
  height: 480px;
  width: 400px;
  background-image: url(${figure});
  background-position: center;
  background-size: 400px 480px;
`
export default Login
