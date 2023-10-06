import { BrandColorSpan, TrendingContentContainer, StyledSubtitle } from './TopContentWrapper.styled'
import { PropsWithChildren, ReactElement } from 'react';

interface ITopContentWrapperProps {
  text: string;
  children: ReactElement;
}

export const TopContentWrapper = ({ text, children }: PropsWithChildren<ITopContentWrapperProps>) => (
  <TrendingContentContainer>
    <StyledSubtitle>
      Top <BrandColorSpan>{text}</BrandColorSpan>
    </StyledSubtitle>
    {children}
  </TrendingContentContainer>
)
