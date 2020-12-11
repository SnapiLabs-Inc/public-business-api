var express = require('express');
const Config = require('../common/config');
const BusinessController = require('../controllers/BusinessController');
var router = express.Router();
const { body, check } = require('express-validator');

/**
 * @swagger
 * /business/find:
 *   get:
 *     tags:
 *       - Public
 *     summary: Find Business Record by ID
 *     description: Get Details of Business by ID
 *
 *     x-codeSamples:
 *       - lang: 'JavaScript'
 *         source: |

 *       - lang: PHP
 *         source: |

 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      
 *             type: object
 *             properties:
 *               api_key:
 *                 type: string
 *               id:
 *                 type: string
 *             example:   
 *               api_key: 2UDB3dHF79h96yVVHvY6c6d51SEU501XwBj
 *               id: 5fd2954381ef4d54d319bb23
 *     produces:
 *      - "application/json"  
 *     parameters:
 *       - in: query
 *         name: api_key
 *         type: string
 *         required: true
 *         description: Your Api Key.    
 *       - in: query
 *         name: id
 *         type: string
 *         required: true
 *         description: Business Data ID.
 *     responses:
 *       200:
 *         description: An object containing the business info is returned
 *         content:
 *           application/json:
 *         schema:
 *           type: object
 *           properties:
 *             business_name:
 *               type: string
 *               example: Abrasive Express
 *             category:
 *               type: string
 *               example: Abrasives
 *             category_2:
 *               type: string
 *               example: Hardware Stores
 *             category_3:
 *               type: string
 *               example: Industrial Equipment  Supplies
 *             address:
 *               type: string
 *               example: 3345 N Nevada St Ste 1
 *             city:
 *               type: string
 *               example: Chandler
 *             state:
 *               type: string
 *               example: AZ
 *             postal:
 *               type: string
 *               example: 85225
 *             phone_number:
 *               type: string
 *               example: (480) 926-4760
 *             website:
 *               type: string
 *               example: http://abrasiveexpress.com
 *             email:
 *               type: string
 *               example: name@abrasiveexpress.com
 *             latitude:
 *               type: string
 *               example: '33.353378'
 *             longitude:
 *               type: string
 *               example: '-111.834252'
 *       400:
 *         description: An unauthorized message is returned
 *         content:
 *           application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: object
 *               example: Invalid API KEY
 *       404:
 *         description: A not found error is returned
 *         content:
 *           application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: object
 *               example: Err getting data
 *             data:
 *               type: object
 *               example: {}
 *       500:
 *         description: An internal server error is returned
 *         content:
 *           application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: object
 *               example: Err getting data
 *             data:
 *               type: object
 *               example: {}
 */
router.get('/find', [

  // check('title').notEmpty().isLength({ min: 3 }).withMessage('Your title is too short'),
  check('id').notEmpty().withMessage('The business data id is required'),

], BusinessController.find());


/**
 * @swagger
 * /business/search:
 *   get:
 *     tags:
 *       - Public
 *     summary: Search Business Records by Keyword
 *     description: Get the list of Business Records by Keyword
 *
 *     x-codeSamples:
 *       - lang: 'JavaScript'
 *         source: |

 *       - lang: PHP
 *         source: |

 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      
 *             type: object
 *             properties:
 *               api_key:
 *                 type: string
 *               keyword:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               start:
 *                 type: string
 *               limit:
 *                 type: string
 *             example:   
 *               api_key: 2UDB3dHF79h96yVVHvY6c6d51SEU501XwBj
 *               keyword: Abrasive Finishing
 *               state: TX
 *               city: Beaumont
 *               start: 0
 *               limit: 40
 *     produces:
 *      - "application/json"  
 *     parameters:
 *       - in: query
 *         name: api_key
 *         type: string
 *         required: true
 *         description: Your Api Key.    
 *       - in: query
 *         name: keyword
 *         type: string
 *         required: true
 *         description: The keyword to search.
 *       - in: query
 *         name: state
 *         type: string
 *         description: Filter search by state using the Iso alpha 2 code.
 *       - in: query
 *         name: city
 *         type: string
 *         description: Filter search by city.
 *       - in: query
 *         name: start
 *         type: integer
 *         description: The record to start from.
 *       - in: query
 *         name: limit
 *         type: integer
 *         description: The total records to return.
 *     responses:
 *       200:
 *         description: An object containing the list of records is returned
 *         content:
 *           application/json:
 *         schema:
 *           type: object
 *           properties:
 *             list:
 *               type: array
 *               example: []
 *       400:
 *         description: An unauthorized message is returned
 *         content:
 *           application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: object
 *               example: Invalid API KEY
 *       500:
 *         description: An internal server error is returned
 *         content:
 *           application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: object
 *               example: Err getting data
 *             data:
 *               type: object
 *               example: {}
 */
router.get('/search', [

  check('keyword').notEmpty().isLength({ min: 2 }).withMessage('Your keyword is too short'),
  // check('address').notEmpty().custom((value,{ req }) => {
  //   return web3.utils.isAddress(req.body.address)
  // }).withMessage('Invalid Ethereum address'),

],BusinessController.search({
  useFallback: false
}));



module.exports = router;
