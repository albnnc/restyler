import { SideMap } from './SideMap';

export interface DirectionMap<T> extends SideMap<T> {
  horizontal?: T;
  vertical?: T;
}
