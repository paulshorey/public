<?php
$weart_sidebar = get_post_meta($post->ID, "weart_hide_sidebar", true);
$weart_sidebar2 = get_theme_mod('article_sidebar',1);
if ( is_active_sidebar( 'sidebar-main') && $weart_sidebar !== "hide" && $weart_sidebar2 ) { ?>
  <div class="sidebar col-lg-4 c-text l-text border-left">
    <div class="sidebar-inner <?php if(get_theme_mod('want_sticky','1')){ echo esc_html('sticky-kit'); } ?>" id="sidebar-inner">
      <?php dynamic_sidebar( 'sidebar-main' ); ?>
    </div>
  </div>
<?php } ?>