import DetailsController from './controllers/details-controller.js';
import WebService from './web-service.js';

const webService = new WebService();
const detailsController = new DetailsController(webService);

const _ = detailsController.loadDetailsAsync();