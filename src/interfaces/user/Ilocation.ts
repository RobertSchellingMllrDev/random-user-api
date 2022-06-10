import { Timezone } from './Itimezone';
import { Coordinates } from './Icoordinates';

export interface Location {
  street: string;
  city: string;
  state: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
}
