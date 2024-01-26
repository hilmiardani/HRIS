import { Model } from "../contracts/model";
import { Unit } from "./unit";

export interface PropertyInput {
  name: string;
  address?: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
}

export interface Property extends Model {
  name: string,
  address: string,
  description: string,
  thumbnailResourceId: string,
  createdAt: string,
  updatedAt: string,
  ThumbnailResource: {
    id: string,
    objectKey: string,
    fileName: string,
    fileType: string,
    fileSize: number,
    metadata: {
      depth: string,
      space: string,
      width: number,
      format: string,
      height: number,
      channels: 3,
      hasAlpha: boolean,
      hasProfile: boolean,
      isProgressive: boolean
    },
    createdAt: string,
    updatedAt: string
  },
  PropertyImages: [
    {
      propertyId: string,
      resourceId: string,
      createdAt: string,
      updatedAt: string,
      Resource: {
        id: string,
        objectKey: string,
        fileName: string,
        fileType: string,
        fileSize: number,
        metadata: {
          depth: string,
          space: string,
          width: number,
          format: string,
          height: number,
          channels: number,
          hasAlpha: boolean,
          hasProfile: boolean,
          isProgressive: boolean
        },
        createdAt: string,
        updatedAt: string
      }
    }
  ],
  UnitTypes: [
    {
      id: string,
      name: string,
      Units: Unit[]
    },
  ],
  thumbnail: string,
  images: string[]
}