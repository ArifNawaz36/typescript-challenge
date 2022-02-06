import * as express from 'express';
import { AppService } from '../services/app.service';

class AppController {
  private readonly appService: AppService;
  constructor() {
    this.appService = new AppService();
  }
  /**
   * @param  {express.Request} request
   * @param  {express.Response} response
   */
  saveBikesData = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
      await this.appService.saveBikesData();
      console.log('Successfully saved record');
      response.send({ success: true });
    } catch (error) {
      response.status(500).send({ message: 'An error occurred while saving bikes data.' });
    }
  };

  /**
   * @param  {express.Request} request
   * @param  {express.Response} response
   */
  getStations = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
      const { at } = request.query;
      const result = await this.appService.getAllStations(at as string);
      result ? response.send(result) : response.status(404).send();
    } catch (error) {
      response.status(500).send({
        message: `Error occurred while getting stations data. ${error.message}`,
      });
    }
  };

  /**
   * @param  {express.Request} request
   * @param  {express.Response} response
   */
  getStationById = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
      const { at } = request.query;
      const { stationId } = request.params;
      const result = await this.appService.getStationById(at as string, +stationId);
      result ? response.send(result) : response.status(404).send();
    } catch (error) {
      response.status(500).send({
        message: `Error occurred while getting station data by Id. ${error.message}`,
      });
    }
  };
}

export default new AppController();
