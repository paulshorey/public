<?php
// sidebars
  add_action( 'widgets_init', 'weart_widgets_init' );
  function weart_widgets_init() {
    if ( function_exists('register_sidebar') ) {

      register_sidebar( array(
        'name' => esc_html__( 'Main Sidebar', 'balaton' ),
        'id' => 'sidebar-main',
        'description'   => esc_html__( 'Displays only in articles only.', 'balaton' ),
        'before_widget' => '<div id="%1$s" class="%2$s box mb-5">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="sidebar-title f-meta c-1"><span class="title">',
        'after_title'   => '</span></h3>',
      ) );

      register_sidebar( array(
        'name' => esc_html__( 'WooCommerce Sidebar', 'balaton' ),
        'id' => 'sidebar-woocommerce',
        'description'   => esc_html__( 'Displays only in Shop pages.', 'balaton' ),
        'before_widget' => '<div id="%1$s" class="%2$s box mb-5">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="sidebar-title f-meta c-1"><span class="title">',
        'after_title'   => '</span></h3>',
      ) );

      register_sidebar( array(
        'name' => esc_html__( 'Instagram', 'balaton' ),
        'id' => 'sidebar-insta',
        'description'   => esc_html__( 'Displays only in footer.', 'balaton' ),
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="d-none">',
        'after_title'   => '</h3>',
      ) );

    }
  }

// Widgets

    require get_template_directory().'/functions/widget-latest.php';