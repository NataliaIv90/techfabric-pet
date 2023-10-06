import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { StyledList, StyledListItem, StyledSubtitle } from './PrivacyPolicy.styled';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

const policyData = [
  {
    title: 'Introduction',
    text: 'This Privacy Policy is intended to inform you about how we collect, use, disclose, and protect your information when you visit our website or use our services. By using our website or services, you consent to the practices described in this Privacy Policy.If you do not agree with the terms of this policy, please do not use our website or services.'
  },
  {
    title: 'Information We Collect',
    text: ' Personal Information: We may collect personal information that you voluntarily provide to us, including but not limited to your name, email address, postal address, and phone number. Usage Data: We may collect information about how you interact with our website and services, such as your IP address, browser type, operating system, referral source, pages viewed, and the date and time of your visit.'
  },
  {
    title: 'Use of Information',
    text: 'We may use the information we collect for various purposes, including but not limited to:providing and maintaining our website and services, personalizing your experience, sending you promotional emails, newsletters, or updates(you can opt- out at any time), responding to your inquiries or requests, monitoring and analyzing website usage to improve our content and services.'
  },
  {
    title: 'Disclosure of Information',
    text: 'We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent. However, we may disclose your information to: service providers and partners who assist us in operating our website and services, law enforcement or government agencies when required by law, third - party advertisers for analytics and advertising purposes.'
  },
  {
    title: 'Cookies and Tracking Technologies',
    text: 'We use cookies and similar tracking technologies to collect information about your browsing behavior on our website. You can control the use of cookies through your browser settings.'
  },
  {
    title: 'Security',
    text: 'We take reasonable measures to protect your personal information. However, no data transmission over the internet is entirely secure. Therefore, we cannot guarantee the security of your information.'
  },
  {
    title: 'Your Rights',
    text: 'You have the right to access, correct, or delete your personal information. If you have any questions or requests regarding your data, please contact us.'
  },
  {
    title: 'Contact Information',
    text: 'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us.'
  },
];

export const PrivacyPolicy = () => {
  scrollToTop();

  return (
    <AuthWrapperComponent
      title='Privacy Policy'
      text='Our Privacy Policy outlines how we collect, use, and protect your personal information when you use our website or services. We are committed to safeguarding your privacy and ensuring the security of your data. Please take a moment to review our policy to understand how your information is handled. If you have any questions or concerns, don&#39;t hesitate to contact us.Your privacy is important to us.'
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
