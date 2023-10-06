import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { StyledList, StyledListItem, StyledSubtitle } from './TermsOfUse.styled';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const policyData = [
  {
    title: 'Acceptance of Terms',
    text: 'By using this website, you agree to comply with and be bound by these Terms of Use.If you do not agree with these terms, please refrain from using the site.'
  },
  {
    title: 'User Conduct',
    text: 'You agree to use the website only for lawful purposes and not to engage in any activities that may harm the website or its users.'
  },
  {
    title: 'Privacy',
    text: 'Your use of this website is also governed by our Privacy Policy.'
  },
  {
    title: 'Intellectual Property',
    text: 'All content on this website, including text, images, logos, and software, is protected by intellectual property laws and is the property of the website owner.'
  },
  {
    title: 'Third-Party Links',
    text: '  This website may contain links to third - party websites.We are not responsible for the content or actions of these third - party sites.'
  },
  {
    title: 'Disclaimers',
    text: 'We make no warranties or representations about the accuracy or completeness of the content on this website.Your use of the site is at your own risk.'
  },
  {
    title: 'Limitation of Liability',
    text: 'To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use or inability to use the website.'
  },
  {
    title: 'Termination',
    text: ' We reserve the right to terminate or suspend your access to the website at our discretion, without notice, for any reason.'
  },
  {
    title: 'Changes to Terms',
    text: 'We may modify or update these Terms of Use at any time.It is your responsibility to review them periodically for changes.'
  },
];

export const TermsOfUse = () => {
  scrollToTop();

  return (
    <AuthWrapperComponent
      title='Terms of use'
      text='By accessing and using our website, you agree to abide by these terms and any updates or modifications that may occur over time. Please take a moment to familiarize yourself with our "Terms of Use" to ensure a positive and secure experience while using our services.'
    >
      <StyledList>
        {policyData.map((el, index) => (
          <StyledListItem key={index}>
            <StyledSubtitle>{el.title}: </StyledSubtitle>{el.text}
          </StyledListItem>
        ))}
      </StyledList>
    </AuthWrapperComponent >
  );
};
