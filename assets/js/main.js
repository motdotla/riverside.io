/*
 * Small Script to send Email to mailchimp
 */

(function($){



	var sendForm = function(form){

		var inputs 	= form.find('input'),
			method 	= form.attr('method'),
			submit 	= form.find('input[type=submit]'),
			url 	= form.attr('action')
			compile = function(callback){
				var obj = {};
				inputs.each(function(){
					var ele 	= $(this),
						name 	= ele.attr('name'),
						val 	= ele.val();

					obj[name] = val;
				});

				callback(obj);
			},
			send = function(data, callback){
				$.ajax({
					url 	: url,
					method 	: method,
					data 	: data,
					success : function(res){
						callback(res);
					}
				});
			};
		console.log(submit);

		submit.click(function(e){
			compile(function(res){
				send(res, function(_res){
					console.log(res);
				});
			});
			return false;
		});
	};

	sendForm($('.email-form'));



}(jQuery))