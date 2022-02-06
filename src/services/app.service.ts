import { getIndegoBikesModel } from '../models/indego-bikes.model';
import { IndegoBikesProxy } from '../proxies/indego-bikes.proxy';
import { OpenWeatherProxy } from '../proxies/open-weather.proxy';

export class AppService {
  private readonly bikesProxy: IndegoBikesProxy;
  private readonly weatherProxy: OpenWeatherProxy;
  constructor() {
    this.bikesProxy = new IndegoBikesProxy();
    this.weatherProxy = new OpenWeatherProxy();
  }

  /**
   * @param  {string} datetime
   */
  getAllStations = async (datetime: string): Promise<any> => {
    try {
      let response = null;
      const stationsData = await getIndegoBikesModel.aggregate([
        { $match: { createdAt: { $gte: new Date(datetime) } } },
        { $unwind: '$features' },
        { $replaceRoot: { newRoot: '$features' } },
      ]);
      const weatherData = await this.weatherProxy.getWeatherData('Philadelphia');
      if (stationsData || weatherData) {
        response = {
          at: datetime,
          stations: stationsData,
          weather: weatherData,
        };
      }
      return response;
    } catch (error) {
      throw new Error('Error while getting all stations data.');
    }
  };

  /**
   * @param  {string} datetime
   * @param  {number} stationId
   */
  getStationById = async (datetime: string, stationId: number): Promise<any> => {
    try {
      let response = null;
      const result = await getIndegoBikesModel
        .findOne({ createdAt: { $gte: new Date(datetime).toISOString() } })
        .lean();
      const stationData = result?.features.find(({ properties }) => properties.kioskId === stationId);
      const weatherData = await this.weatherProxy.getWeatherData('Philadelphia');
      if (stationData || weatherData) {
        response = {
          at: datetime,
          station: stationData,
          weather: weatherData,
        };
      }
      return response;
    } catch (error) {
      throw new Error(`Error while getting station data by Id. ${error.message}`);
    }
  };

  saveBikesData = async () => {
    try {
      const bikesData = await this.bikesProxy.getIndegoBikesData();
      const getBikesModel = new getIndegoBikesModel(bikesData);
      await getBikesModel.save();
    } catch (error) {
      throw new Error(`Error occurred in service ${error.message}`);
    }
  };
}
