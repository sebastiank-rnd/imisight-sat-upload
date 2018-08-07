import { Geometry } from 'geojson';

export declare type geoProtocol = 'wms' | 'oms';
export declare const WMS_PROTOCOL: geoProtocol;
export declare const OMS_PROTOCOL: geoProtocol;

export interface IA3DataItem {
  _id: string;
  geoFile: string;
  fileName: string;
  timestamp: string;
  dataType: string;
  legalUsage: string;
  company: string;
  // footprint: string;
  sensorName: string;
  metaData: {
    coordinateReferenceSystem: string;
    pixelRoWorldTransform: string;
    protocol: geoProtocol;
  };
  geojson: string | Geometry;
  urls: string[];
}
