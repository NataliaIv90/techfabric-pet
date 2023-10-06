import { useSearchParams } from 'react-router-dom';
import { SearchHeaderContainer, SearchResults, SortButton, SortList } from './SearchHeader.styled';
import { useEffect, useState } from 'react';
import { EParameter } from '../../../../types/search';
import { useNavigateWithSearchParams } from '../../../../shared/hooks/useNavigateWithSearchParams';

const searchSortList = [
  { id: 1, name: 'Relevant', path: EParameter.Relevant },
  { id: 2, name: 'Last Created', path: EParameter.LastPosts },
  { id: 3, name: 'New Created', path: EParameter.NewPosts },
];

export const SearchHeader = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const parameters = searchParams.get('parameters');
  const [activeSearchSortButton, setActiveSearchSortButton] = useState<string>(EParameter.Relevant);
  const navigateTo = useNavigateWithSearchParams();

  useEffect(() => {
    if (parameters) {
      setActiveSearchSortButton(parameters);
    }
  }, [parameters, searchParams]);

  return (
    <SearchHeaderContainer>
      <SearchResults>Search Results: {query}</SearchResults>
      <SortList>
        {searchSortList.map(({ id, name, path }) => (
          <li key={id}>
            <SortButton
              value={name}
              selected={activeSearchSortButton === path}
              onClick={() => navigateTo('parameters', path)}
            >
              {name}
            </SortButton>
          </li>
        ))}
      </SortList>
    </SearchHeaderContainer>
  );
};
