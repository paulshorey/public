<?php

// gutenberg
  // guten-support
    add_action( 'after_setup_theme', 'weart_setup_theme_supported_features' );
    function weart_setup_theme_supported_features() {
      // Theme supports wide images, galleries and videos.
      // add_theme_support( 'align-wide' );
      // Make specific theme colors available in the editor.
      add_theme_support( 'editor-color-palette',
        array( 'name' => 'main red', 'color' => '#FF4849', ),
        array( 'name' => 'secondary blue', 'color' => '#3D3F53', ),
        array( 'name' => 'dark gray', 'color' => '#444', )
    );}
  // end

  // editor styles
    add_action( 'enqueue_block_editor_assets', 'weart_editor_styles' );
    function weart_editor_styles() {
      wp_enqueue_style( 'weart-editor-style', get_template_directory_uri() . '/assets/editor.css' );
      wp_enqueue_style( 'weart_fonts_url', weart_fonts_url(), array(), null );
    }
  // end
// end