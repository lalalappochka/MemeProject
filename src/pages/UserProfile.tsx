import { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/UI/Input'
import Sidebar from '../components/UI/sidebar/Sidebar'
import colors from '../constants/colors'
import { Container } from './Login'
import profile from '../assets/profile.jpg'
import Button from '../components/UI/Button'

interface IUserInfo {
  firstName: string
  lastName: string
  nickName: string
  mobile: string
  birthday: string
  email: string
}

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    firstName: 'Sasha1',
    lastName: 'lapo',
    nickName: 'Lalalappochka',
    mobile: '+375(44)7831120',
    birthday: '25/06/2001',
    email: 'snadvd',
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleEditProfileClick = () => {
    if (isEditing) {
      // запрос
    }

    setIsEditing((prev) => !prev)
  }

  const onChange = (e: any) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <Container>
      <Sidebar />
      <Content>
        <Profile src={profile} />
        <InfoWrapper>
          <UserInfo>
            <Label htmlFor='firstName'>First name: </Label>
            {!isEditing ? (
              <p>Sasha</p>
            ) : (
              <Input
                type='text'
                value={userInfo.firstName}
                onChange={(e) => onChange(e)}
                id='firstName'
              />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='lastName'>Last name: </Label>
            {!isEditing ? (
              <p>Lapo</p>
            ) : (
              <Input
                type='text'
                value={userInfo.lastName}
                onChange={(e) => onChange(e)}
                id='lastName'
              />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='nickName'>Nickname: </Label>
            {!isEditing ? (
              <p>Lalalappochka</p>
            ) : (
              <Input type='text' value='Lalalappochka' id='lastName' />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='mobile'>Mobile: </Label>
            {!isEditing ? (
              <p>+375(44)7831120</p>
            ) : (
              <Input type='text' value='+375(44)7831120' id='mobile' />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='birth'>Birthday: </Label>
            {!isEditing ? (
              <p>25 June</p>
            ) : (
              <Input type='text' value='25 June' id='birth' />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='email'>Email: </Label>
            {!isEditing ? (
              <p>sanyalappo16@gmail.com</p>
            ) : (
              <Input type='text' value='sanyalappo16@gmail.com' id='birth' />
            )}
          </UserInfo>
        </InfoWrapper>
        <Button
          style={{
            marginTop: '20px',
            fontSize: '15px',
          }}
          text={!isEditing ? 'Change' : 'Save'}
          onClick={handleEditProfileClick}
        />
      </Content>
    </Container>
  )
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 731px;
  width: 1336px;
  background-color: ${colors.white};
  font-family: 'Poppins Regular';
`
const Profile = styled.img`
  border-radius: 100px;
  height: 200px;
  width: 200px;
  margin-top: 15px;
  margin-bottom: 20px;
`
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  width: 50%;
`
const Label = styled.label``
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 200px;
  background-color: ${colors.blue};
  flex-wrap: wrap;
  border-radius: 20px;
`

export default UserProfile
