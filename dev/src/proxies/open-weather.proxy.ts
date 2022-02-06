import axios from 'axios';

export class OpenWeatherProxy {
  private readonly axiosService;
  constructor(timeoutMS = -1) {
    this.axiosService = axios.create({
      timeout: timeoutMS && timeoutMS > 0 ? timeoutMS : 10000,
      baseURL: process.env.OPEN_WEATHER_API,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * @param  {string} city
   */
  getWeatherData = async (city: string): Promise<any> => {
    try {
      const url = `/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;
      const response = await this.axiosService.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Error occurred while getting data from open weather api. ${error.message}`);
    }
  };
}
