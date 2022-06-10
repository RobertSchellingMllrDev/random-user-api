import { Name } from './Iname';
import { Location } from './Ilocation';
import { Login } from './Ilogin';
import { DOB } from './Idob';
import { Registered } from './Iregistered';
import { ID } from './Iid';
import { Picture } from './Ipicture';

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DOB;
  registered: Registered;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
}
