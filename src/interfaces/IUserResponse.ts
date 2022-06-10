import { Info } from './Iinfo';
import { User } from './user/Iuser';

export interface UserResponse {
    info: Info;
    results: User[];
}
