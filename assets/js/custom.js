/*
[Custom theme javascript]

Project:  Elevate Modern Business vCard
URL: https://nishantthummar.tech/
Author: Nishant Thummar <nishantthummar005@gmail.com>
Version: 1.0 
Last update:  01/09/22   

[Table of contents]

1. WOW ANIMATION
2. THEME SWITCHER (DARK/LIGHT)
3. CURSOR EFFECT
4. PARTICLES EFFECT
5. SHARE ON WHATSAPP BUTTON
6. SHARE BUTTON
7. DIRECT WHATSAPP SHARE BUTTON
8. ACTIVE MENU
*/

// Use Strict Mode
$(function () {
    "use strict";

    /*  >> 1. WOW ANIMATION START */
    new WOW().init();
    /*  << WOW ANIMATION END */

    /* >> 2. THEME SWITCHER (DARK/LIGHT) START
    ================================================== */
    var co = 0;
    $('#theme-color').click(function () {
        if (co === 0) {
            $('.bg-theme-color').delay(500).attr('data-theme', 'dark');
            $('.box').delay(500).addClass('box-dark');
            co++;
        } else {
            $(".bg-theme-color").delay(500).attr('data-theme', 'light');
            $('.box').delay(500).removeClass('box-dark');
            co = 0;
        }
    });
    /* << THEME SWITCHER (DARK/LIGHT) END
    ================================================== */

    /* >> 3. CURSOR EFFECT START
    ================================================== */
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
    });
    document.addEventListener('click', () => {
        cursor.classList.add("expand");
        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 500);
    });
    /* << CURSOR EFFECT END
    ================================================== */

    /* >> 4. PARTICLES EFFECT START
   ================================================== */
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 800,
                "density": {
                    "enable": true,
                    "value_area": 789.1476416322727
                }
            },
            "color": {
                "value": "#000"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.48927153781200905,
                "random": false,
                "anim": {
                    "enable": true,
                    "speed": 0.2,
                    "opacity_min": 0,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 83.91608391608392,
                    "size": 1,
                    "duration": 3,
                    "opacity": 1,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    /* << PARTICLES EFFECT END
    ================================================== */

    /* >> 5. SHARE ON WHATSAPP START
   ================================================== */
    const shareOnWhatsappButton = document.getElementById('share-on-whatsapp-button');
    if (shareOnWhatsappButton) {
        shareOnWhatsappButton.addEventListener('click', function (event) {
            handleWhatsappShare(this, this.dataset.fullurl, event)
        })
    }
    // Handle share on whatsapp 
    function handleWhatsappShare(element, fullUrl, event) {
        const { value } = document.getElementById('whatsapp-input');
        element.href = `https://wa.me/${value}?text=${fullUrl}`;
    }
    /* << SHARE ON WHATSAPP END
    ================================================== */

    /* >> 6. SHARE BUTTON START
    ================================================== */
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
        shareButton.addEventListener('click', function (event) {
            openShareModal(event, this.dataset.title, this.dataset.fullurl);
        });
    }
    // Handle share button 
    function openShareModal(e, title, fullUrl) {
        if (navigator.share) {
            navigator.share({
                title,
                url: fullUrl,
            }).then(() => {
                console.log('Thanks for sharing!');
            })
                .catch(console.error);
        } else {
            shareModal.style.display = 'flex';
        }
    }
    /* << SHARE BUTTON END
    ================================================== */

    /* >> 7. DIRECT WHATSAPP SHARE BUTTON START
    ================================================== */
    const directWhatsappShareButton = document.getElementById('direct-whatsapp-share-button');
    if (directWhatsappShareButton) {
        directWhatsappShareButton.addEventListener('click', function () {
            handleDirectWhatsappShare(this, this.dataset.whatsappnumber, this.dataset.fullurl)
        })
    }
    // Handle Direct whatsapp share button
    function handleDirectWhatsappShare(e, whatsappNumberWithCountryCode, fullUrl) {
        if (window.mobileCheck()) {
            e.href = `whatsapp:\/\/send?text=${fullUrl}`;
        } else if (whatsappNumberWithCountryCode) {
            e.href = `https://wa.me/${whatsappNumberWithCountryCode}?text=${fullUrl}`;
        } else {
            e.href = `whatsapp:\/\/send?text=${fullUrl}`;
        }
    }
    /* << DIRECT WHATSAPP SHARE BUTTON END
    ================================================== */

    /* >> 8. ACTIVE MENU START
    ================================================== */
    $(document).ready(function () {
        $('.menu li').click(function () {
            $('li').removeClass("active");
            $(this).addClass("active");
        });
    });
    /* << ACTIVE MENU END
    ================================================== */

}()); 
