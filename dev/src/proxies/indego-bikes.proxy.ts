import axios from 'axios';

export class IndegoBikesProxy {
  private readonly axiosService;
  constructor(timeoutMS = -1) {
    this.axiosService = axios.create({
      timeout: timeoutMS && timeoutMS > 0 ? timeoutMS : 10000,
      baseURL: process.env.INDEGO_API_URL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getIndegoBikesData = async (): Promise<any> => {
    try {
      const response = await this.axiosService.get('/phl');
      return response.data;
    } catch {
      throw new Error('Error occurred while getting bikes data from indego API.');
    }
  };
}
