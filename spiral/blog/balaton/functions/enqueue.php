<?php

// google fonts import the right way
  if ( ! function_exists( 'weart_fonts_url' ) ) :
  function weart_fonts_url() {
      $fonts_url = '';
      $fonts     = array();
      $subsets   = '';
      if ( 'off' !== esc_html('on')){
          $fonts[] = get_theme_mod('title_font', 'Playfair Display:700');
      }
      if ( 'off' !== esc_html('on')){
          $fonts[] = get_theme_mod('title_font', 'Montserrat:600,800');
      }
      if ( 'off' !== esc_html('on')){
          $fonts[] = get_theme_mod('text_font', 'Lora:400,400i,700,700i');
      }
      if ( $fonts ) {
          $fonts_url = add_query_arg( array(
              'family' => urlencode( implode( '|', $fonts ) ),
              'subset' => urlencode( $subsets ),
          ), 'https://fonts.googleapis.com/css' );
      }
      return $fonts_url;
  } endif;
// end

// Enqueue scripts and styles.
  if ( ! function_exists( 'weart_scripts' ) ) :
  function weart_scripts() {

    /* STYLES */
      wp_enqueue_style( 'balaton-weart-fonts', weart_fonts_url(), array(), null );
      wp_enqueue_style( 'fontawesome-free', get_template_directory_uri() . '/assets/fontawesome/css/all.css', array(), null  );
      wp_enqueue_style( 'balaton-weart-css', get_template_directory_uri() . '/assets/weart.css', array(), null  );
      wp_enqueue_style( 'balaton-style', get_stylesheet_uri() );

    /*SCRIPTS*/

      // lazyload
        wp_register_script( 'jquery-lazy-min', get_template_directory_uri() . '/assets/js/jquery.lazy.min.js', array( 'jquery' ), null, true );
        wp_enqueue_script( 'jquery-lazy-min' );

      // infinite
        wp_register_script('jquery-infinitescroll-min', get_template_directory_uri() . '/assets/js/jquery.infinitescroll.min.js', array( 'jquery' ), null, true );
        wp_enqueue_script('jquery-infinitescroll-min');

      // sticky
        wp_register_script('jquery.sticky-kit.min', get_template_directory_uri() . '/assets/js/jquery.sticky-kit.min.js', array( 'jquery' ), null, true );
        wp_enqueue_script('jquery.sticky-kit.min');

      // bootstrap
        wp_register_script( 'bootstrap-min', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array( 'jquery' ), null, true );
        wp_enqueue_script( 'bootstrap-min' );

      // weart Main JS
        wp_register_script( 'balaton-weart', get_template_directory_uri() . '/assets/weart.js', array( 'jquery' ), null, true );
        wp_enqueue_script( 'balaton-weart' );

      /* COMMENT REPLY */
      if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }

  } endif;
  add_action( 'wp_enqueue_scripts', 'weart_scripts' );
// end