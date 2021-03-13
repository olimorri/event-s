import { Geometry } from './Geometry';
import { MapProperties } from './MapProperties';

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: MapProperties;
}
