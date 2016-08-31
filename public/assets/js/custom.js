$( document ).ready(function() {

	//starting function (random background image and moving dust through this background image)

	randomBackImg()
	moveDust()

	//points variable

	var darkPoints = 0
	var answers = []

	//random background image when page started

	function randomBackImg(){

		var backImg = ['back1', 'back2', 'back3']

		var i = Math.floor(Math.random() * backImg.length); 
		var image = "url('./assets/img/" + backImg[i] + ".jpg'";
		$('.wrapper').css('background-image', image)

	}

	//Move dust.png image when page started

	function moveDust(){
		var i = 0
		setInterval(function(){
			i++

			$('.dust').css('background-position', i + 'px 0')
		}, 10)		
	}


	//random IN animation

	function randomInAnimation(){
		var animationInArray = ['lightSpeedRightIn', 'lightSpeedBottomIn', 'lightSpeedLeftIn']

		var i = Math.floor(Math.random() * animationInArray.length); 
		var animationIn = animationInArray[i];

		return animationIn
	}

	//random OUT animation

	function randomOutAnimation(){
		var animationOutArray = ['lightSpeedRightOut', 'lightSpeedBottomOut', 'lightSpeedLeftOut']

		var i = Math.floor(Math.random() * animationOutArray.length); 
		var animationOut = animationOutArray[i];

		return animationOut

	}


	//move to next step function
  
	$( ".btn" ).click(function(){

		//variables
		
		var animationIn = randomInAnimation()
		var animationOut = randomOutAnimation()

		var $slide = $(this).parent('.slide')
		var stepIndex = $slide.index()-1

		//THE MAIN FUNCTION

		$slide.addClass(animationOut)

		if($slide.is($('.slide').last())){
			setTimeout(function(){
				answers = []
				$slide.removeClass(animationOut + ' is-showing');
				$('.slide').first().addClass('is-showing').addClass(animationIn);
				$('.step').removeClass('is-active').first().addClass('is-active')
			}, 600)
			setTimeout(function(){
				$('.slide').first().removeClass(animationIn)
			}, 1200)
		}
		else{
			setTimeout(function(){
				$slide.removeClass(animationOut + ' is-showing').next().addClass('is-showing').addClass(animationIn);
				$('.step').removeClass('is-active').eq(stepIndex).addClass('is-active')
			}, 600)

			setTimeout(function(){
				$slide.next().removeClass(animationIn)
			}, 1200)
		}

		//END OF MAIN FUNCTION
	});

	//get values from form and show score

	$(".score").click(function(){
		
		var questionsLength = 4

		for(var i = 0; i < questionsLength; i++){
			if($("input[name=question"+ i +"]:checked").val()){
				answers.push($("input[name=question"+ i +"]:checked").val())
			}
			else{
				answers.push('notCheck')
			}
			$("input[name=question"+ i +"]").prop('checked', false);
		}

		var stormtrooper = {
			answers: answers
		}

		$.post( "check/answers", stormtrooper, function( data ) {

			if(data.status === 'failure'){
				$('.final').html(data.answer)
			}
			else{
				if(data.points > 2){
					$('.final').html('Uzyskałeś ' + data.points + '/'+ questionsLength + '. Witamy w Galaktycznym Imperium.')			
				}
				else{
					$('.final').html('Uzyskałeś ' + data.points + '/'+ questionsLength + '. Nie nadajesz się na żołnierza Galaktycznego Imperium.')
				}					
			}
	
		})

	})
});
