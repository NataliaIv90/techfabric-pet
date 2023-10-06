import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputComponent } from '../../../../../shared/components/Input';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface ISearchData {
  search?: string;
}

const validationSchema: Yup.ObjectSchema<ISearchData> = Yup.object().shape({
  search: Yup.string()
    .transform((value) => (typeof value === 'string' ? value.trim() : value))
    .min(1, 'Min input - at least 1 symbol')
    .max(100, 'Max input - 100'),
});

export const SearchForm = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const { control, handleSubmit, clearErrors } = useForm<ISearchData>({
    defaultValues: {
      search: query || null || '',
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISearchData> = (data) => {
    if (location.pathname.includes('search') && data.search) {
      searchParams.set('query', data.search.toLocaleLowerCase());
      navigate(`search?${searchParams}`);
      return;
    }
    navigate(`search?query=${data.search}&category=articles`);
  };
  return (
    <form
      style={{ width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name='search'
        render={({ field, fieldState }) => (
          <InputComponent
            search={true}
            type='text'
            placeholder='Search something...'
            errorMessage={fieldState.error?.message}
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={() => clearErrors('search')}
            icon={
              <IconButton type='submit'>
                <SearchIcon />
              </IconButton>
            }
          />
        )}
      />
    </form>
  );
};
