  
 (function ($) {
    const duplicate = `<h3 class="text-white mb-5" style="text-align: center">The email account is already on file. </h3>`
    const verified = `<h3 class="text-white mb-5 text-center">Your account is verified. Thank you for subscribing!</h3>`   
    const notverified = `<h3 class="text-white mb-5 text-center">The verification does not match. Please try again!</h3>`
    let em
    const processEmail = (form, e) => {
        const email = document.getElementById('email').value
       
        return fetch(`/.netlify/functions/newsubscriber`, {
          headers: {
            'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({email})
        })
        .then( async (result) => {          
          em = await result.json()          

          // switch forms
          if (!em.isVerified) {
            $('#dspemail').css('display','none');
            $('#dspverify').css('display','inline');
          } else {
            form.innerHTML = duplicate;
          }         
                        
          return {message: 'success'}
        })
        .catch(error => {
          form.innerHTML = `<div class="form--error">Error: ${error}</div>`;
        })
      }

    const processEmailAuth = (form, e) => {         
      const code = document.getElementById('code').value
      
      em.userToken = code
      fetch(`/.netlify/functions/verifysubscriber`, {
        headers: {
          'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(em)
      })
      .then( async (result) => {
              
        const response = await result.json()
        
        // switch forms
        if (!response.isVerified) {
          form.innerHTML = notverified;
        } else {
          form.innerHTML = verified;
        }
        return {message: 'success'}
      })
      .catch(error => {
        form.innerHTML = `<div class="form--error">Error: ${error}</div>`;
      })
    }

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // submit newletter form
    emailForm.onsubmit = async (e) => {
        e.preventDefault()
        let result = await processEmail(emailForm, e)
        
    }
    // submit verification form
    
    verifyForm.onsubmit = async (e) => {
      e.preventDefault()
      let result = await processEmailAuth(verifyForm, e)
      
    }    


})(jQuery); // End of use strict
