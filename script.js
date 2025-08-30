$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script 
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
    })

    // toogle menu/navbar script 
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing animation script
    var typed = new Typed(".typing", {
        strings: ["Flutter Developer", "Django Backend Developer", "Programmer", "AI Enthusiast"],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Flutter Developer", "Django Backend Developer", "Programmer", "AI Enthusiast"],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true
    });
    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{ items: 1, nav: false },
            600:{ items: 2, nav: false },
            1000:{ items: 3, nav: false }
        }
    });

    // Contact form EmailJS send
    const form = document.getElementById('contact-form');
    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            const statusEl = document.getElementById('form-status');
            const btn = document.getElementById('send-btn');
            statusEl.textContent = 'Sending...';
            btn.disabled = true;
            emailjs.sendForm('service_tgv28ra','template_hef5u8j', this)
                .then(()=>{
                    statusEl.style.color = 'green';
                    statusEl.textContent = 'Message sent successfully!';
                    form.reset();
                })
                .catch(err=>{
                    finished = true;
                    clearTimeout(timeoutId);
                    console.error('[EmailJS] Error:', err);
                    const raw = (err && (err.text || err.message)) || '';
                    let userMsg = 'Failed to send. Please email me directly.';
                    if (/scope/i.test(raw)) {
                        userMsg = 'Email service auth expired. Try again later or email me directly.';
                    }
                    statusEl.style.color = 'red';
                    statusEl.textContent = userMsg;
                })
                .finally(()=>{ btn.disabled = false; });
        });
    }
});
