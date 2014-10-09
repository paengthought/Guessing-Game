$(document).ready(function(e){


	var data = {};


	datas = [{	'question':'Small Town in Ncr Philippines',
				'answer':'Pateros'},

			{	'question': 'City Mayor of Pateros',
				'answer': 'Joey Medina'}];

	function init(){
		
		appendData(datas);
	}

	function appendData(datas) {

		var data = selectRandomData(datas);
		var hint = getHint(data);
		var getInput = getInputText(hint);


		$('#question').html(data.question);
		$('#hint').html(getInput);

		getAnswer(hint);
	}

	function getAnswer(hint){

		$('body').on('keypress',function(e){
			var correctAns = {};
			var keyPressed = String.fromCharCode(e.keyCode);

			$.each(hint,function(index,val){

				if(val.hint.toLowerCase() == keyPressed.toLowerCase()) {
					correctAns[index] = val;
				} 

			})

			if($.isEmptyObject(correctAns) == false) {

				$.each(correctAns,function(a,b,c){
					
					var inputSelector = $('input[rel="' + b.rel + '"]');


					inputSelector.val(b.hint);

				});

			} else {
				console.log('Error');
			}
		})	

	}

	function getInputText(hint) {
		var ret = '';
		$.each(hint,function(index,val){
			var inputVal = ' ';
			if(val.input == 'N'){
				inputVal = '-';
			}

			ret += '<input type="text" rel="' + index + '" readonly="readonly" value="' + inputVal + '"/>';
		});


		return ret;
	}

	function selectRandomData(datas) {

		var maxLimit = datas.length;
		var randomNum = Math.floor(Math.random() * maxLimit);

		var randomData = datas[randomNum];

		return randomData;
	}

	function getHint(data) {

		var answerLen = data.answer.length;
		var answer = {};

		for(var x = 0; x < answerLen; x++) {
			var input  = 'Y';

			if($.trim(data.answer[x]).length == 0) {
				input = 'N';
			}

			answer[x] = {'hint':data.answer[x],'input':input,'rel':x};
		}

		return answer;
	}


	init();
})