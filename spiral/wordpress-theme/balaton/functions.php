<?php
//basics
require get_template_directory().'/functions/basics.php';

//enqueue
require get_template_directory().'/functions/enqueue.php';

//metadata
require get_template_directory().'/functions/metadata.php';

//global functions
require get_template_directory().'/parts/items.php';
require get_template_directory().'/parts/sections.php';

// sidebar
require_once get_template_directory().'/functions/sidebar.php';

// TGMPA
require_once get_template_directory().'/functions/plugins.php';

// CUSTOMIZER
  if ( ! function_exists( 'weart_customizer' ) ) :
  function weart_customizer( $wp_customize ) {

    //Home Settings
      require_once( get_parent_theme_file_path( '/functions/custom-basic.php') );

    // Colors
      require_once( get_parent_theme_file_path( '/functions/custom-colors.php') );

    //Sanitize, Validation
    require_once( get_parent_theme_file_path( '/functions/custom-sanitize.php') );

  } endif;
  add_action( 'customize_register', 'weart_customizer' );
  require get_template_directory().'/functions/custom-css.php';