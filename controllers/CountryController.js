const Config = require('../common/config');
const Service = require('../common/services')
const Utils = require('../common/utils')
const axios = require('axios')
const { validationResult } = require('express-validator');
const CountryModel	= require('../models/CountryModel');
let last_time={};
const escapeStringRegexp = require('escape-string-regexp');


const defaultOptions = {
	useFallback: false,
}


exports.list = () => {

	return async (req, res, next) => {

		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(400).json({ 
				errors: result.array() 
			});
		}

		try{
	
			const feedback = await CountryModel.find();
			const result = (feedback)? feedback : [];
			res.status(200).json(result);
			res.end();
		}
		catch(err){
			console.log("Err getting data",err)
			res.status(404).json({
				message:"Err getting data: "+err.message,
				data:err
			});
			res.end();
		}
	}
}


exports.states = () => {

	return async (req, res, next) => {

		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(400).json({ 
				errors: result.array() 
			});
		}

		try{
			let country_code = req.body.country_code; //iso3
			const feedback = await CountryModel.find({code3:country_code});
			const result = (feedback)? feedback[0].states : [];
			res.status(200).json(result);
			res.end();
		}
		catch(err){
			console.log("Err getting data",err)
			res.status(404).json({
				message:"Err getting data: "+err.message,
				data:err
			});
			res.end();
		}
	}
}
