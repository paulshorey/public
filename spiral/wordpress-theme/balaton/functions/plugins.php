<?php
require_once get_template_directory().'/functions/class-tgm-plugin-activation.php';
function weart_require_plugins() {

    $plugins = array(
      array(
        'name'               => 'Lazy Load for Comments',
        'slug'               => 'lazy-load-for-comments',
        'required'           => true, // required for the faster page-load
      ),
      array(
        'name'               => 'Easy Google Fonts',
        'slug'               => 'easy-google-fonts',
        'required'           => false, // not-required
      ),
      array(
        'name'               => 'One Click Demo Import',
        'slug'               => 'one-click-demo-import',
        'required'           => false, // not-required
      ),
      array(
        'name'               => 'Weart Share',
        'slug'               => 'weart-share',
        'source'             => get_stylesheet_directory() . '/plugins/weart-share.zip',
        'required'           => true, // not-required
      ),
    );
    $config = array(
      'id'           => 'weart-tgmpa', // your unique TGMPA ID
      'default_path' => '', // default absolute path
      'menu'         => 'weart-install-required-plugins', // menu slug
      'has_notices'  => true, // Show admin notices
      'dismissable'  => false, // the notices are NOT dismissable
      'is_automatic' => true, // automatically activate plugins after installation
    );

    tgmpa( $plugins, $config );

}
add_action( 'tgmpa_register', 'weart_require_plugins' );


function weart_import_files() {
  return array(
    array(
      'import_file_name'             => 'Demo Import',
      'categories'                   => array( 'Life', 'Travel' ),
      'local_import_file'            => get_template_directory() . '/demo/wordpress.xml',
      'local_import_widget_file'     => get_template_directory() . '/demo/widgets.wie',
      'local_import_customizer_file' => get_template_directory() . '/demo/customize.dat',
      'import_preview_image_url'     => get_template_directory() . '/screenshot.jpg',
      'preview_url'                  => 'http://theme.weartstudio.eu/balaton',
    )
  );
}
add_filter( 'pt-ocdi/import_files', 'weart_import_files' );

function weart_after_import_setup() {
  // Assign menus to their locations.
  $footer_menu = get_term_by( 'name', 'footer', 'nav_menu' );
  $main_menu = get_term_by( 'name', 'main', 'nav_menu' );
  $social_menu = get_term_by( 'name', 'social', 'nav_menu' );

  set_theme_mod( 'nav_menu_locations', array(
      'desktop-menu' => $main_menu->term_id,
      'mobile-menu' => $main_menu->term_id,
      'social-menu' => $social_menu->term_id,
      'footer-menu' => $footer_menu->term_id
    )
  );
}
add_action( 'pt-ocdi/after_import', 'weart_after_import_setup' );