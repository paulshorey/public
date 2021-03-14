<?php
function weart_color_changer() {
    wp_enqueue_style( 'main-style', get_stylesheet_uri() );

    /*BEGIN THE COLORS */

      // done- MAIN COLOR
        $main_color = get_theme_mod( 'main_color', '#bf9d7a' ); //E.g. #acc7dc, eeebdc, e2d4d4
        if( !empty($main_color) ){
          $main = "
          ::selection { background: $main_color  !important }
          .article-inner:before{ background: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, $main_color 100%) }
          .c-1, .l-1 a, .lh-1 a:hover, #weart_balaton_theme a:hover, .btn-outline-dark, .woocommerce .sidebar .button, .woocommerce-page .sidebar .button,.carousel-indicators li.active .title,
          .sidebar .box .sidebar-title *,
          .main .carousel-indicators li.active .title { color: $main_color !important }

          .woocommerce ul.products li.product span.onsale, .woocommerce-page ul.products li.product span.onsale,
          .woocommerce div.product span.onsale, .woocommerce-page div.product span.onsale,
          .woocommerce div.product form.cart button.button, .woocommerce-page div.product form.cart button.button,
          .woocommerce .sidebar .widget_price_filter .price_slider_wrapper .ui-slider-range, .woocommerce-page .sidebar .widget_price_filter .price_slider_wrapper .ui-slider-range,
          .woocommerce .wc-proceed-to-checkout a.checkout-button,
          .woocommerce .wc-proceed-to-checkout a.checkout-button:hover, .woocommerce-page .wc-proceed-to-checkout a.checkout-button,
          .woocommerce-page .wc-proceed-to-checkout a.checkout-button:hover,
          .woocommerce .place-order .button.alt,
          .woocommerce .place-order .button.alt:hover, .woocommerce .wc-proceed-to-checkout .button.alt,
          .woocommerce .wc-proceed-to-checkout .button.alt:hover, .woocommerce-page .place-order .button.alt,
          .woocommerce-page .place-order .button.alt:hover, .woocommerce-page .wc-proceed-to-checkout .button.alt,
          .woocommerce-page .wc-proceed-to-checkout .button.alt:hover ,
          .bg-1 { background-color: $main_color !important }

          .brd-1, .woocommerce .woocommerce-info, .woocommerce .woocommerce-notice, .woocommerce-page .woocommerce-info, .woocommerce-page .woocommerce-notice{ border-color: $main_color !important }
                    ";
          wp_add_inline_style( 'main-style', $main );
        };

      // done- META
        $meta_color = get_theme_mod( 'meta_color', '#999999' ); //E.g. #FF0000
        if( !empty($meta_color) ){
          $meta = "
          .sidebar #weart-newsletter .w-input input,
          #weart-comments .comment-list .comment .comment-meta .says,
          #weart-comments .comment-list .comment .comment-meta .comment-metadata a, #weart-comments .comment-list .comment .comment-meta .comment-metadata,
          #weart-comments .comment-list .pingback .comment-meta .comment-metadata a, #weart-comments .comment-list .pingback .comment-meta .comment-metadata,
          .article-content #review p,
          .sidebar .widget_nav_menu, .sidebar .widget_categories,.sidebar .widget_archive,.sidebar .widget_pages,.sidebar .widget_meta,
          .c-meta, .sidebar .widget_rss .rss-date, .l-meta a{ color: $meta_color !important; }
                    ";
          wp_add_inline_style( 'main-style', $meta );
        };

      // done- BLACK COLOR
        $black_color = get_theme_mod( 'black_color', '#080808' ); //E.g. #FF0000
        if( !empty($black_color) ){
          $black = "
          .woocommerce .woocommerce-pagination .page-numbers li .current, .woocommerce-page .woocommerce-pagination .page-numbers li .current,
          .woocommerce ul.products li.product .price, .woocommerce-page ul.products li.product .price,
          .woocommerce div.product p.price, .woocommerce-page div.product p.price,
          .c-black, .l-black a{ color: $black_color !important; }

          .bg-black, .article-content .post-password-form input[type=submit], .bgh-black:hover,
          .woocommerce .sidebar .widget_price_filter .price_slider_wrapper .ui-slider-handle, .woocommerce-page .sidebar .widget_price_filter .price_slider_wrapper .ui-slider-handle,
          .carousel-indicators li.active,
          .bg:after { background-color: $black_color !important; }

          .brd-black,
          .sidebar-title{border-color: $black_color !important;}

          .main .carousel-indicators li.active:after{ border-color: transparent transparent $black_color transparent; }
                    ";
          wp_add_inline_style( 'main-style', $black );
        };

      // done- WHITE-COLOR
        $white_color = get_theme_mod( 'white_color', '#FFFFFF' ); //E.g. #FF0000
        if( !empty($white_color) ){
          $white = "
          ::selection { color: #ffffff; }

          .article-content figure .img-caption, .article-content img .img-caption,
          .woocommerce .place-order .button.alt,
          .woocommerce .place-order .button.alt:hover, .woocommerce .wc-proceed-to-checkout .button.alt,
          .woocommerce .wc-proceed-to-checkout .button.alt:hover, .woocommerce-page .place-order .button.alt,
          .woocommerce-page .place-order .button.alt:hover, .woocommerce-page .wc-proceed-to-checkout .button.alt,
          .woocommerce-page .wc-proceed-to-checkout .button.alt:hover,
          .c-white, .article-content .post-password-form input[type=submit], .l-white a, .lh-white a:hover { color: $white_color !important; }

          .video .carousel-indicators li.active,
          .bg-white { background-color: $white_color !important; }

          .video .carousel-indicators li.active:after { border-color: transparent $white_color transparent transparent; }
                    ";
          wp_add_inline_style( 'main-style', $white );
        };
      // done- TEXT
        $text_color = get_theme_mod( 'text_color', '#222222' ); //E.g. #FF0000
        if( !empty($text_color) ){
          $text = "
          .c-text, .l-text a, .btn-outline-dark:hover, .woocommerce .sidebar .button:hover, .woocommerce-page .sidebar .button:hover{ color: $text_color !important; }

                    ";
          wp_add_inline_style( 'main-style', $text );
        };

      // done- META2
        $text_color = get_theme_mod( 'meta2_color', '#f5f5f5' ); //E.g. #FF0000
        if( !empty($meta2_color) ){
          $meta2 = "
          .bg-2, #w-menu .w-menu ul li:hover ul, #w-menu2 .w-menu ul li:hover ul, .btn-outline-dark:hover, .woocommerce .sidebar .button:hover, .woocommerce-page .sidebar .button:hover,
          .bg-2:hover, #w-menu .w-menu ul li:hover ul:hover, #w-menu2 .w-menu ul li:hover ul:hover,
          .woocommerce .sidebar .widget_price_filter .price_slider_wrapper .ui-widget-content, .woocommerce-page .sidebar .widget_price_filter .price_slider_wrapper .ui-widget-content { background-color: $meta2_color !important; }

                    ";
          wp_add_inline_style( 'main-style', $meta2 );
        };

    /* END */
} add_action( 'wp_enqueue_scripts', 'weart_color_changer' );