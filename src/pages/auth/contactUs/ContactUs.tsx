import { AuthWrapperComponent } from '../authWrapper/AuthWrapper';
import { StyledLink, StyledDiv, StyledParagraph } from './ContactUs.styled';
import { scrollToTop } from '../../../shared/utils/scrollToTop';

export const ContactUs = () => {
  scrollToTop();

  return (
    <AuthWrapperComponent
      title='Contact Us'
      text='We value your feedback and are here to assist you. Whether you have questions, suggestions, or need assistance, please don&#39;t hesitate to reach out to us.Our team is ready to help!'        >
      <StyledDiv>
        <StyledParagraph>Email: <StyledLink href="mailto:letstalk@techfabric.com">letstalk@techfabric.com</StyledLink></StyledParagraph>
        <StyledParagraph>Phone: <StyledLink href="tel:380980000000">+38 (098) 000 00 00</StyledLink></StyledParagraph>
      </StyledDiv>
    </AuthWrapperComponent >
  );
};
