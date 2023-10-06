import { useEffect, useState } from 'react';
import { SearchButton } from './SearchSideBar.styled';
import { useSearchParams } from 'react-router-dom';
import { ECategory } from '../../../../types/search';
import { useNavigateWithSearchParams } from '../../../../shared/hooks/useNavigateWithSearchParams';

const searchableContentList = [
  { id: 1, name: 'Articles', path: ECategory.Articles },
  { id: 2, name: 'Authors', path: ECategory.Users },
  { id: 3, name: 'Tags', path: ECategory.Tags },
  { id: 4, name: 'Comments', path: ECategory.Comments },
];

export const SearchSideBar = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const [selectedButton, setSelectedButton] = useState<string>(ECategory.Articles);
  const navigateTo = useNavigateWithSearchParams();

  useEffect(() => {
    if (category) {
      setSelectedButton(category);
    }
  }, [category, searchParams]);

  return (
    <ul>
      {searchableContentList.map(({ id, name, path }) => (
        <li key={id}>
          <SearchButton
            selected={selectedButton === path}
            value={name}
            onClick={() => navigateTo('category', path)}
          >
            {name}
          </SearchButton>
        </li>
      ))}
    </ul>
  );
};
