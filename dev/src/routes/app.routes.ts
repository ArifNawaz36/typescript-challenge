import * as express from 'express';
import appController from '../controllers/app.controller';
import { validateRequest } from '../middlewares/validation.middleware';

const controller = appController;
const router = express.Router();

/**
 * @param  {} '/stations'
 * @param  {} validateRequest
 * @param  {} controller.getStations
 */
router.get('/stations', validateRequest, controller.getStations);

/**
 * @param  {stationId'} '/stations/
 * @param  {} validateRequest
 * @param  {} controller.getStationById
 */
router.get('/stations/:stationId', validateRequest, controller.getStationById);

/**
 * @param  {} '/indego-bikes-data'
 * @param  {} validateRequest
 * @param  {} controller.saveBikesData
 */
router.post('/indego-bikes-data', validateRequest, controller.saveBikesData);

export default router;
