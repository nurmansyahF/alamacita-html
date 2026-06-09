$(document).ready(function() {
    $(function () {
        const isDesktop = window.matchMedia("(min-width: 1023px)").matches;
        const $mastheadBg = $('.masthead-animation .bg-animation');
        const $parallaxSections = $('.paralax');
      
        // Config per device
        const config = {
          desktop: { min: 50, max: 100, multiplier: 30 },
          mobile: { min: 100, max: 200, multiplier: 50 }
        };
      
        const { min, max, multiplier } = isDesktop ? config.desktop : config.mobile;
      
        let lenis;
      
        // Init Lenis (desktop only)
        if (isDesktop && typeof Lenis !== 'undefined') {
          lenis = new Lenis({
            autoRaf: true,
            duration: 1.1,
            smooth: true
          });
        }
      
        // Scroll handler
        function handleScroll(scrollY) {
          const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
          const currentScroll = scrollY ?? $(window).scrollTop();
      
          const scrollProgress = currentScroll / maxScroll;
      
          const currentSize =
            min + (max - min) * scrollProgress * multiplier;
      
          if ($mastheadBg.length > 0) {
            $mastheadBg.css({
              '-webkit-mask-size': currentSize + '%',
              'mask-size': currentSize + '%'
            });
          }

          if ($parallaxSections.length > 0) {
            const windowHeight = window.innerHeight;

            $parallaxSections.each(function() {
              const parent = $(this);
              const parentOffset = parent.offset().top;

              if (currentScroll > parentOffset - windowHeight && currentScroll < parentOffset + parent.outerHeight()) {
                const offset = (currentScroll - parentOffset) * 0.1;

                parent.find('.bg').css({
                  'transform': 'translate3d(0,' + offset + 'px,0)'
                });
              }
            });
          }
        }
      
        // Event binding
        if (isDesktop && lenis) {
          lenis.on('scroll', ({ scroll }) => {
            handleScroll(scroll);
          });
        } else {
          $(window).on('scroll', function () {
            handleScroll();
          });
        }

        handleScroll();


      });

    // INLINE SVG
    jQuery("img.svg").each(function(i) {
        var $img = jQuery(this);
        var imgID = $img.attr("id");
        var imgClass = $img.attr("class");
        var imgURL = $img.attr("src");

        jQuery.get(
            imgURL,
            function(data) {
                var $svg = jQuery(data).find("svg");
                if (typeof imgID !== "undefined") {
                    $svg = $svg.attr("id", imgID);
                }
                if (typeof imgClass !== "undefined") {
                    $svg = $svg.attr("class", imgClass + " replaced-svg");
                }
                $svg = $svg.removeAttr("xmlns:a");
                $img.replaceWith($svg);
            },
            "xml"
        );
    });

    $('.header').each(function(){
        let lastScrollTop = 0;
        let header = $(this);
        $(window).on('scroll', function () {
            let scrollTop = $(this).scrollTop();

            // Jika sudah scroll mentok ke atas, hapus class 'fixed'
            if (scrollTop === 0) {
                header.removeClass('fixed sticky bg-white');
            } 
            // Jika scroll up setelah header menghilang, tambahkan 'fixed'
            else if (scrollTop < lastScrollTop && scrollTop > 50) {
                header.addClass('fix');
            } 
            // Jika scroll ke bawah, hapus class 'fixed'
            else if (scrollTop > lastScrollTop) {
                header.removeClass('fix').addClass('sticky');
                if($('main.elementary').length > 0 || $('main.kindergartenpage').length > 0 || $('main.contactuspage').length > 0 || $('main.dinamicheader').length > 0 || $('main.enrollmentpage').length > 0 || $('main.homepage').length > 0) {
                    header.addClass('bg-white')
                }
            }
            
            lastScrollTop = scrollTop;
        });
        
    })

    $('.mobile-menu').each(function(){
        var mm = $(this);
        mm.on('click', function(){
            $('body').toggleClass('mm-open');
        })
    })
    
    $(document).on("scroll", function () {
        let scrollTop = $(window).scrollTop();
        let windowHeight = $(window).height();
        let $parentSection = $(".section-eight"); // Adjust according to the parent element
    
        
        
        if($parentSection.length > 0){
            let sectionTop = $parentSection.offset().top;
            let sectionHeight = $parentSection.outerHeight();
            // Check if the parent section is in the viewport
            if (scrollTop + windowHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
                $parentSection.addClass('sctiky top-0')
                $(".photo-list").each(function(){
                    var $img = $(this).find('img');
                    $img.each(function (index) {
                        let speedFactor = (index % 2 === 0) ? .2 : .5; // Even to the right, odd to the left
                        let scrollAmount = (scrollTop - sectionTop) * speedFactor;
                        $(this).css("transform", `translateY(${scrollAmount}px)`);
                    });
                });
            }else{
                $parentSection.removeClass('sctiky top-0')
            }
        }
        
    });
    
    
    

    $('.form-back').each(function(){
        $(this).on('click', function(){
            $(this).closest('.step').removeClass('show');
            $(this).closest('.step').prev('.step-one').removeClass('flipout').addClass('flipin');
        })
        
    })
    $('.enrollclick').each(function(){
        let t = $(this),
            $enrollSection = $('body').find('.enrollment-section');
        t.on('click', function(){
            if($enrollSection.length > 0){
                $('body').addClass('enroll-show');
                $enrollSection.addClass('poped').find('.close').removeClass('hidden');
                $enrollSection.attr('data-lenis-prevent', 'true')
            }
        })
    })
    $('.enrollment-section').each(function(){
        let t = $(this),
            $cls = t.find('.close');
        $cls.on('click', function(){
            t.removeClass('poped').removeAttr('data-lenis-prevent');
            $('body').removeClass('enroll-show');
            $(this).addClass('hidden')
        })
    })
    
    $('.enrollment-section form .step-one, .enrollment-section-form form .step-one').each(function(){
        var t = $(this),
            inputs = t.find('input[required]'),
            fn = t.find('.form-next');
    
        // Hilangkan error saat pengguna mulai mengisi
        inputs.on('change', function(){
            if ($(this).attr('type') === 'radio') {
                $(this).closest('.col-span-full').removeClass('relative pb-3').find('.error-message').remove();
                return;
            }

            if($(this).val() !== ""){
                $(this).removeClass('border-red-500 outline outline-red-500 absolute left-0 bottom-[-14px]')
                $(this).parent().removeClass('relative pb-3')
                $(this).next('.error-message').remove();
            }
        });
    
        fn.on('click', function(event){
            event.preventDefault();
            let hasError = false;
            const checkedRadioNames = [];
    
            inputs.each(function() {
                const inputField = $(this);
                const inputType = inputField.attr('type');
                const inputVal = inputField.val()?.trim();
                const errorMessage = inputField.next('.error-message');
                const inputName = inputField.attr('name');
    
                // Hapus error sebelumnya
                errorMessage.remove();
                inputField.removeClass('border-red-500 outline outline-red-500');

                if (inputType === 'radio' && inputName) {
                    if (checkedRadioNames.includes(inputName)) return;
                    checkedRadioNames.push(inputName);

                    const radioGroup = t.find('input[type="radio"][name="' + inputName + '"]');
                    const radioWrap = radioGroup.closest('.col-span-full');
                    radioWrap.find('.error-message').remove();

                    if (radioGroup.filter(':checked').length === 0) {
                        hasError = true;
                        radioWrap.addClass('relative pb-3');
                        radioWrap.append('<div class="error-message text-sm mt-2 text-[#EF4444] absolute left-0 bottom-[-14px]">Please choose one option.</div>');
                    }

                    return;
                }
    
                // Cek jika kosong
                if (!inputVal) {
                    hasError = true;
                    inputField.parent().addClass('relative pb-3')
                    inputField.after('<div class="error-message text-sm mt-2 text-[#EF4444] absolute left-0 bottom-[-14px]">This field is required.</div>');
                    inputField.addClass('border-red-500 outline outline-red-500');
                } else if (inputType === 'email') {
                    // Validasi email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(inputVal)) {
                        hasError = true;
                        inputField.parent().addClass('relative pb-2')
                        inputField.after('<div class="error-message text-sm mt-2 text-[#EF4444] absolute left-0 bottom-[-14px]">Please enter a valid email address.</div>');
                        inputField.addClass('border-red-500 outline outline-red-500');
                    }
                }
            });
    
            if (hasError) {
                return false;
            } else {
                // Form lolos validasi
                $(this).closest('.step').removeClass('flipin').addClass('flipout');
                $(this).closest('.step').next('.step-two').toggleClass('show');
            }
        });
    });
    $('.enrollment-section form .step-two, .enrollment-section-form form .step-two').each(function(){
        var t = $(this),
            inputs = t.find('input[required]'),
            fn = t.find('button[type="submit"]');
    
        // Hilangkan error saat pengguna mulai mengisi
        inputs.on('change', function(){
            if($(this).val() !== ""){
                $(this).removeClass('border-red-500 outline outline-red-500 absolute left-0 bottom-[-14px]')
                $(this).parent().removeClass('relative pb-3')
                $(this).next('.error-message').remove();
            }
        });
    
        fn.on('click', function(event){
            let hasError = false;
    
            inputs.each(function() {
                const inputField = $(this);
                const inputType = inputField.attr('type');
                const inputVal = inputField.val()?.trim();
                const errorMessage = inputField.next('.error-message');
    
                // Hapus error sebelumnya
                errorMessage.remove();
                inputField.removeClass('border-red-500 outline outline-red-500');
    
                // Cek jika kosong
                if (!inputVal) {
                    hasError = true;
                    inputField.parent().addClass('relative pb-3')
                    inputField.after('<div class="error-message text-sm mt-2 text-[#EF4444] absolute left-0 bottom-[-14px]">This field is required.</div>');
                    inputField.addClass('border-red-500 outline outline-red-500');
                } else if (inputType === 'email') {
                    // Validasi email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(inputVal)) {
                        hasError = true;
                        inputField.parent().addClass('relative pb-2')
                        inputField.after('<div class="error-message text-sm mt-2 text-[#EF4444] absolute left-0 bottom-[-14px]">Please enter a valid email address.</div>');
                        inputField.addClass('border-red-500 outline outline-red-500');
                    }
                }
            });
    
            if (hasError) {
                return false;
            }
        });
    });

});

function prosesForm(event) {
    event.preventDefault(); // Mencegah form dikirim ke server

    $('.modal-notif').toggleClass('show');

    return false; // Menghentikan pengiriman form
}

$('.modal-notif').each(function(){
    let t = $(this);
    let $cls = $(this).find('.close-modal-notif');
    $cls.on('click', function(){
        t.removeClass('show');
    })
})

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  var cards = $(".journey-card").toArray();

  if (cards.length > 0 && $(".journey-wraps").length > 0) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".journey-wraps",
        start: "top 25%",
        end: "+=" + (cards.length * 120),
        scrub: true,
        pin: true,
        pinSpacing: false,
      }
    })
    .to(cards, {
      y: function (i) { return -120 * (i + 1); },
      duration: 1,
      stagger: 0.2,
      ease: 'power1.out'
    });
  }
}



function initMatterCanvas(canvasId) {
    const container = document.getElementById(canvasId);
    if (!container || typeof Matter === 'undefined') return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies;

    const engine = Engine.create();
    const world = engine.world;

    function getCanvasHeight() {
        const mobileHeight = parseInt(container.dataset.mheight) || 200;
        const desktopHeight = parseInt(container.dataset.dheight) || 300;

        return window.innerWidth <= 764
            ? mobileHeight
            : desktopHeight;
    }

    const backgroundColor = container.dataset.bg || '#ffffff';

    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: getCanvasHeight(),
            pixelRatio: window.devicePixelRatio,
            background: backgroundColor,
            wireframes: false
        }
    });

    let shapes = [];

    function getShapeProperties() {
        const sw = window.innerWidth;
        if (sw > 1024) return { shapeCount: 25, shapeHeight: 50 };
        if (sw > 760)  return { shapeCount: 30, shapeHeight: 30 };
        return { shapeCount: 30, shapeHeight: 25 };
    }

    function createWorld() {
        World.clear(world, false);
        shapes = [];

        const sh = getCanvasHeight();
        const sw = window.innerWidth;

        const ground = Bodies.rectangle(sw / 2, sh + 10, sw + 100, 100, { isStatic: true, render: { visible: false } }) ;
        const wallLeft = Bodies.rectangle(-50, 0, 100, sh * 2, { isStatic: true, render: { visible: false } });
        const wallRight = Bodies.rectangle(sw + 50, 0, 100, sh * 2, { isStatic: true, render: { visible: false } });
        const roof = Bodies.rectangle(sw / 2, 0, sw, 100, { isStatic: true, render: { visible: false } });

        let texturePaths = [];
        if (container.dataset.texture) {
            try {
                texturePaths = JSON.parse(container.dataset.texture);
            } catch (error) {
                texturePaths = [];
            }
        }
        if (!Array.isArray(texturePaths) || texturePaths.length === 0) return;

        const { shapeCount, shapeHeight } = getShapeProperties();
        const aspectRatio = 133 / 40;
        const shapeWidth = shapeHeight * aspectRatio;

        for (let i = 0; i < shapeCount; i++) {
            const shape = Bodies.rectangle(
                i * shapeWidth / 1.5,
                Math.random() * (sh - shapeHeight),
                shapeWidth,
                shapeHeight,
                {
                    chamfer: { radius: 10 },
                    render: {
                        sprite: {
                            texture: texturePaths[i % texturePaths.length],
                            xScale: shapeWidth / 133,
                            yScale: shapeHeight / 40
                        }
                    }
                }
            );
            shapes.push(shape);
        }

        World.add(world, [ground, wallLeft, wallRight, roof, ...shapes]);
    }

    createWorld();

    function resizeMatter() {
        const newHeight = getCanvasHeight();
        const newWidth = window.innerWidth;
    
        render.canvas.width = newWidth;
        render.canvas.height = newHeight;
    
        render.options.width = newWidth;
        render.options.height = newHeight;
    
        createWorld(); // rebuild bodies supaya tidak keluar bounds
    }
    
    let resizeTimeout;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeMatter, 150);
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const runner = Matter.Runner.create();
    let isRunning = false;

    function startMatter() {
        if (isRunning) return;
        Matter.Runner.run(runner, engine);
        Render.run(render);
        isRunning = true;
    }

    function stopMatter() {
        if (!isRunning) return;
        Matter.Runner.stop(runner);
        Render.stop(render);
        isRunning = false;
    }

    
    let isVisible = false;

    const observer = new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;

        if (isVisible) {
            startMatter();
        } else {
            stopMatter();
        }
    }, { threshold: 0.1 });

    observer.observe(container);

    window.addEventListener('scroll', () => {
        if (!isVisible) return;

        shapes.forEach(shape => {
            Matter.Body.applyForce(shape, shape.position, {
                x: 0,
                y: (Math.random() - 0.5) * 0.2
            });
        });
    });
}
window.addEventListener('load', () => {
    initMatterCanvas('sectionCanvas');
    initMatterCanvas('footerCanvas');
});


$('.enrollswipe').each(function(){
    var t= $(this),
        p= $('.enrollmentpage'),
        f= p.find('#content-form'),
        bt= p.find('.btj'),
        h1 = p.find('h1').get(0);
    t.on('click', function(){
        p.toggleClass('form-view');
        if (h1) {
            h1.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(function() {
            f.removeClass('hidden');
            bt.toggleClass('hidden flex');
        }, 500);
    })
    bt.on('click', function(){
        p.toggleClass('form-view');
        if (h1) {
            h1.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        f.toggleClass('hidden');
        bt.toggleClass('hidden flex');
        setTimeout(function() {
        }, 500);
    });
})

let sdayactive;

function initSwiper() {
  if ($('.swiper-dayactivity').length === 0 || typeof Swiper === 'undefined') {
    if (sdayactive) {
      sdayactive.destroy(true, true);
      sdayactive = undefined;
    }
    return;
  }

  if (sdayactive) {
    sdayactive.destroy(true, true);
  }

  sdayactive = new Swiper('.swiper-dayactivity',{
    slidesPerView: 1.2,
    loop: false,
    spaceBetween: -16,
    navigation: {
        nextEl: ".dayactivity-next",
        prevEl: ".dayactivity-prev",
    },
    breakpoints: {
        768: {
        slidesPerView: 2.2,
        }
    }
  });
}

initSwiper();

let swiperResizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(swiperResizeTimeout);
    swiperResizeTimeout = setTimeout(initSwiper, 150);
});

document.querySelectorAll("details").forEach((el) => {
    el.addEventListener("toggle", () => {
      if (el.open) {
        document.querySelectorAll("details").forEach((other) => {
          if (other !== el) other.open = false
        })
      }
    })
  })

$('.accordion-toggle').click(function () {
    const $thisItem = $(this).closest('.accordion-item');
    const $thisContent = $thisItem.find('.accordion-content');
    const $t = $(this);
    const isOpen = $thisContent.is(':visible');
  
    // Tutup semua konten & reset
    $('.accordion-content').slideUp();
    $('.accordion-item').removeClass('active').find('.btn-expnd').html('+');
    $('.accordion-toggle').removeClass('active');
  
    if (!isOpen) {
      // Buka konten yang diklik
      $thisContent.slideDown();
      $thisItem.addClass('active');
      $t.addClass('active');
      $thisItem.find('.btn-expnd').html('-');
    }
  });

