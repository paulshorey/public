<?php

////////////////////////////////////////////////////////////
// first run setup
  if ( ! function_exists( 'weart_setup' ) ) :

    function weart_setup() {
      load_theme_textdomain( 'balaton', get_template_directory() . '/languages' );
      add_theme_support( 'automatic-feed-links' );
      add_theme_support( 'title-tag' );
      add_theme_support('editor_style');

      //register nav menus
      register_nav_menus( array(
        'social-menu' => esc_html__( 'Social Menu', 'balaton' ),
        'desktop-menu' => esc_html__( 'Desktop Menu', 'balaton' ),
        'mobile-menu' => esc_html__( 'Mobile Menu', 'balaton' ),
        'footer-menu' => esc_html__( 'Footer Menu', 'balaton' )
        ) );

      //custom featured image size
      add_theme_support( 'post-thumbnails' );
      add_image_size( 'weart-grid', 730, 99999 );
      add_image_size( 'weart-list', 350, 99999 );
      add_image_size( 'weart-wide', 1100, 99999 );

      //html5 support & background & logo
      add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
      add_theme_support( 'custom-background', apply_filters( 'weart_custom_background_args', array(
        'default-color' => '#f5f5f5',
        'default-image' => '',
      ) ) );
      add_theme_support( 'custom-logo', array(
        'flex-height'   => true,
        'flex-widht'    => true,
        'header-text'   => array( 'site-title', 'site-description' )
      ) );

    }

  endif;
  add_action( 'after_setup_theme', 'weart_setup' );


////////////////////////////////////////////////////////////
// Set the content width in pixels, based on the theme's design and stylesheet.
// @global int $content_width
  function weart_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'weart_content_width', 820 );
  }
  add_action( 'after_setup_theme', 'weart_content_width', 0 );


////////////////////////////////////////////////////////////
//excerpts
  function weart_excerpt_length( $length ) {
    return 20;
  }
  add_filter( 'excerpt_length', 'weart_excerpt_length', 999 );

  function weart_excerpt_more( $more ) {
    return '...';
  }
  add_filter( 'excerpt_more', 'weart_excerpt_more' );


////////////////////////////////////////////////////////////
//WooCommerce
  function weart_woocommerce_support() {
    add_theme_support( 'woocommerce' );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
  }
  add_action( 'after_setup_theme', 'weart_woocommerce_support' );


////////////////////////////////////////////////////////////
//EDITOR STYLE
  function weart_add_editor_styles() {
   add_editor_style( get_template_directory_uri() . '/assets/editor-style.css' );
  }
  add_action( 'init', 'weart_add_editor_styles' );


////////////////////////////////////////////////////////////
// Video embed responsive
  function weart_oembed_filter($html) {
      $return = '<div class="embed-responsive embed-responsive-16by9">'.$html.'</div>';
      return $return;
  }
  add_filter( 'embed_oembed_html', 'weart_oembed_filter', 10, 4 ) ;
  add_filter( 'video_embed_html', 'weart_oembed_filter' ); // Jetpack


////////////////////////////////////////////////////////////
// facebook opengraph and twitter card meta add
  function weart_doctype_opengraph($output) {
      return $output . '
      prefix="og: http://ogp.me/ns#"';
  }
  add_filter('language_attributes', 'weart_doctype_opengraph');

  function weart_social_meta() {
    global $post;
    if(is_single()) {
      if(has_post_thumbnail($post->ID)) {
        $img_src = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ), 'large');
      }else { $img_src = ''; }

      if($excerpt = $post->post_excerpt) {
        $excerpt = strip_tags($post->post_excerpt);
        $excerpt = str_replace("", "'", $excerpt);
      } else {
        $excerpt = get_bloginfo('description');
      } ?>
      <!-- facebook -->
      <meta property="og:type" content="article"/>
      <meta property="og:title" content="<?php the_title(); ?>"/>
      <meta property="og:description" content="<?php echo strip_tags(get_the_excerpt()); ?>"/>
      <meta property="og:url" content="<?php the_permalink(); ?>"/>
      <meta property="og:image" content="<?php if( !empty($img_src) ){ echo esc_url($img_src[0]); } ?>"/>
      <meta property="og:site_name" content="<?php bloginfo('name'); ?>"/>
      <!-- twitter -->
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="<?php the_title(); ?>" />
      <meta name="twitter:description" content="<?php echo strip_tags(get_the_excerpt()); ?>" />
      <meta name="twitter:url" content="<?php the_permalink(); ?>" />
      <meta name="twitter:image" content="<?php if( !empty($img_src) ){ echo esc_url($img_src[0]); } ?>" />
    <?php } else { return; }
  }
  add_action('wp_head', 'weart_social_meta', 5);

////////////////////////////////////////////////////////////
// Mega menu
  add_filter( 'walker_nav_menu_start_el', 'weart_desktop_menu', 10, 4 );

  function weart_desktop_menu( $item_output, $item, $depth, $args ) {
    global $wp_query;
      // The mega dropdown only applies to the main navigation.
      // Your theme location name may be different, "main" is just something I tend to use.
      if ( 'desktop-menu' !== $args->theme_location )
          return $item_output;

      // The mega dropdown needs to be added to one specific menu item.
      // I like to add a custom CSS class for that menu via the admin area.
      // You could also do an item ID check.
      if ( in_array( 'weart-megamenu', $item->classes ) ) {
        global $wp_query;
        global $post;
        $subposts = get_posts( 'numberposts=4&cat=' . $item->object_id );
        $item_output .= '<div class="weart-megamenu"><div class="w-100 bg-white shadow border-top"><div class="container"><div class="row">';
          foreach( $subposts as $post ) : setup_postdata( $post );if(has_post_thumbnail()){
          $item_output .= '<div class="col-3 l-black py-4"><a href="'. get_permalink( $post->ID ) .'">';
            $item_output .= '<div class="lazy bg-20" data-src="'.get_the_post_thumbnail_url( $post->ID, 'weart-grid-small' ).'"></div>';
            $item_output .= '<span class="d-block mt-2 h6">'.get_the_title( $post->ID ).'</span>';
          $item_output .= '</a></div>';
          } endforeach; wp_reset_postdata();
        $item_output .= '</div></div></div></div>';
      }
      return $item_output;
  }
