import { MainSearchContainer, SearchContainer } from './Search.styled';
import { SearchHeader } from './components/searchHeader/SearchHeader';
import { SearchMainContent } from './components/searchMainContent/SearchMainContent';
import { SearchSideBar } from './components/searchSideBar/SearchSideBar';

export const Search = () => {
  return (
    <SearchContainer>
      <SearchHeader />
      <MainSearchContainer>
        <SearchSideBar />
        <SearchMainContent />
      </MainSearchContainer>
    </SearchContainer>
  );
};
