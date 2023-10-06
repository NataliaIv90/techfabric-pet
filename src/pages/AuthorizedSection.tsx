import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../redux/slicesApi/authSliceApi';

export enum UserRole {
  USER = 'User',
  AUTHOR = 'Author',
  ADMIN = 'SuperAdmin',
}

type AllowedRoles = UserRole[];

export const AuthorizedSection = ({ allowedRoles }: { allowedRoles: AllowedRoles }) => {
  const { data, isLoading } = useGetUserQuery();

  if (data && !isLoading) {
    const role: UserRole = data.role as UserRole;
    const accessIsAllowed = allowedRoles.includes(role);
    return accessIsAllowed ? (
      <Outlet />
    ) : (
      <Navigate
        to='/login'
        replace
      />
    );
  } else if (!data && !isLoading) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }
  return <></>;
};
