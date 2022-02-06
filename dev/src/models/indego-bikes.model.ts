import * as mongoose from 'mongoose';

// * Interfaces for bikes data
interface IBikes {
  dockNumber: number;
  isElectric: boolean;
  isAvailable: boolean;
  battery: string;
}

interface IIndegoBikes {
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties: {
    id: number;
    name: string;
    coordinates: number[];
    totalDocks: number;
    docksAvailable: number;
    bikesAvailable: number;
    classicBikesAvailable: number;
    smartBikesAvailable: number;
    electricBikesAvailable: number;
    rewardBikesAvailable: number;
    rewardDocksAvailable: number;
    kioskStatus: string;
    kioskPublicStatus: string;
    kioskConnectionStatus: string;
    kioskType: number;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZipCode: number;
    bikes: IBikes[];
    closeTime: string;
    eventEnd: string;
    eventStart: string;
    isEventBased: Boolean;
    isVirtual: Boolean;
    kioskId: number;
    notes: string;
    openTime: string;
    publicText: string;
    timeZone: string;
    trikesAvailable: number;
    latitude: number;
    longitude: number;
  };
  type: string;
}

// * Schemas for bikes data
const bikesSchema = {
  dockNumber: Number,
  isElectric: Boolean,
  isAvailable: Boolean,
  battery: String,
};

const featureSchema = new mongoose.Schema(
  {
    geometry: {
      coordinates: [Number, Number],
      type: {
        type: String,
      },
    },
    properties: {
      id: Number,
      name: String,
      coordinates: [Number, Number],
      totalDocks: Number,
      docksAvailable: Number,
      bikesAvailable: Number,
      classicBikesAvailable: Number,
      smartBikesAvailable: Number,
      electricBikesAvailable: Number,
      rewardBikesAvailable: Number,
      rewardDocksAvailable: Number,
      kioskStatus: String,
      kioskPublicStatus: String,
      kioskConnectionStatus: String,
      kioskType: Number,
      addressStreet: String,
      addressCity: String,
      addressState: String,
      addressZipCode: Number,
      bikes: [bikesSchema],
      closeTime: String,
      eventEnd: String,
      eventStart: String,
      isEventBased: Boolean,
      isVirtual: Boolean,
      kioskId: Number,
      notes: String,
      openTime: String,
      publicText: String,
      timeZone: String,
      trikesAvailable: Number,
      latitude: Number,
      longitude: Number,
    },
    type: {
      type: String,
    },
  },
  { _id: false },
);

const indegoBikesSchema = new mongoose.Schema(
  {
    features: {
      type: [featureSchema],
    },
    type: {
      type: String,
    },
  },
  { timestamps: true },
);

const getIndegoBikesModel = mongoose.model<{
  features: IIndegoBikes[];
  type: string;
}>('IndegoBike', indegoBikesSchema, 'indegoBikes');

export { getIndegoBikesModel };
