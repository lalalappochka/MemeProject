import { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/UI/Input'
import Sidebar from '../components/UI/sidebar/Sidebar'
import colors from '../constants/colors'
import { Container } from './Login'
import profile from '../assets/profile.jpg'
import Button from '../components/UI/Button'
import { setUser } from '../store/slices/userSlice'

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

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))
  }
  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))
  }
  const handleChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, nickName: e.target.value }))
  }
  const handleChangeMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, mobile: e.target.value }))
  }
  const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, birthday: e.target.value }))
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, email: e.target.value }))
  }
  const handleEditProfileClick = () => {
    if (isEditing) {
      // запрос
    }

    setIsEditing((prev) => !prev)
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
              <p>{userInfo.firstName}</p>
            ) : (
              <Input
                type='text'
                value={userInfo.firstName}
                onInputChange={handleChangeFirstName}
                id='firstName'
              />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='lastName'>Last name: </Label>
            {!isEditing ? (
              <p>{userInfo.lastName}</p>
            ) : (
              <Input
                type='text'
                value={userInfo.lastName}
                onInputChange={handleChangeLastName}
                id='lastName'
              />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='nickName'>Nickname: </Label>
            {!isEditing ? (
              <p>{userInfo.nickName}</p>
            ) : (
              <Input
                type='text'
                value={userInfo.nickName}
                onInputChange={handleChangeNickName}
                id='lastName'
              />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='mobile'>Mobile: </Label>
            {!isEditing ? (
              <p>{userInfo.mobile}</p>
            ) : (
              <Input
                type='text'
                value={userInfo.mobile}
                onInputChange={handleChangeMobile}
                id='mobile'
              />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='birth'>Birthday: </Label>
            {!isEditing ? (
              <p>{userInfo.birthday}</p>
            ) : (
              <Input
                type='text'
                value='25 June'
                onInputChange={handleChangeBirthday}
                id='birth'
              />
            )}
          </UserInfo>
          <UserInfo>
            <Label htmlFor='email'>Email: </Label>
            {!isEditing ? (
              <p>{userInfo.email}</p>
            ) : (
              <Input
                type='text'
                value={userInfo.email}
                onInputChange={handleChangeEmail}
                id='birth'
              />
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
  background-color: ${colors.borderIcon};
  font-family: 'Poppins Regular';
  .simple-linear {
    background: linear-gradient(blue, pink);
  }
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
