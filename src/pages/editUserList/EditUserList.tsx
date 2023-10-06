import { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  InputAdornment,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Select,
  SelectChangeEvent,
  TableHead,
  TableRow,
  Stack,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { SidebarNavigation } from '../../shared/components/sidebarNavigation/SidebarNav';
import { AccountCircleOutlined, ArrowForwardOutlined, ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  ContentContainer,
  ButtonContainer,
  Main,
  SingleButtonContainer,
  StyledNotification,
  StyledTitle,
  StyledButton,
  StyledInput,
  StyledSubtitle,
  UserListContainer,
  SearchForm,
  SearchBar,
  StyledMenuItem,
  PaginationContainer
} from './EditUserList.styled';
import { useGetUsersByPageMutation, useSetNewRolesMutation } from '../../redux/slicesApi/userListApi';
import { UserRole } from '../AuthorizedSection';
import FormControl from '@mui/material/FormControl';
import { IUsersToUpdate, ISearchUserProps, ICurrentUserResponse } from '../../types/user';
import { scrollToTop } from '../../shared/utils/scrollToTop';

const userRoleOptions = Object.values(UserRole)
  .map((value) => ({ value }))
  .filter((el) => el.value !== UserRole.ADMIN);

const validationSchema: Yup.ObjectSchema<ISearchUserProps> = Yup.object().shape({
  keyword: Yup.string().nullable(),
  userRole: Yup.string().oneOf(['all', UserRole.AUTHOR, UserRole.USER]),
});

export const EditUserList = () => {
  const [getUsersByPage] = useGetUsersByPageMutation();
  const [setNewRoles, { isLoading: setNewRolesLoading, error: setNewRolesError }] = useSetNewRolesMutation();
  const [userListData, setUserListData] = useState<ICurrentUserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ICurrentUserResponse[]>([]);
  const [usersToUpdateRoles, setUsersToUpdate] = useState<IUsersToUpdate[]>([]);
  const [previewUsersMode, setPreviewMode] = useState<boolean>(false);
  const [controller, setController] = useState({
    page: 1,
    totalPages: 0,
    size: 10,
  });

  const handlePageChange = useCallback((e: ChangeEvent<unknown>, value: number) => {
    setController({
      ...controller,
      page: value,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const newUserList = await getUsersByPage({
        page: controller.page,
        size: controller.size,
      });

      if ('data' in newUserList) {
        setUserListData(newUserList?.data?.users);
        setController((prevController) => ({
          ...prevController,
          totalPages: newUserList?.data?.totalPages,
        }));
      } else {
        setUserListData([]);
        setController((prevController) => ({
          ...prevController,
          totalPages: 0,
        }));
      }
    };
    fetchData();
    scrollToTop();
  }, [controller.page, controller.size, getUsersByPage]);

  useEffect(() => {
    if (userListData) {
      setFilteredUsers(userListData);
    }
  }, [userListData]);

  const updateLocalUserList = useCallback(
    (event: SelectChangeEvent<string>, currentUserId: string) => {
      const updatedUserListData = userListData.map((el: ICurrentUserResponse) => {
        if (el.id === currentUserId) {
          return { ...el, role: event.target.value };
        }
        return el;
      });
      setUserListData(updatedUserListData);
    },
    [userListData]
  );

  const { control, handleSubmit, setValue, register, watch } = useForm<ISearchUserProps>({
    defaultValues: {
      keyword: '',
      userRole: 'all',
    },
    resolver: yupResolver(validationSchema),
  });

  const previewChanges = useCallback(async () => {
    const newUserList = await getUsersByPage({
      page: controller.page,
      size: controller.size,
    }).then((data) => {
      console.log(data);
      return 'data' in data ? data?.data?.users : [];
    });

    const newUsersToUpdateRoles = newUserList.reduce(
      (accumulator: IUsersToUpdate[], userToUpdate: ICurrentUserResponse) => {
        const currentUser = userListData?.find(
          (currentUser: ICurrentUserResponse) => currentUser.id === userToUpdate.id
        );
        if (currentUser && currentUser?.role !== userToUpdate.role) {
          accumulator.push({
            userId: currentUser.id,
            role: currentUser.role,
            userName: currentUser.userName,
          });
        }
        return accumulator;
      },
      []
    );
    setUsersToUpdate(newUsersToUpdateRoles);
    setPreviewMode(true);
  }, [controller.page, controller.size, getUsersByPage, userListData]);

  const confirmNewRoles = useCallback(async () => {
    await setNewRoles(usersToUpdateRoles);
    if (setNewRolesError) {
      alert('New roles did not update');
    }
    setPreviewMode(false);
  }, [setNewRoles, setNewRolesError, usersToUpdateRoles]);

  const onSubmit: SubmitHandler<ISearchUserProps> = useCallback(
    ({ keyword, userRole }) => {
      let newfilteredUsers = userListData ? [...userListData] : [];
      if (userRole !== 'all') {
        newfilteredUsers = newfilteredUsers?.filter((user) => user.role === userRole);
      }
      if (keyword) {
        newfilteredUsers = newfilteredUsers?.filter(
          (user) =>
            user.email.toLowerCase().includes(keyword.toLowerCase()) ||
            user.userName.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      setFilteredUsers(newfilteredUsers);
    },
    [userListData]
  );

  return (
    <ContentContainer>
      <SidebarNavigation />
      <Main>
        <StyledTitle>Users List</StyledTitle>

        {!previewUsersMode ? (
          <div>
            <StyledSubtitle>Search users</StyledSubtitle>
            <SearchBar>
              <SearchForm onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name='keyword'
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      size='small'
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='Enter the username or email...'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountCircleOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Select
                  {...register('userRole')}
                  sx={{
                    fontSize: '15px',
                    fontWeight: 500,
                    width: '100px',
                    '& .MuiInputBase-input': { padding: '3px 10px' },
                  }}
                  displayEmpty
                  style={{ padding: '5px' }}
                  variant='outlined'
                  value={watch('userRole') || 'all'}
                  onChange={(e: SelectChangeEvent<string>) => {
                    setValue('userRole', e.target.value);
                  }}
                  IconComponent={ArrowForwardOutlined}
                >
                  <StyledMenuItem
                    key='default'
                    value='all'
                    selected
                  >
                    Roles
                  </StyledMenuItem>
                  {userRoleOptions.map((option) => (
                    <StyledMenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.value}
                    </StyledMenuItem>
                  ))}
                </Select>

                <StyledButton
                  variant='outlined'
                  type='submit'
                >
                  Search
                </StyledButton>
              </SearchForm>
              <StyledButton
                variant='contained'
                onClick={previewChanges}
              >
                Save
              </StyledButton>
            </SearchBar>

            <UserListContainer>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label='simple table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers?.map((user) =>
                      user.role !== UserRole.ADMIN ? (
                        <TableRow
                          key={user.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell
                            component='th'
                            scope='row'
                          >
                            {user.userName}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <FormControl sx={{ width: '100px' }}>
                              <Select
                                variant='standard'
                                sx={{
                                  fontSize: '15px',
                                  fontWeight: 500,
                                }}
                                disableUnderline
                                value={user.role}
                                onChange={(e) => updateLocalUserList(e, user.id)}
                                IconComponent={ArrowForwardOutlined}
                              >
                                {userRoleOptions.map((option) => (
                                  <StyledMenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.value}
                                  </StyledMenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <StyledNotification>
                *Please save your current changes before navigating to a new page. Otherwise, all changes will be lost.
              </StyledNotification>
            </UserListContainer>
            <PaginationContainer>
              <Stack spacing={2}>
                <Pagination
                  count={controller.totalPages}
                  page={controller.page}
                  onChange={handlePageChange}
                  variant='outlined'
                  shape='rounded'
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBack, next: ArrowForward }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </PaginationContainer>
          </div>
        ) : (
          <div>
            {usersToUpdateRoles.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usersToUpdateRoles.map((el) => (
                      <TableRow key={el.userId}>
                        <TableCell>{el.userName}</TableCell>
                        <TableCell>{el.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ButtonContainer>
                  {setNewRolesLoading ? (
                    <CircularProgress />
                  ) : (
                    <StyledButton
                      variant='contained'
                      onClick={confirmNewRoles}
                    >
                      Save
                    </StyledButton>
                  )}
                  <StyledButton
                    variant='outlined'
                    onClick={() => {
                      setUsersToUpdate([]);
                      setPreviewMode(false);
                    }}
                  >
                    Return
                  </StyledButton>
                </ButtonContainer>
              </TableContainer>
            ) : (
              <div>
                <p>There is no data to update...</p>
                <SingleButtonContainer>
                  <StyledButton
                    variant='outlined'
                    onClick={() => setPreviewMode(false)}
                  >
                    Back to the list of users
                  </StyledButton>
                </SingleButtonContainer>
              </div>
            )}
          </div>
        )}
      </Main>
    </ContentContainer>
  );
};
