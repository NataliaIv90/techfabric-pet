import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { StyledList, StyledListItem } from './Rules.styled';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const rulesList = [
  { text: 'Be respectful to other users.' },
  { text: 'Protect your account information and do not share it with anyone.' },
  { text: 'Do not attempt to access others accounts, personal information, or data.' },
  { text: 'Report any abusive behavior, cheating, or violations of our rules to our moderation team.' },
  { text: 'Respect the intellectual property rights of the game developers and content creators.' },
  { text: 'Promote a positive and inclusive community atmosphere.' },
  { text: 'Violation of these rules may result in warnings, temporary suspensions, or permanent bans from our services.' },
  { text: 'We may update these rules and guidelines from time to time. Please check periodically for any changes.' }
];

export const Rules = () => {
  scrollToTop();

  return (
    <AuthWrapperComponent
      title='Rules and Guidelines'
      text='To ensure a fun and fair experience for all, we have established the following rules and guidelines. By using our website, you agree to abide by these rules. Failure to do so may result in penalties or account suspension.'
    >
      <StyledList>
        {rulesList.map((el, index) => (<StyledListItem key={index}>{el.text}</StyledListItem>))}
      </StyledList>
    </AuthWrapperComponent>
  )
}; 