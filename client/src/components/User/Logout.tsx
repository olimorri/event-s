/* eslint-disable no-unused-vars */
import UsersApiService from '../../services/UsersApiService';
import auth from '../../utils/auth';
import { UserProps } from '../../interfaces/UserProps';

export default function Logout(props: UserProps) {
  const logout = () => {
    UsersApiService.logout();
    props.setIsAuthenticated(false);
    auth.logout(() => props.history.push('/'));
  };

  logout();
  return <></>;
}
