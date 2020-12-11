var express = require('express');
const Config = require('../common/config');
const CountryController = require('../controllers/CountryController');
var router = express.Router();
const { body, check } = require('express-validator');

/**
 * @swagger
 * /country/list:
 *   get:
 *     tags:
 *       - Country
 *     summary: List all countries
 *     description: Get the list of all countries
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
 *             example:   
 *               api_key: 2UDB3dHF79h96yVVHvY6c6d51SEU501XwBj
 *     produces:
 *      - "application/json"  
 *     parameters:
 *       - in: query
 *         name: api_key
 *         type: string
 *         required: true
 *         description: Your Api Key.    
 *     responses:
 *       200:
 *         description: An object containing the list of coutries is returned
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
router.get('/list', CountryController.list());


/**
 * @swagger
 * /country/states:
 *   get:
 *     tags:
 *       - Country
 *     summary: List all states in a Country
 *     description: Get the list of all states in a Country
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
 *               country_code:
 *                 type: string
 *             example:   
 *               api_key: 2UDB3dHF79h96yVVHvY6c6d51SEU501XwBj
 *               keyword: USA
 *     produces:
 *      - "application/json"  
 *     parameters:
 *       - in: query
 *         name: api_key
 *         type: string
 *         required: true
 *         description: Your Api Key.    
 *       - in: query
 *         name: country_code
 *         type: string
 *         required: true
 *         description: The country iso alpha 3 code
 *         example: USA
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
router.get('/states', [

  check('country_code').notEmpty().isLength({ min: 3, max: 3 }).withMessage('Invalid country code'),

],CountryController.states({
  useFallback: false
}));



module.exports = router;
