var express = require('express');
var router = express.Router();


router.route('/answers').post(function(req, res){


	var points = 0

	var correctAnswers = [2, 0, 1, 0];


	for(var i = 0; i < req.body.answers.length; i++){
		if(req.body.answers[i] == 'notCheck'){
			return res.status(200).json({
				status: 'failure',
				answer: 'Nie udzieliłeś wszystkich odpowiedzi'
			})			
		}
	}
	console.log('i`m here ?')
	for(var i = 0; i < correctAnswers.length; i++){
		if(req.body.answers[i] == correctAnswers[i]){
			points++
		}
	}

	return res.status(200).json({
		status: 'success',
		points: points
	})

})


module.exports = router;