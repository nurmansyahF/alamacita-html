$(document).ready(function() {
    if (window.matchMedia("(min-width: 1023px)").matches) {
        // Initialize Lenis hanya di desktop
        const lenis = new Lenis({
            autoRaf: true,
            duration: 1.1, // Durasi scroll dalam detik
            smooth: true
        });
    
        lenis.on('scroll', (e) => {
            // console.log(e);
        });
    
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        window.addEventListener('scroll', () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollY = window.scrollY;
        
            // Persentase scroll dari 0 ke 1
            const scrollProgress = scrollY / maxScroll;
        
            // Ukuran mask dinamis dari 30% ke 100%
            const minSize = 50;
            const maxSize = 100;
            const currentSize = minSize + (maxSize - minSize) * scrollProgress * 30;
            // Apply ke elemen
            $('.masthead-animation .bg-animation').css({
                '-webkit-mask-size': currentSize + '%',
                'mask-size': currentSize + '%'
              });
            // $('.masthead-animation .bg-animation:after').style.maskSize = `${currentSize}%`;
          });

    }

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
                if($('main.elementary').length > 0 || $('main.kindergartenpage').length > 0 || $('main.contactuspage').length > 0 || $('main.dinamicheader').length > 0 || $('main.enrollmentpage').length > 0) {
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
    
    // const $background = $(".section-two .bg");
    // const $paralax = $(".paralax .bg");
    
    // $(document).on("scroll", function() {
    //     let scrollY = $(window).scrollTop();
    //     let moveY = (scrollY / $(document).height()) * -600; // Sesuaikan dengan proporsi dokumen
    //     let moveY2 = (scrollY / $(document).height()) * 500; // Sesuaikan dengan proporsi dokumen
    //     // $background.css("background-position", `0px ${moveY}px`);
    //     $background.css("transform", `scale(1.2) translateY(${moveY}px)`);
    //     $paralax.css("transform", `translateY(${moveY2}px)`);
    // });
    
    const $background = $(".section-two .bg");
    const $paralax = $(".paralax .bg");

    function isInViewport(element) {
        let rect = element.get(0).getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // $(document).on("scroll", function () {        
    //     let windowHeight = $(window).height();
    //     let scrollY = $(window).scrollTop();
    //     let moveY = (scrollY / $(document).height()) * -1000;

    //     $(".section-two").each(function () {
    //         if (isInViewport($(this))) {
    //             $background.css("transform", `scale(1.2) translateY(${moveY}px)`);
    //         }
    //     });
    // });

    
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();
    
        $('.paralax').each(function() {
            var parent = $(this);
            var parentOffset = parent.offset().top; // Get the offset of the current parent
    
            // Check if the current scroll position is within the bounds of the parent
            if (scrollTop > parentOffset - windowHeight && scrollTop < parentOffset + parent.outerHeight()) {
                var offset = (scrollTop - parentOffset) * 0.1; // Adjust parallax speed
                parent.find('.bg').css({
                    'background-position': 'center ' + offset + 'px'
                });
            }
        });
        // $('.rellax').each(function() {
        //     var parent = $(this);
        //     var parentOffset = parent.offset().top; // Get the offset of the current parent
    
        //     // Check if the current scroll position is within the bounds of the parent
        //     if (scrollTop > parentOffset - windowHeight && scrollTop < parentOffset + parent.outerHeight()) {
        //         var offset = (scrollTop - parentOffset) * 0.5; // Adjust parallax speed
        //         parent.find('.bg').css({
        //             'transform': 'translate3d(0px, ' + offset + 'px, 0px)'
        //         });
        //     }
        // });
    });

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
                        // console.log(scrollAmount)
                        
        
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
    
    $('.enrollment-section form .step-one').each(function(){
        var t = $(this),
            inputs = t.find('input[required]'),
            fn = t.find('.form-next');
    
        // Hilangkan error saat pengguna mulai mengisi
        inputs.on('change', function(){
            if($(this).val() !== ""){
                $(this).removeClass('border-red-500 outline outline-red-500 absolute left-0 bottom-[-14px]')
                $(this).parent().removeClass('relative pb-3')
                $(this).next('.error-message').remove();
            }
        });
    
        fn.on('click', function(event){
            console.log('tombol diklik'); // Debug log
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
            } else {
                // Form lolos validasi
                $(this).closest('.step').removeClass('flipin').addClass('flipout');
                $(this).closest('.step').next('.step-two').toggleClass('show');
            }
        });
    });
    $('.enrollment-section form .step-two').each(function(){
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
            console.log('tombol diklik'); // Debug log
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

    // let nama = document.getElementById("first-name").value;
    // alert("Form dikirim! Nama: " + nama);
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

// Homepage Onepage Scroll - List ke Tumpukan
// $("#content-journey").each(function () {
//     const $section = $(this);
//     const $columns = $section.find(".journey-card");
//     const stepCount = $columns.length;
//     const scrollLength = stepCount * 100; // jarak scroll total
//     const overlap = 20;

//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: $section[0],
//             start: "top 50%",
//             end: `+=${scrollLength}`,
//             scrub: true,
//             pin: false,
//             markers: true
//         }
//     });

//     $columns.each(function (index) {
//         const $current = $(this);

//         // Posisi awal list biasa
//         gsap.set($current, {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transformOrigin: "center top",
//             position: "relative",
//             zIndex: stepCount + index
//         });

//         if (index > 0) {
//             // Hitung total tinggi semua kartu sebelumnya
//             let totalHeight = 0;
//             $columns.slice(0, index).each(function () {
//                 totalHeight += $(this).outerHeight();
//             });

//             const moveUp = totalHeight - overlap;

//             // Animasi geser kartu ini naik
//             tl.to($current, {
//                 y: -moveUp,
//                 ease: "power1.out",
//                 duration: 0.9
//             }, index * 0.3);

//             // Animasi kartu sebelumnya mengecil
//             const $prev = $columns.eq(index - 1);
//             tl.to($prev, {
//                 scale: 0.95,
//                 duration: 0.5,
//                 ease: "power1.out"
//             }, index * 0.3);
//         }
//     });
    
// });

// $("#content-journey").each(function () {
//     const $section = $(this);
//     const $columns = $section.find(".journey-card");
//     const stepCount = $columns.length;
//     const scrollLength = stepCount * 300; // jarak scroll total
//     const overlap = 30;

//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: $section[0],
//             start: "top 20%",
//             end: `+=${scrollLength}`,
//             scrub: true,
//             pin: true,
//             markers: false
//         }
//     });

//     $columns.each(function (index) {
//         const $current = $(this);

//         // Posisi awal list biasa
//         gsap.set($current, {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transformOrigin: "center top",
//             position: "relative",
//             zIndex: stepCount + index
//         });

//         if (index > 0) {
//             let totalHeight = 0;
//             $columns.slice(0, index).each(function () {
//                 totalHeight += $(this).outerHeight();
//             });
        
//             const moveUp = totalHeight - overlap;
        
//             // Pindahkan card sekarang ke atas
//             tl.to($current, {
//                 y: -moveUp,
//                 ease: "power1.inOut",
//                 duration: 0.9
//             }, index * 0.3);
        
//             // Scale down semua card yang sudah di belakang
//             $columns.slice(0, index).each(function (i) {
//                 const distanceFromTop = index - 1 - i; // jarak dari card terdepan di belakang
//                 const targetScale = 0.95 - (distanceFromTop * 0.03); 
//                 // contoh: card paling dekat di belakang = 0.95, di belakangnya lagi = 0.92, dst.
        
//                 tl.to($(this), {
//                     scale: targetScale,
//                     duration: 0.5,
//                     ease: "power1.inOut"
//                 }, index * 0.3);
//             });
//         }
//     });
    
// });


// const overlap = 20;

// $("#content-journey").each(function () {
//     const $section = $(this);
//     const $columns = $section.find(".journey-card");
//     const stepCount = $columns.length;
//     const scrollLength = stepCount * 300;
    

//     // Jangan ubah tinggi parent saat pakai pin
//     // Set posisi relative tetap diperlukan untuk transform y bekerja
//     gsap.set($section, {
//         position: "relative"
//     });

//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: $section[0],
//             start: "top 20%",
//             end: `+=${scrollLength}`,
//             scrub: true,
//             pin: true,          // pin aktif
//             markers: true
//         }
//     });

    

//     $columns.each(function (index) {
//         const $current = $(this);

//         let totalHeight = 0;
//         $columns.each(function() {
//             totalHeight += $(this).outerHeight();
//         });

//         gsap.set($current, {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transformOrigin: "center top",
//             position: "relative",
//             zIndex: stepCount + index
//         });

//         if (index > 0) {
//             let totalHeight = 0;
//             $columns.slice(0, index).each(function () {
//                 totalHeight += $(this).outerHeight();
//             });

//             const moveUp = totalHeight - overlap;

//             tl.to($current, {
//                 y: -moveUp,
//                 ease: "power1.out",
//                 duration: 0.9
//             }, index * 0.3);

//             const $prev = $columns.eq(index - 1);
//             tl.to($prev, {
//                 scale: 0.95,
//                 duration: 0.5,
//                 ease: "power1.out"
//             }, index * 0.3);
//         }
//     });
// });

// const overlap = 40;
// $("#content-journey").each(function () {
//     const $section = $(this).find('.journey-wraps');
//     const $columns = $section.find(".journey-card");
//     const stepCount = $columns.length;
//     const scrollLength = stepCount * 500;

//     // Hitung tinggi final stack
//     const finalHeight = (() => {
//         let total = 0;
//         $columns.each(function (i) {
//             total += $(this).outerHeight();
//             if (i > 0) total -= overlap;
//         });
//         return total;
//     })();

//     gsap.set($section, { position: "relative" });

//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: $section[0],
//             start: "top 10%",
//             end: `+=${scrollLength}`,
//             scrub: true,
//             pin: true,
//             markers: true,
//             onRefresh: self => {
//                 // Ubah tinggi spacer supaya tidak kelewat tinggi
//                 gsap.set(self.pinSpacer, { height: finalHeight });
//                 // $('.pin-spacer').css({height: 0}, {padding: "0px 0px 500px"})
//             },
//             onLeave: self => {
//                 // Hapus pin supaya tidak "nempel" lagi
//                 // self.disable(false); // false = tidak mematikan animasi
//                 // gsap.set(self.pinSpacer, { height: "auto" });
//                 // console.log('end')
//                 // $('.pin-spacer').css({height: 0}, {padding: "0px 0px 500px"})
//             }
//         }
        
//     });

//     $columns.each(function (index) {
//         const $current = $(this);

//         gsap.set($current, {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transformOrigin: "center top",
//             position: "relative",
//             zIndex: stepCount + index
//         });

//         if (index > 0) {
//             let totalHeight = 0;
//             $columns.slice(0, index).each(function () {
//                 totalHeight += $(this).outerHeight();
//             });
        
//             const moveUp = totalHeight - overlap;
        
//             // Pindahkan card sekarang ke atas
//             tl.to($current, {
//                 y: -moveUp,
//                 ease: "power1.inOut",
//                 duration: 0.9
//             }, index * 0.3);
        
//             // Scale down semua card yang sudah di belakang
//             $columns.slice(0, index).each(function (i) {
//                 const distanceFromTop = index - 1 - i; // jarak dari card terdepan di belakang
//                 const targetScale = 0.95 - (distanceFromTop * 0.03); 
//                 // contoh: card paling dekat di belakang = 0.95, di belakangnya lagi = 0.92, dst.
        
//                 tl.to($(this), {
//                     scale: targetScale,
//                     duration: 0.5,
//                     ease: "power1.inOut"
//                 }, index * 0.3);
//             });
//         }
        
//     });

//     // Ubah tinggi parent di akhir animasi
//     tl.to($section, {
//         height: finalHeight,
//         duration: 0.5,
//         ease: "power1.out"
//     }, "+=0");
// });

// const overlap = 20;
// $("#content-journey").each(function () {
//     const $section = $(this).find('.journey-wraps');
//     const $columns = $section.find(".journey-card");
//     const stepCount = $columns.length;
//     const scrollLength = stepCount * 100;

//     gsap.set($section, { position: "relative" });

//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: $section[0],
//             start: "top 15%",
//             // end: `+=${scrollLength}`,
//             end: `+=500`,
//             scrub: true,
//             pin: true,
//             markers: true,
//             onRefresh: self => {
//                 // gsap.set(self.pinSpacer, { height: calcFinalHeight() });
//             },
//             onLeave: self => {
//                 // $('.journey-wraps').css('height', scrollLength);
//                 // $('.pin-spacer').css({ height: scrollLength * 1/2, 'padding-bottom': scrollLength * 1/2 });
//             },
//         }
//     });

//     // Fungsi untuk hitung tinggi stack saat ini
//     function calcHeightUntil(index) {
//         let total = 0;
//         $columns.slice(0, index + 1).each(function (i) {
//             total += $(this).outerHeight();
//             if (i > 0) total -= overlap;
//         });
//         return total;
//     }

//     // Fungsi untuk hitung tinggi final (semua card stack)
//     function calcFinalHeight() {
//         let total = 0;
//         $columns.each(function (i) {
//             total += $(this).outerHeight();
//             if (i > 0) total -= overlap;
//         });
//         return total;
//     }

//     $columns.each(function (index) {
//         const $current = $(this);

//         gsap.set($current, {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transformOrigin: "center top",
//             position: "relative",
//             zIndex: stepCount + index
//         });

//         if (index > 0) {
//             let totalHeightBefore = 0;
//             $columns.slice(0, index).each(function () {
//                 totalHeightBefore += $(this).outerHeight();
//             });

//             const moveUp = totalHeightBefore - overlap;

//             // Pindahkan card sekarang ke atas
//             tl.to($current, {
//                 marginTop: -moveUp,
//                 ease: "power1.inOut",
//                 duration: 0.9,
//                 onUpdate: () => {
//                     // Set tinggi parent agar gap hilang
//                     // gsap.set($section, { height: calcHeightUntil(index) });
//                 }
//             }, index * 0.3);

//             // Scale down semua card yang sudah di belakang
//             $columns.slice(0, index).each(function (i) {
//                 const distanceFromTop = index - 1 - i;
//                 const targetScale = 0.95 - (distanceFromTop * 0.03);
//                 tl.to($(this), {
//                     scale: targetScale,
//                     duration: 0.5,
//                     ease: "power1.inOut"
//                 }, index * 0.3);
//             });
//         }
//     });

//     // Set tinggi final setelah semua card stack
//     tl.to($section, {
//         height: calcFinalHeight(),
//         duration: 0.5,
//         ease: "power1.out"
//     }, "+=0");
// });

gsap.registerPlugin(ScrollTrigger);

  var cards = $(".journey-card").toArray();

  gsap.timeline({
    scrollTrigger: {
      trigger: ".journey-wraps",
      start: "top 25%",
      end: "+=" + (cards.length * 120),
      scrub: true,
      pin: true,
      pinSpacing: false,
    //   markers: true,
    }
  })
  .to(cards, {
    y: function (i) { return -120 * (i + 1); },
    // scale: function (i) { return 1 - (i * 0.05); },
    duration: 1,
    stagger: 0.2,
    ease: 'power1.Out'
  });



// Matter JS
function initMatterJS() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Events = Matter.Events,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    var engine = Engine.create(),
        world = engine.world;

    function getCanvasHeight() {
        return window.innerWidth > 764 ? 300 : 200;
    }

    var render = Render.create({
        element: document.getElementById('footerCanvas'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: getCanvasHeight(),
            pixelRatio: 2,
            background: '#123',
            wireframes: false,
        }
    });
    
    let shapes = [];
    let ground, wallLeft, wallRight, roof;

    function getShapeProperties() {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1024) {
            return { shapeCount: 25, shapeHeight: 50 };
        } else if (screenWidth > 760) {
            return { shapeCount: 30, shapeHeight: 30 };
        } else {
            return { shapeCount: 30, shapeHeight: 25 };
        }
    }

    function createWorld() {
        World.clear(world);
        shapes = [];
        
        const sh = getCanvasHeight(),
              sw = window.innerWidth;

        ground = Bodies.rectangle(sw / 2, sh + 10, sw + 100, 100, { isStatic: true, render: { fillStyle: '#FFFFFF' } });
        wallLeft = Bodies.rectangle(-50, 0, 100, sh * 2, { isStatic: true, render: { fillStyle: '#FFFFFF' } });
        wallRight = Bodies.rectangle(sw + 50, 0, 100, sh * 2, { isStatic: true, render: { fillStyle: '#FFFFFF' } });
        roof = Bodies.rectangle(sw / 2, 0, sw, 100, { isStatic: true, render: { fillStyle: '#FFFFFF' }});

        var texturePaths = $('#footerCanvas').data('texture'); 
        if (typeof texturePaths === 'string') {
            texturePaths = JSON.parse(texturePaths);
        }

        const { shapeCount, shapeHeight } = getShapeProperties();
        const aspectRatio = 133 / 40;
        const shapeWidth = shapeHeight * aspectRatio;

        for (let i = 0; i < shapeCount; i++) {
            var shape = Bodies.rectangle(
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

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
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

    Matter.Runner.run(engine);
    Render.run(render);

    let isCanvasVisible = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            isCanvasVisible = entry.isIntersecting;
        });
    }, { threshold: 0.1 });

    observer.observe(document.getElementById('footerCanvas'));

    window.addEventListener('scroll', () => {
        if (!isCanvasVisible) return;
        shapes.forEach(shape => {
            Matter.Body.applyForce(shape, shape.position, {
                x: (Math.random() - 0.5) * 0,
                y: (Math.random() - 0.5) * 0.2
            });
        });
    });

    // window.addEventListener('resize', () => {
    //     render.options.width = window.innerWidth;
    //     render.options.height = getCanvasHeight();
    //     render.canvas.width = window.innerWidth;
    //     render.canvas.height = getCanvasHeight();
    //     createWorld();
    // });
}
// window.onload = initMatterJS;

// New Matter JS
// function initMatterCanvas(canvasId) {
//     const container = document.getElementById(canvasId);
//     if (!container) return;

//     const Engine = Matter.Engine,
//           Render = Matter.Render,
//           MouseConstraint = Matter.MouseConstraint,
//           Mouse = Matter.Mouse,
//           World = Matter.World,
//           Bodies = Matter.Bodies;

//     const engine = Engine.create();
//     const world = engine.world;

//     function getCanvasHeight() {
//         return window.innerWidth > 764 ? 300 : 200;
//     }

//     const render = Render.create({
//         element: container,
//         engine: engine,
//         options: {
//             width: window.innerWidth,
//             height: getCanvasHeight(),
//             pixelRatio: window.devicePixelRatio,
//             // pixelRatio: 2,
//             // background: '#ffffff',
//             background: 'transparent',
//             wireframes: false
//         }
//     });

//     let shapes = [];
//     let ground, wallLeft, wallRight, roof;

//     function getShapeProperties() {
//         const sw = window.innerWidth;
//         if (sw > 1024) return { shapeCount: 25, shapeHeight: 50 };
//         if (sw > 760)  return { shapeCount: 30, shapeHeight: 30 };
//         return { shapeCount: 30, shapeHeight: 25 };
//     }

//     function createWorld() {
//         World.clear(world, false);
//         shapes = [];

//         const sh = getCanvasHeight();
//         const sw = window.innerWidth;

//         ground = Bodies.rectangle(sw / 2, sh + 10, sw + 100, 100, { isStatic: true });
//         wallLeft = Bodies.rectangle(-50, 0, 100, sh * 2, { isStatic: true });
//         wallRight = Bodies.rectangle(sw + 50, 0, 100, sh * 2, { isStatic: true });
//         roof = Bodies.rectangle(sw / 2, 0, sw, 100, { isStatic: true });

//         let texturePaths = container.dataset.texture;
//         if (typeof texturePaths === 'string') {
//             texturePaths = JSON.parse(texturePaths);
//         }

//         const { shapeCount, shapeHeight } = getShapeProperties();
//         const aspectRatio = 133 / 40;
//         const shapeWidth = shapeHeight * aspectRatio;

//         for (let i = 0; i < shapeCount; i++) {
//             const shape = Bodies.rectangle(
//                 i * shapeWidth / 1.5,
//                 Math.random() * (sh - shapeHeight),
//                 shapeWidth,
//                 shapeHeight,
//                 {
//                     chamfer: { radius: 10 },
//                     render: {
//                         sprite: {
//                             texture: texturePaths[i % texturePaths.length],
//                             xScale: shapeWidth / 133,
//                             yScale: shapeHeight / 40
//                         }
//                     }
//                 }
//             );
//             shapes.push(shape);
//         }

//         World.add(world, [ground, wallLeft, wallRight, roof, ...shapes]);
//     }

//     createWorld();

//     const mouse = Mouse.create(render.canvas);
//     const mouseConstraint = MouseConstraint.create(engine, {
//         mouse: mouse,
//         constraint: { stiffness: 0.2, render: { visible: false } }
//     });

//     World.add(world, mouseConstraint);
//     render.mouse = mouse;

//     mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
//     mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

//     Matter.Runner.run(engine);
//     Render.run(render);

//     let isVisible = false;

//     const observer = new IntersectionObserver(entries => {
//         isVisible = entries[0].isIntersecting;
//     }, { threshold: 0.1 });

//     observer.observe(container);

//     window.addEventListener('scroll', () => {
//         if (!isVisible) return;

//         shapes.forEach(shape => {
//             Matter.Body.applyForce(shape, shape.position, {
//                 x: 0,
//                 y: (Math.random() - 0.5) * 0.2
//             });
//         });
//     });
// }
// window.addEventListener('load', () => {
//     initMatterCanvas('footerCanvas');
//     initMatterCanvas('sectionCanvas');
// });

// New Matter JS2
function initMatterCanvas(canvasId) {
    const container = document.getElementById(canvasId);
    if (!container) return;

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
        // return window.innerWidth > 764 ? 300 : 200;
    }

    // 👉 ambil background dari data attribute (fallback putih)
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

        let texturePaths = container.dataset.texture;
        if (typeof texturePaths === 'string') {
            texturePaths = JSON.parse(texturePaths);
        }

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

    Matter.Runner.run(engine);
    Render.run(render);

    
    let isVisible = false;

    const observer = new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;
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
        // Scroll to the first <h1> in the enrollment page when the enrollswipe button is clicked
        if (h1) {
            h1.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(function() {
            f.removeClass('hidden');
            bt.toggleClass('hidden flex');
        }, 500); // 500ms delay
    })
    // Example: Add a timeout before toggling the form-view class
    bt.on('click', function(){
        p.toggleClass('form-view');
        if (h1) {
            h1.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        f.toggleClass('hidden');
        bt.toggleClass('hidden flex');
        setTimeout(function() {
        }, 500); // 500ms delay
    });
})


// window.addEventListener('resize', function() {
//     $('#windowwidth').html(window.innerWidth)
// });


