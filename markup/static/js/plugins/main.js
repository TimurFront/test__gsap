// PHONE MASK
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})

$(document).ready(function () {
	$("body").css({'visibility': "visible", "opacity": "1"});
	
	$(".m-bg-cont").each(function() {
		var img = $(this).find("img:first-of-type").attr("src");
		$(this).css("background-image", "url(" + img + ")");
	});
	
	// FORM CHANGE
	$('.second__container-form label input').change(function() {
		if ($(this).val().lenght == 0) {
			$(this).next('p').removeClass('act')
		} else {
			$(this).next('p').addClass('act')
		}
	})
	$('.second__container-form label textarea').change(function() {
		if ($(this).val().lenght == 0) {
			$(this).next('p').removeClass('act')
			console.log('111111');
		} else {
			$(this).next('p').addClass('act')
			console.log('222222');
		}
	})
	// FORM
	$('.second__container-form').each(function() {
        var it = $(this);
         it.validate({
			rules: {
				name: {
					required: true,
				},
				phone: {
					required: true,
				}
			},

			errorPlacement: function (error, element) {
			},

			submitHandler: function() {
				$.ajax({
					success: function(){
						$(".thanx-trigger").trigger("click");
					}
				});
			},  
         });
	});
	
	$('.menu__container-a-drop').click(function() {
		$(this).find('ul').toggleClass('active')
	});
	$('.menu__container-search').click(function() {
		$(this).addClass('active')
	});

	
	// SCROLL CHANGE
	function menuScroll() {
		$('.menu__container-a-drop').find('ul').removeClass('active')
		$('.menu__container-search').removeClass('active')
	};
	window.addEventListener("scroll", menuScroll);
	menuScroll();

	// GSAP ANIMATION
	gsap.registerPlugin(ScrollTrigger);

	gsap.to("#line1", {
		scrollTrigger: {
			trigger: ".second",
			start: "top 100%",
			scrub: 1,
			// markers: true
		},
		scaleY: 1,
		ease: "power4.out",
		duration: 3
	})
	
	gsap.to("#line2", {
		scrollTrigger: {
			trigger: ".second",
			start: "top 90%",
			scrub: 1,
			// markers: true
		},
		scaleY: 1,
		ease: "power2.out",
		duration: 3
	})
	
	gsap.to("#line3", {
		scrollTrigger: {
			trigger: ".second",
			start: "top 80%",
			scrub: 1,
			// markers: true
		},
		scaleY: 1,
		ease: "power1.out",
		duration: 3
	})

	// MENU MOBILE
	$('.nav__container-menu').click(function() {
		$('.menu').addClass('active')
		$('html, body').addClass('ovh')
	});
	$('.menu__close').click(function() {
		$('.menu').removeClass('active')
		$('html, body').removeClass('ovh')
	});

})