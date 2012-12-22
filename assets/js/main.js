/*
 * Small Script to send Email to mailchimp
 */

(function($){

	var notification = function(str){
		var ele = $('.notification');

		ele.html('<span>' + str + '</span>').addClass('show');

		setTimeout(function(){
			ele.removeClass('show');
		},5000);
	};


	$.fn.form = function(response){
		var form 	= $(this),
			inputs 	= form.find('input'),
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
					type 	: method,
					data 	: data,
					success : function(res){
						callback(res);
					}
				});
			};

		submit.click(function(e){
			compile(function(res){
				send(res, function(_res){

					response(_res);
					
				});
			});
			return false;
		});
	};

	$('.email-form').form(function(res){
		if(res.success){
			notification('You have successfully subscribed to the mailing list');
		}else{
			notification('ooops there is was an error we are redirecting you to a better signup page');
			//window.location = 'signuppage';
		}

	});



}(jQuery))