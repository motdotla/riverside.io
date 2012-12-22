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
	},

	loading = {
		ele : $('.loading'),
		show : function(){
			loading.ele.addClass('show');
		},
		hide : function(){
			loading.ele.addClass('show');
		}
	};


	$.fn.form = function(response){
		var form 	= $(this),
			inputs 	= form.find('input'),
			method 	= form.attr('method'),
			submit 	= form.find('input[type=submit]'),
			url 	= form.attr('action'),
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

	var form = $('.email-form');

	form.form(function(res){
		var that = form;
			that.find('input').removeClass('error').unbind('keypress');
		if(res.success){
			notification('Thanks! We are sending you an email to confirm your subscription');
			_gaq.push(['_trackEvent', 'Mailing List', 'Subscribe', 'Invalid Email']);
			that.find('input[type=text]').val('');
		}else{
			if(typeof res.error === 'object'){
				var ele = that.find('input[name="' + res.error[0] + '"]');
				notification('Looks like the email you provided is invalid, please revise');
				_gaq.push(['_trackEvent', 'Mailing List', 'Error', 'Invalid Email']);
				ele.addClass('error');
				ele.bind('keypress', function(){
					ele.removeClass('error');
				})
			}else{
				notification('Something went wrong; we are redirecting you to a better signup page');
				_gaq.push(['_trackEvent', 'Mailing List', 'Error', '500 Error']);
				setTimeout(function(){
					window.location = res.redirect
				}, 3000)
			}
			
		}

	});


	// Inject trackin into each link

	$('a').bind('click', function(){

		_gaq.push(['_trackEvent', 'Link Click', this.href , $(this).text()]);

	});


}(jQuery))