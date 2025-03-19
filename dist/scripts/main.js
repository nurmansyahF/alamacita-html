$(document).ready(function() {
    // Initialize Lenis
    // const lenis = new Lenis({
    //     autoRaf: true,
    //     duration: 1.1, // Durasi scroll dalam detik
    //     smooth: true
    // });
    
    // // Listen for the scroll event and log the event data
    // lenis.on('scroll', (e) => {
    //     // console.log(e);
    // });

    $('.header').each(function(){
        let lastScrollTop = 0;
        let header = $(this);
        $(window).on('scroll', function () {
            let scrollTop = $(this).scrollTop();

            // Jika sudah scroll mentok ke atas, hapus class 'fixed'
            if (scrollTop === 0) {
                header.removeClass('fixed sticky');
            } 
            // Jika scroll up setelah header menghilang, tambahkan 'fixed'
            else if (scrollTop < lastScrollTop && scrollTop > 50) {
                header.addClass('fix');
            } 
            // Jika scroll ke bawah, hapus class 'fixed'
            else if (scrollTop > lastScrollTop) {
                header.removeClass('fix').addClass('sticky');
            }

            lastScrollTop = scrollTop;
        });
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
    });

    $(document).on("scroll", function () {
        let scrollTop = $(window).scrollTop();
        let windowHeight = $(window).height();
        let $parentSection = $(".section-eight"); // Adjust according to the parent element
    
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
    });
    
    $('.form-next').each(function(){
        $(this).on('click', function(){
            $(this).closest('.step').removeClass('flipin').addClass('flipout');
            $(this).closest('.step').next('.step-two').toggleClass('show');
        })
        
    })
    $('.form-back').each(function(){
        $(this).on('click', function(){
            $(this).closest('.step').removeClass('show');
            $(this).closest('.step').prev('.step-one').removeClass('flipout').addClass('flipin');
        })
        
    })
    $('.enrollment-section').each(function(){
        let t = $(this),
            $cls = t.find('.close');
        $cls.on('click', function(){
            t.removeClass('poped');
            $('body').removeClass('enroll-show');
            $(this).addClass('hidden')
        })
    })

    
});
$('.enrollclick').each(function(){
    let t = $(this);
    let $enrollSection = $('body').find('.enrollment-section');
    t.on('click', function(){
        if($enrollSection.length > 0){
            $('body').addClass('enroll-show');
            $enrollSection.addClass('poped').find('.close').removeClass('hidden');
        }
    })
})
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

    var render = Render.create({
        element: document.getElementById('footerCanvas'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: 300,
            pixelRatio: 2,
            background: '#FFF',
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
        
        const sh = 320,
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

    window.addEventListener('resize', () => {
        render.options.width = window.innerWidth;
        render.canvas.width = window.innerWidth;
        getShapeProperties();
        createWorld();
    });
}

window.onload = initMatterJS;



