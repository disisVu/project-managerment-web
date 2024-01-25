import { useAppSelector } from '~/hooks'
import ProfileForm from './ProfileForm'

export function ProfilePage() {
  const userInfo = useAppSelector((state) => state.usersReducer.user)

  return userInfo && <ProfileForm userInfo={userInfo} />
}
