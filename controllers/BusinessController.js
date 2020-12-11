const Config = require('../common/config');
const Service = require('../common/services')
const Utils = require('../common/utils')
const axios = require('axios')
const { validationResult } = require('express-validator');
const BusinessModel	= require('../models/BusinessModel');
let last_time={};
const escapeStringRegexp = require('escape-string-regexp');


const defaultOptions = {
	useFallback: false,
}

exports.find = () => {

	return async (req, res, next) => {

		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(400).json({ 
				errors: result.array() 
			});
		}

		try{
			let id = req.body.id;

			const feedback = await BusinessModel.find({_id:id});
			const result = (feedback)? feedback[0] : null;
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

exports.search = (options=defaultOptions) => {
	options = { ...defaultOptions, ...options }
	return async (req, res, next) => {
		
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.status(400).json({ 
				errors: result.array() 
			});
			res.end();
		}

		try{
			
			let keyword = req.body.keyword;
			let seachQuery = keyword.split(' ');
			let start = req.body.start? parseInt(req.body.start) : 0;
			let limit = req.body.limit? parseInt(req.body.limit) : 20;
			let category = req.body.category;
			let category_1 = req.body.category_1;
			let category_2 = req.body.category_2;
			let state = req.body.state;
			let searchResult = [];

				// for (var i = 0; i < seachQuery.length; i++) {
				// 	let query = seachQuery[i];
				// 	const $regex = escapeStringRegexp(query);
				
				// 	const feedback = await BusinessModel.find({ 
				// 		$and: [
				// 			{ $or: [
				// 				{business_name: { $regex }},
				// 				{city: { $regex }},
				// 				{postal: { $regex }},
				// 				{address: { $regex }},
				// 				{phone_number: { $regex }},
				// 				{website: { $regex }},
				// 				{email: { $regex }},
				// 				{latitude: { $regex }},
				// 				{longitude: { $regex }}
				// 		    ]}
				// 			// {category: category},
				// 			// {category_1: category_1},
				// 			// {category_2: category_2}, 
				// 			// {state: state} 

				// 		]}).skip(start).limit(limit).sort();

				// 	searchResult.push(searchResult);
				// }

				const $regex = escapeStringRegexp(keyword);
			
				const feedback = await BusinessModel.find({ 
				$and: [
					{ $or: [
						{business_name: { $regex }},
						{city: { $regex }},
						{postal: { $regex }},
						{address: { $regex }},
						{phone_number: { $regex }},
						{website: { $regex }},
						{email: { $regex }},
						{latitude: { $regex }},
						{longitude: { $regex }},
						{category: { $regex }},
						{category_1: { $regex }},
						{category_2: { $regex }},
						{state: { $regex }}
				    ]}
					// {category: category},
					// {category_1: category_1},
					// {category_2: category_2}, 
					// {state: state} 

				]}).skip(start).limit(limit).sort();
			
			
			res.status(200).json({
				list: feedback,	
			});
			res.end();
		}
		catch(err){
			console.log("Err getting data",err)
			res.status(500).json({
				message:"Err getting data: "+err.message,
				data:err
			});
			res.end();
		}
	}
}
