import { ProfileContainer } from './ProfilePage.styled';
import { AvatarImage } from './components/avatarImage/AvatarImage';
import { FormInfo } from './components/formInfo/FormInfo';

export const ProfilePage = () => {
  return (
    <ProfileContainer>
      <h1>Change your Avatar</h1>
      <AvatarImage />
      <FormInfo />
    </ProfileContainer>
  );
};
