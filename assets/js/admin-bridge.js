/* ============================================================
   ADMIN BRIDGE v2 — shared by all vCard templates
   Reads localStorage written by admin.html and applies to page
   ============================================================ */
(function () {
    'use strict';
    var STORE_KEY = 'vcardAdminData';
    var ENQ_KEY   = 'vcardEnquiries';

    var defaults = {
        businessName:'Business Name', ownerName:'Owner Name',
        bizPosition:'Business Position', personType:'',
        profileImg:'assets/images/profile.png',
        phone:'+91 98765 43210', email:'demo@gmail.com', fax:'022-12345678',
        address:'Mumbai, Maharashtra 400001',
        mapsUrl:'https://maps.google.com', websiteUrl:'#', whatsappShareUrl:'#',
        aboutTitle:'About Us', aboutSubtitle:'Know More',
        aboutPara1:'We are a professional team dedicated to delivering excellent services. With years of experience, we bring quality, trust, and expertise to everything we do.',
        aboutPara2:'Our commitment to customer satisfaction sets us apart. Feel free to reach out — we are always ready to help you.',
        serviceTitle:'Services', serviceSubtitle:'What We Offer',
        galleryTitle:'Gallery', gallerySubtitle:'Our Work',
        videoTitle:'Videos', videoSubtitle:'Watch Us',
        paymentTitle:'Payment', paymentSubtitle:'We Accept',
        productsTitle:'Products', productsSubtitle:'Shop Now',
        socialFacebook:'#', socialInstagram:'#', socialYoutube:'#',
        socialTwitter:'#', socialLinkedin:'#', socialGoogleplus:'#',
        showAbout:true, showService:true, showGallery:true,
        showVideo:true, showPayment:true, showEnquiry:true,
        showProducts:false, showViewCounter:true, showParticles:true, showThemeToggle:true,
        viewCount:'1,000', accentColor:'', metaTitle:'', metaDesc:'',
        services:[
            {title:'Service 1',img:'assets/images/product.png'},
            {title:'Service 2',img:'assets/images/product.png'},
            {title:'Service 3',img:'assets/images/product.png'},
            {title:'Service 4',img:'assets/images/product.png'}
        ],
        gallery:[
            {img:'assets/images/gallery.png'},{img:'assets/images/gallery.png'},
            {img:'assets/images/gallery.png'},{img:'assets/images/gallery.png'},
            {img:'assets/images/gallery.png'},{img:'assets/images/gallery.png'}
        ],
        videos:[{id:'dQw4w9WgXcQ',title:'Welcome Video'}],
        payment:[
            {title:'Cash',img:'assets/images/payment.png'},
            {title:'UPI',img:'assets/images/payment.png'},
            {title:'Card',img:'assets/images/payment.png'}
        ],
        products:[], customSections:[]
    };

    var saved={};
    try{saved=JSON.parse(localStorage.getItem(STORE_KEY))||{};}catch(e){}
    var d=Object.assign({},defaults,saved);
    ['services','gallery','videos','payment','products','customSections'].forEach(function(k){
        if(saved[k]) d[k]=JSON.parse(JSON.stringify(saved[k]));
        else d[k]=JSON.parse(JSON.stringify(defaults[k]));
    });

    // ── HELPERS ──────────────────────────────────────────────
    function $id(id){return document.getElementById(id);}
    function setText(id,val){var el=$id(id);if(el&&val!=null)el.textContent=val;}
    function setHTML(id,val){var el=$id(id);if(el&&val!=null)el.innerHTML=val;}
    function setAttr(id,attr,val){var el=$id(id);if(el)el.setAttribute(attr,val);}
    function hide(id){var el=$id(id);if(el)el.style.display='none';}
    function show(id,dv){var el=$id(id);if(el)el.style.display=dv||'block';}
    function toggleSection(sid,vis,nid){if(!vis){hide(sid);if(nid)hide(nid);}}
    function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

    window._vcardData = d;
    window._vcardHelpers = {$id:$id,setText:setText,setHTML:setHTML,setAttr:setAttr,hide:hide,show:show,toggleSection:toggleSection,esc:esc,ENQ_KEY:ENQ_KEY,STORE_KEY:STORE_KEY};

    // ── PROFILE ───────────────────────────────────────────────
    setText('business-name',d.businessName);
    setText('owner-name-display',d.ownerName);
    var bp=$id('biz-position');if(bp)bp.textContent=' - '+d.bizPosition;
    setText('person-type-display',d.personType);
    setAttr('profile-img','src',d.profileImg);
    setAttr('btn-call','href','tel:'+d.phone.replace(/\s+/g,''));
    setAttr('btn-email','href','mailto:'+d.email);
    setAttr('btn-website','href',d.websiteUrl);
    setAttr('btn-direction','href',d.mapsUrl);
    var dp=$id('detail-phone');
    if(dp){dp.href='tel:'+d.phone.replace(/\s+/g,'');dp.innerHTML='<span><i class="fa fa-phone"></i></span> '+esc(d.phone);}
    var dem=$id('detail-email');
    if(dem){dem.href='mailto:'+d.email;dem.innerHTML='<span><i class="fa fa-envelope"></i></span> '+esc(d.email);}
    var dfax=$id('detail-fax');
    if(dfax){dfax.href='tel:'+d.fax.replace(/\s+/g,'');dfax.innerHTML='<span><i class="fa fa-fax"></i></span> '+esc(d.fax);}
    var daddr=$id('detail-address');
    if(daddr){daddr.href=d.mapsUrl;daddr.innerHTML='<span><i class="fa fa-map-marker-alt"></i></span> '+esc(d.address);}
    var wab=$id('share-on-whatsapp-button');if(wab)wab.setAttribute('data-fullurl',d.whatsappShareUrl);
    var sb=$id('share-button');if(sb){sb.setAttribute('data-fullurl',d.websiteUrl);sb.setAttribute('data-title',d.businessName);}
    if(d.showViewCounter===false){hide('total-view');}else{setText('view-count',d.viewCount);}

    // SOCIAL
    var smap={'social-facebook':d.socialFacebook,'social-instagram':d.socialInstagram,'social-youtube':d.socialYoutube,
        'social-twitter':d.socialTwitter,'social-linkedin':d.socialLinkedin,'social-googleplus':d.socialGoogleplus||'#'};
    Object.keys(smap).forEach(function(id){var el=$id(id);if(el)el.href=smap[id]||'#';});

    if(d.showParticles===false)hide('particles-js');
    if(d.showThemeToggle===false)hide('theme-changer-wrap');

    // ABOUT
    toggleSection('about',d.showAbout,'nav-about');
    setHTML('about-heading',esc(d.aboutTitle)+' <span>'+esc(d.aboutSubtitle)+'</span>');
    setText('about-para1',d.aboutPara1);
    setText('about-para2',d.aboutPara2);

    // SERVICES
    toggleSection('service',d.showService,'nav-service');
    setHTML('service-heading',esc(d.serviceTitle)+' <span>'+esc(d.serviceSubtitle)+'</span>');
    var sc=$id('services-container');
    if(sc&&d.services&&d.services.length){
        sc.innerHTML=d.services.map(function(item){
            var img=item.img||'assets/images/product.png';
            return '<div class="col-md-6 col-sm-6 col-lg-6 col-xs-12">'+
                '<div class="item"><div class="product" data-toggle="modal" data-target=".preview" onclick="$(\'#preview-photo\').attr(\'src\',\''+img.replace(/'/g,"\\'")+'\')">'+
                '<img src="'+img+'" class="img-thumbnail" alt="'+esc(item.title)+'" /></div>'+
                '<h5>'+esc(item.title)+'</h5></div></div>';
        }).join('');
    }

    // GALLERY
    toggleSection('gallery',d.showGallery,'nav-gallery');
    setHTML('gallery-heading',esc(d.galleryTitle)+' <span>'+esc(d.gallerySubtitle)+'</span>');
    var gc=$id('gallery-container');
    if(gc&&d.gallery&&d.gallery.length){
        gc.innerHTML=d.gallery.map(function(item){
            var img=item.img||'assets/images/gallery.png';
            return '<div class="col-md-4 col-sm-4 col-lg-4 col-6">'+
                '<div class="item" data-toggle="modal" data-target=".preview" onclick="$(\'#preview-photo\').attr(\'src\',\''+img.replace(/'/g,"\\'")+'\')">'+
                '<img src="'+img+'" class="img-thumbnail" alt="" /></div></div>';
        }).join('');
    }

    // VIDEOS
    toggleSection('video',d.showVideo,'nav-video');
    setHTML('video-heading',esc(d.videoTitle)+' <span>'+esc(d.videoSubtitle)+'</span>');
    var vc=$id('videos-container');
    if(vc&&d.videos&&d.videos.length){
        vc.innerHTML=d.videos.map(function(item){
            if(item.localSrc){
                return '<div class="col-md-12" style="margin-bottom:20px;"><p style="font-weight:600;margin-bottom:8px;">'+esc(item.title||'Video')+'</p>'+
                    '<video controls style="width:100%;border-radius:8px;background:#000;" src="'+item.localSrc+'">No support.</video></div>';
            }
            return '<div class="col-md-12"><iframe src="//www.youtube.com/embed/'+esc(item.id)+'" title="'+esc(item.title||'')+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
        }).join('');
    }

    // PAYMENT
    toggleSection('payment',d.showPayment,'nav-payment');
    setHTML('payment-heading',esc(d.paymentTitle)+' <span>'+esc(d.paymentSubtitle)+'</span>');
    var pc=$id('payment-container');
    if(pc&&d.payment&&d.payment.length){
        pc.innerHTML=d.payment.map(function(item){
            var img=item.img||'assets/images/payment.png';
            return '<div class="col-md-4 col-sm-4 col-lg-4 col-xs-12">'+
                '<div class="item" data-toggle="modal" data-target=".preview" onclick="$(\'#preview-photo\').attr(\'src\',\''+img.replace(/'/g,"\\'")+'\')">'+
                '<img src="'+img+'" class="img-thumbnail" alt="" /></div><h5>'+esc(item.title)+'</h5></div>';
        }).join('');
    }

    // PRODUCTS
    if(d.showProducts&&d.products&&d.products.length){
        show('products','block'); show('nav-products','block');
        setHTML('products-heading',esc(d.productsTitle)+' <span>'+esc(d.productsSubtitle)+'</span>');
        var prc=$id('products-container');
        if(prc){
            prc.innerHTML=d.products.map(function(item){
                var img=item.img||'';
                var imgH=img?'<img src="'+img+'" class="img-thumbnail" alt="'+esc(item.name)+'" style="width:100%;height:180px;object-fit:cover;" />':
                    '<div style="width:100%;height:180px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:48px;">🛒</div>';
                var buyB=item.link?'<a href="'+esc(item.link)+'" target="_blank" class="myBtn" style="display:inline-block;margin-top:10px;text-decoration:none;">'+esc(item.btn||'Buy Now')+' <i class="fas fa-shopping-cart"></i></a>':'';
                return '<div class="col-md-6 col-sm-6 col-lg-4 col-xs-12" style="margin-bottom:24px;">'+
                    '<div class="item" style="padding:0;overflow:hidden;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.08);">'+
                    '<div style="position:relative;">'+imgH+(item.price?'<span style="position:absolute;top:10px;right:10px;background:#ff6b35;color:#fff;border-radius:20px;padding:4px 12px;font-size:13px;font-weight:700;">'+esc(item.price)+'</span>':'')+
                    '</div><div style="padding:14px;"><h5 style="margin:0 0 6px;font-size:15px;font-weight:700;">'+esc(item.name)+'</h5>'+
                    (item.desc?'<p style="font-size:13px;color:#666;margin:0 0 10px;line-height:1.5;">'+esc(item.desc)+'</p>':'')+buyB+'</div></div></div>';
            }).join('');
        }
    } else { hide('products'); hide('nav-products'); }

    // CUSTOM SECTIONS
    var csa=$id('custom-sections-area');
    if(csa&&d.customSections&&d.customSections.length){
        csa.innerHTML=d.customSections.map(function(sec,i){
            var imgH=sec.img?'<div class="col-md-5 col-xs-12" style="margin-bottom:16px;"><img src="'+sec.img+'" class="img-thumbnail" alt="" style="width:100%;border-radius:8px;" /></div>':'';
            var btnH=(sec.btnLabel&&sec.btnLink)?'<a href="'+esc(sec.btnLink)+'" target="_blank" class="myBtn" style="display:inline-block;margin-top:14px;text-decoration:none;">'+esc(sec.btnLabel)+' <i class="fas fa-arrow-right"></i></a>':'';
            var cc=sec.img?'col-md-7 col-xs-12':'col-md-12';
            return '<section id="custom-sec-'+i+'" class="box about">'+
                '<h2 class="heading">'+esc(sec.title)+(sec.subtitle?' <span>'+esc(sec.subtitle)+'</span>':'')+' </h2>'+
                '<div class="divider mb-30"></div><div class="row">'+imgH+
                '<div class="'+cc+'"><p style="line-height:1.8;white-space:pre-wrap;">'+esc(sec.content||'')+'</p>'+btnH+'</div></div></section>';
        }).join('');
    }

    // ENQUIRY
    toggleSection('enquiry',d.showEnquiry,'nav-enquiry');
    var enqForm=$id('enquiry-form');
    if(enqForm){
        enqForm.addEventListener('submit',function(e){
            e.preventDefault();
            var list=[];
            try{list=JSON.parse(localStorage.getItem(ENQ_KEY))||[];}catch(err){}
            list.unshift({
                name:($id('enq-fname')?$id('enq-fname').value:''),
                email:($id('enq-email')?$id('enq-email').value:''),
                phone:($id('enq-phone')?$id('enq-phone').value:''),
                subject:($id('enq-subject')?$id('enq-subject').value:''),
                message:($id('enq-msg')?$id('enq-msg').value:''),
                date:new Date().toISOString().split('T')[0],status:'new'
            });
            localStorage.setItem(ENQ_KEY,JSON.stringify(list));
            enqForm.reset();
            var notice=document.createElement('div');
            notice.style.cssText='background:#d4edda;color:#155724;border:1px solid #c3e6cb;border-radius:6px;padding:12px 16px;margin-top:14px;font-size:14px;';
            notice.innerHTML='✅ Thank you! Your enquiry has been sent.';
            enqForm.parentNode.insertBefore(notice,enqForm.nextSibling);
            setTimeout(function(){if(notice.parentNode)notice.parentNode.removeChild(notice);},5000);
        });
    }

    // ACCENT COLOR
    if(d.accentColor){
        var styleEl=$id('admin-theme-style');
        if(styleEl)styleEl.innerHTML='a.myBtn,a.myBtn-1,.btn{background-color:'+d.accentColor+' !important;}';
    }

    // SEO
    if(d.metaTitle&&d.metaTitle.trim())document.title=d.metaTitle;
    var metaEl=$id('meta-description');
    if(metaEl&&d.metaDesc&&d.metaDesc.trim())metaEl.setAttribute('content',d.metaDesc);

})();
