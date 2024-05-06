gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector("[data-scroll-container]");

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true,
  smartphone: {
    smooth: false,
    breakpoint: 7673
    },
    tablet: {
        smooth: true,
        breakpoint: 1024
    },  
});


  
scroller.on("scroll", ScrollTrigger.update);
scroller.on("scroll", function(e){
    if (window.matchMedia("(min-width: 768px)").matches) {
        let topValue = Math.round(e.scroll.y);
        let headerHeight = $('.site-header').outerHeight() / 2;
        //console.log(headerHeight, topValue);
        if(topValue > headerHeight){
            $('body').addClass('fixedHeader');
            $('.site-header').css({top : Math.round(e.scroll.y)+'px'});
        }
        else{
            $('body').removeClass('fixedHeader');
            $('.site-header').css({top : Math.round(e.scroll.y)+'px'});
        }
    }    

        
});

if (window.matchMedia("(max-width: 767px)").matches) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('body').addClass('fixedHeader');
        } else {
            $('body').removeClass('fixedHeader');
        }	
	});
}


function stickyHeader(){
    console.log('test');
    $('.wrapper').scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('body').addClass('stcikyHeader');
        } else {
            //$('body').removeClass('stcikyHeader');
        }	
	});    
}

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed"
});

document.addEventListener("DOMContentLoaded", function() {


    const gridItems = document.querySelectorAll(".ser-grid-item");
    gridItems.forEach((item) => {
        const clickListener = function () {
            repositionItems(item);
        };
        item.addEventListener("click", clickListener);
        //gridItemClickListeners.push(clickListener);

        gsap.set(".ser-grid-item:not(.is--active) .accInfo, .ser-grid-item:not(.is--active) .accImg", { clipPath: "inset(0% 0% 100% 0%)" });
    });

    function repositionItems(clickedItem){    
        console.log(clickedItem);
        const currentState = Flip.getState(".ser-grid-item");
        const slot1 = document.querySelector('[ser-slot="1"]');
        const slot2 = document.querySelector('[ser-slot="2"]');
        const slot3 = document.querySelector('[ser-slot="3"]');
        const slot4 = document.querySelector('[ser-slot="4"]');
        const slot5 = document.querySelector('[ser-slot="5"]');
        const currSlot1Item = slot1.querySelector(".ser-grid-item");
        const currSlot2Item = slot2.querySelector(".ser-grid-item");
        const currSlot3Item = slot3.querySelector(".ser-grid-item");
        const currSlot4Item = slot4.querySelector(".ser-grid-item");
        const currSlot5Item = slot5.querySelector(".ser-grid-item");    
    
        if (clickedItem === currSlot5Item) {
            // Move clicked item to slot 1
            slot1.appendChild(clickedItem);
            clickedItem.classList.add("is--active");
            // Move current item from slot 1 to slot 5
            if (currSlot1Item && clickedItem !== currSlot1Item) {
                slot5.appendChild(currSlot1Item);
            }
        } else if (clickedItem === currSlot1Item) {
            // Do nothing if clicking on slot 1
            return;
        } else {
            // Move clicked item to slot 1
            slot1.appendChild(clickedItem);
            clickedItem.classList.add("is--active");
            // Move current items accordingly
            if (currSlot1Item && clickedItem !== currSlot1Item) {
                slot5.appendChild(currSlot1Item);
            }
            if (currSlot5Item && clickedItem !== currSlot5Item) {
                slot4.appendChild(currSlot5Item);
            } else if (currSlot4Item && clickedItem !== currSlot4Item) {
                slot4.appendChild(currSlot4Item);
            }
            if (currSlot4Item && clickedItem !== currSlot4Item && clickedItem !== currSlot5Item) {
                slot3.appendChild(currSlot4Item);
            } else if (currSlot3Item && clickedItem !== currSlot3Item) {
                slot3.appendChild(currSlot3Item);
            }
            if (currSlot3Item && clickedItem !== currSlot3Item && clickedItem !== currSlot4Item) {
                slot2.appendChild(currSlot3Item);
            } else if (currSlot2Item && clickedItem !== currSlot2Item) {
                slot2.appendChild(currSlot2Item);
            }
        }
        Flip.from(currentState, { duration: 0.6, ease: "power1.inOut" });    

        document.querySelectorAll(".ser-grid-item").forEach((item) => {
            if (item !== slot1.querySelector(".ser-grid-item")) {
                item.classList.remove("is--active");
                gsap.to(item.querySelector(".accInfo"), { clipPath: "inset(0% 0% 100% 0%)", duration: 0.4, ease: "power1.out" });
                gsap.to(item.querySelector(".accImg"), { clipPath: "inset(0% 0% 100% 0%)", duration: 0.4, ease: "power1.out" });
            }    
        });       
        gsap.to(clickedItem.querySelector(".accInfo"), { delay: 0.2, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power1.in", overwrite: "auto" });
        gsap.to(clickedItem.querySelector(".accImg"), { delay: 0.8, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power1.out", overwrite: "auto" });

        
    }
    
      
    gsap.from('#imgWrapper', {
        scrollTrigger: {
            scroller: pageContainer, //locomotive-scroll
            scrub: true,
            trigger: '#imgWrapper',
            //pin: true,
            // anticipatePin: 1,
            //markers: true,
            start: "top 80%",
            end: "+=500"
        },
        clipPath: "inset(0 4rem 8rem 4rem)",
        ease:"linear",
    });

    gsap.from('#imgWrapper img', {
        scrollTrigger: {
            scroller: pageContainer, //locomotive-scroll
            scrub: true,
            trigger: '#imgWrapper',
            //pin: true,
            // anticipatePin: 1,
            //markers: true,
            start: "top 80%",
            end: "bottom 105%"
        },
        scale: 1.1,        
        rotation:1,
        ease:"linear",
    });    


    $('[data-text-split]').each(function(){
        const splittextType = $(this).attr('data-text-split-type');        
        const textChar = new SplitType($(this), { types: splittextType });
    })

    const tl = gsap.timeline();
    
    tl.from(".titleSec .char", 1, {
        y: '100%',
        ease: "power4.out",
        delay: 0.5,
        stagger: {
          amount: 1.5
        }
      }).from(".titleSec .btn-secondary", 1, {
        y: '100%',
        opacity: '0'
      }, 1.5)



    //   gsap.utils.toArray('.scrollTrigger .char').forEach(function(char) {
    //     gsap.from(char, {
    //         opacity: 0,
    //         y: 50,
    //         duration: 1,
    //         scrollTrigger: {
    //             trigger: char,
    //             scroller: pageContainer, 
    //             start: "top center", // Adjust this value as per your requirement
    //             end: "bottom 20%", // Adjust this value as per your requirement
    //             toggleActions: "play none none reverse",
    //             stagger: {
    //                 amount: 1.5
    //             }                
    //         }
    //     });
    // });


    //   const textElements = gsap.utils.toArray('.scrollTrigger .char');

    //   let tlnew = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: textElements,
    //       scroller: pageContainer,
    //       start: "top 70%", 
    //       end: "bottom 110%", 
    //       scrub: 1, 
    //       //markers: true,
    //       //pin: true
    //       }
    //   })

    //   tlnew.from(textElements, {
    //     y: '100%',
    //     opacity: '0',
    //     ease: "power1.in",
    //     delay: 0.5,
    //     stagger: {
    //         amount: 0.5
    //     }
    //   });



    //   textElements.forEach(textanimation => {
    //     gsap.to('.scrollTrigger .char', {
    //         y: '100%',
    //         ease: "power4.out",
    //         delay: 0.5,        
    //         stagger: {
    //           amount: 1.5
    //         },
    //         scrollTrigger: {
    //             trigger: textanimation,
    //             start: 'top top',
    //             //end: 'center 20%',
    //             scrub: true,
    //         },
    //     });
    //   });


    
    $(document).on("click","#menuButton, .menuClose",function() {
        if($('body').hasClass('menuExpand')){            
            $('body').addClass('hideMenu');
            setTimeout(function(){
                $('body').removeClass('menuExpand');
            },500)
            setTimeout(function(){
                $('body').removeClass('hideMenu');
            },550)            
        }
        else{
            $('body').addClass('menuExpand');
        }
    });


    $(document).on("click",".expandDiv",function() {
        if($(this).parents('.fcolunnWrapper').hasClass('expandActive')){
            $(this).parents('.fcolunnWrapper').removeClass('expandActive');
            $(this).parents('.columnMain').removeClass('expandActiveChild');
        }            
        else{
            $(this).parents('.fcolunnWrapper').addClass('expandActive');
            $(this).parents('.columnMain').addClass('expandActiveChild');            
        }
    });



    
/* Random logo animation */
var $timer = 1500; // slider time for each rotate

randome_Logo_generator();
function randome_Logo_generator() {
  var size = $(".all-logos li").length - 1,
    class_,
    old_X = 0,
    x,
    y,
    counter = 5;
  setInterval(function () {
    x = generateRandom_position(0, 5, old_X);
    y = counter;
    $(".displayedLogo").find("li span").eq(x).addClass("out").removeClass("in");
    class_ = $(".all-logos").find("li span").eq(y).html();
    setTimeout(function () {
      $(".displayedLogo").find("li span").eq(x).html("");
      $(".displayedLogo").find("li span").eq(x).html(class_);
      $(".displayedLogo").find("li span").eq(x).fadeIn();
    }, 350);
    setTimeout(function () {
      $(".displayedLogo").find("li span").eq(x).removeClass("out").addClass("in");
    }, 650);
    if (counter == size) {
      counter = 0;
    } else {
      counter++;
    }
    old_X = x;
  }, $timer);
}

function generateRandom_position(min, max, num1) {
  var rtn = Math.floor(Math.random() * (max - min + 1)) + min;
  return rtn == num1 ? generateRandom_position(min, max, num1) : rtn;
}


let horizontalSections = gsap.utils.toArray(".sectionPin");

horizontalSections.forEach((section) => {
  let wrap = section.querySelector(".pin-wrap");
  let pinBoxes = section.querySelectorAll(".pin-wrap > *");
  let wrapWidth = wrap.offsetWidth;
  let horizontalScrollLength = wrapWidth - window.innerWidth;

  ScrollTrigger.saveStyles(".mobile, .desktop");
  ScrollTrigger.matchMedia({
    "(min-width: 992px)": function() {
        gsap.to(wrap, {
            scrollTrigger: {
            scroller: pageContainer, //locomotive-scroll
            scrub: true,
            trigger: section,
            pin: true,
            // anticipatePin: 1,
            start: "top top"
            },
            x: -horizontalScrollLength,
            ease:"linear",
        });
        }  
    });        
});

ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

ScrollTrigger.refresh();



const targets = gsap.utils.toArray(".scrollAnimate");
targets.forEach((target) => {
  let SplitClient = new SplitType(target, { type: "words,chars" });
  let chars = SplitClient.chars; //an array of all the divs that wrap each character
  gsap.from(chars, {
    duration: 0.8,
    opacity: 0,
    y: '100%',
    ease: "power4.out",
    delay: 0.5,    
    //ease: "none",
    stagger: 0,
    scrollTrigger: {
      trigger: target,
      scroller: pageContainer,
      //markers: true,
      start: "top 70%",
      end: "bottom 70%",
      scrub: true
    }
  });
});


// var SplitText01 = new SplitType('.scrollAnimate', {type:"words,chars"}), 
//     chars01 = SplitText01.chars;
    

// $('.scrollAnimate').each(function(){
//     let mainThis = $(this);
//     let words = $(this).find('.word');

//     // Loop through each word
//     words.each(function() {
//         let chars = $(this).find('.char');

//         gsap.from(chars01, {
//             opacity: 0,
//             y: 50,
//             duration: 1,
//             scrollTrigger: {
//                 trigger: mainThis,
//                 scroller: pageContainer, // Set your page container here
//                 start: "top 65%", // Adjust this value as per your requirement
//                 end: "bottom bottom", // Adjust this value as per your requirement
//                 //toggleActions: "play none none reverse",
//                 scrub: 1, 
//                 //markers: true,
//                 stagger: {
//                     each: 1, // Stagger animation for each .word div
//                     from: "center" // Start staggering from the center of the viewport
//                 }                
//             }
//         });
//     });
// });


const customCursor = new dpkCursor({ ease: 0.25 });

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


});