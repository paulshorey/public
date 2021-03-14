(function($) {
"use strict";

  $(document).ready(function(){

    $('.lazy').Lazy();
    $("#sidebar-inner.sticky-kit").stick_in_parent({
      offset_top: 60,
    });
    weart_menu();
    weart_scrollDown();
    weart_expand_menu();
    weart_social();
    weart_comment_button_hack();
    weart_twitter_embed_hack();
    weart_infinite_click();
  });

  function weart_menu(){
    $('.search-indicator').on('click',function(){
      $('.search-box').toggle();
      $('.search-indicator i').toggleClass('fa-search fa-times')
    });
    // expand
      $('.bars').on('click',function(){
        $('#weart-mobile').toggle('fast');
      });
      $('#weart-mobile ul ul').on().each(function() {
        if($(this).children().length){
          $(this,'li:first').parent().append('<a class="expand right" href="#"><i class="fa fa-plus"></i><i class="fa fa-minus d-none"></i></a>');
        }
      });
      $('#weart-mobile ul li a.expand').on("click",function(e){
        e.preventDefault();
        if ($(this).hasClass("clicked")) {
          $(this).find('.fa-minus').toggleClass('d-none');
          $(this).find('.fa-plus').toggleClass('d-none');
          $(this).prev('ul').slideUp(300, function(){});
          $(this).parent('li').removeClass('active');
        } else {
          $(this).find('.fa-minus').toggleClass('d-none');
          $(this).find('.fa-plus').toggleClass('d-none');
          $(this).prev('ul').slideDown(300, function(){});
          $(this).parent('li').addClass('active');
        }
        $(this).toggleClass("clicked");
      });
      return false;
    // end
  }/* end of weart_menu() */

  function weart_scrollDown(){
    // vars
    var didScroll;
    // is scrolled?
    $(window).scroll( function(event){ didScroll = true; } );
    // small delay
    setInterval(function() {
      if (didScroll) {
        var st = $(this).scrollTop();
        if( st > 400){ $('#fly-over').show('fast'); }
        else{ $('#fly-over').hide('fast'); }
        didScroll = false;
      }
    }, 250);
  }/* end of weart_scrollDown() */

  function weart_expand_menu(){
    $('.sidebar .box ul ul').on().each(function() {
        if($(this).children().length){
            $(this,'li:first').parent().append('<a class="expand" href="#"><i class="fa fa-plus"></i></a>');
        }
    });
    $('.sidebar .box ul li a.expand').on("click",function(e){
      e.preventDefault();
      if ($(this).hasClass("clicked")) {
        $(this).find('i').toggleClass('fa-plus fa-minus');
        $(this).prev('ul').slideUp(300, function(){});
        $(this).parent('li').removeClass('active');
      } else {
        $(this).find('i').toggleClass('fa-plus fa-minus');
        $(this).prev('ul').slideDown(300, function(){});
        $(this).parent('li').addClass('active');
      }
      $(this).toggleClass("clicked");
    });
    return false;
  }/*end of weart_expand_menu()*/

  function weart_social(){
    var vmi = '';
    $(".w-social li a").on().each(function(){
      vmi = $(this).text();
      if(  vmi === "500px" || vmi === "adn" || vmi === "amazon" || vmi === "android" || vmi === "angellist" || vmi === "apple" || vmi === "bandcamp" || vmi === "behance" || vmi === "bitbucket" || vmi === "btc" || vmi === "black-tie" || vmi === "bluetooth" || vmi === "buysellads" || vmi === "cc-amex" || vmi === "cc-diners-club" || vmi === "cc-discover" || vmi === "cc-jcb" || vmi === "cc-mastercard" || vmi === "cc-paypal" || vmi === "cc-stripe" || vmi === "cc-visa" || vmi === "chrome" || vmi === "codepen" || vmi === "codiepie" || vmi === "connectdevelop" || vmi === "contao" || vmi === "css3" || vmi === "dashcube" || vmi === "delicious" || vmi === "deviantart" || vmi === "digg" || vmi === "dribbble" || vmi === "dropbox" || vmi === "drupal" || vmi === "edge" || vmi === "eercast" || vmi === "empire" || vmi === "envira" || vmi === "etsy" || vmi === "expeditedssl" || vmi === "font-awesome" || vmi === "facebook" || vmi === "firefox" || vmi === "first-order" || vmi === "flickr" || vmi === "font-awesome" || vmi === "fonticons" || vmi === "fort-awesome" || vmi === "forumbee" || vmi === "foursquare" || vmi === "free-code-camp" || vmi === "get-pocket" || vmi === "gg" || vmi === "git" || vmi === "github" || vmi === "gitlab" || vmi === "glide" || vmi === "google" || vmi === "google-plus" || vmi === "google-wallet" || vmi === "gratipay" || vmi === "grav" || vmi === "hacker-news" || vmi === "houzz" || vmi === "html5" || vmi === "imdb" || vmi === "instagram" || vmi === "internet-explorer" || vmi === "ioxhost" || vmi === "joomla" || vmi === "jsfiddle" || vmi === "lastfm" || vmi === "leanpub" || vmi === "linkedin" || vmi === "linode" || vmi === "linux" || vmi === "maxcdn" || vmi === "meanpath" || vmi === "medium" || vmi === "meetup" || vmi === "mixcloud" || vmi === "modx" || vmi === "odnoklassniki" || vmi === "opencart" || vmi === "openid" || vmi === "opera" || vmi === "optin-monster" || vmi === "pagelines" || vmi === "paypal" || vmi === "pied-piper" || vmi === "pinterest" || vmi === "product-hunt" || vmi === "qq" || vmi === "quora" || vmi === "ravelry" || vmi === "rebel" || vmi === "reddit" || vmi === "renren" || vmi === "rebel" || vmi === "safari" || vmi === "scribd" || vmi === "sellsy" || vmi === "shirtsinbulk" || vmi === "simplybuilt" || vmi === "skyatlas" || vmi === "skype" || vmi === "slack" || vmi === "slideshare" || vmi === "snapchat" || vmi === "soundcloud" || vmi === "spotify" || vmi === "stack-exchange" || vmi === "stack-overflow" || vmi === "steam" || vmi === "steam-square" || vmi === "stumbleupon" || vmi === "superpowers" || vmi === "telegram" || vmi === "tencent-weibo" || vmi === "themeisle" || vmi === "trello" || vmi === "tripadvisor " || vmi === "tumblr" || vmi === "twitch" || vmi === "twitter" || vmi === "usb" || vmi === "viacoin" || vmi === "viadeo" || vmi === "vimeo" || vmi === "vine" || vmi === "vk" || vmi === "wechat " || vmi === "weibo" || vmi === "whatsapp" || vmi === "wikipedia-w" || vmi === "windows" || vmi === "wordpress" || vmi === "wpbeginner" || vmi === "wpexplorer" || vmi === "wpforms" || vmi === "xing" || vmi === "yahoo" || vmi === "yelp" || vmi === "yoast" || vmi === "youtube" ){
        $(this).empty();
        $(this).prepend('<i class="fab fa-'+vmi+'"></i>');
      }else{
        $(this).parent().remove();
      }
    });
    $(".w-social").toggleClass('d-none d-md-flex');
    return false;
  }// END OF weart_social()

  function weart_twitter_embed_hack(){
    $(".article-content .twitter-tweet").parent().removeClass("embed-responsive-16by9");
    $(".article-content #fb-root").parent().removeClass("embed-responsive-16by9 embed-responsive").addClass("mw-100 pb-3");
    $(".article-content .instagram-media").parent().removeClass("embed-responsive-16by9 embed-responsive");
  }/*end of weart_twitter_embed_hack()*/

  function weart_comment_button_hack(){
    $('button#llc_comments_button').addClass('text-uppercase px-3 py-2 rounded-0 w-50 f-meta btn btn-outline-dark');
  }/*end of weart_comment_button_hack()*/

  function weart_infinite_click(){
    var container = $('.grid');

    container.infinitescroll(
      // infinitescroll
        {
          navSelector: ".infinite-nav",
          nextSelector: ".infinite-nav a:first",
          itemSelector: ".grid-item",
          errorCallback: function(){ $(".infinite-more").css("display", "none");  },
          loading: {
            msgText: '',
            finishedMsg: '',
          },
        },
      // end

      function( newElements ) {
        $('.lazy').Lazy();
      },

    );

    $(window).unbind(".infscr");
    $(".infinite-more").on('click',function(){
      container.infinitescroll("retrieve")
      return false;
    });

    $(window).load(function(){
      if ($(".infinite-nav a").length) {
        $(".infinite-more").css("display","inline-block");
      } else {
        $(".infinite-more").css("display","none");
      }
    });

  }/* weart_infinite_click() */

})( jQuery );