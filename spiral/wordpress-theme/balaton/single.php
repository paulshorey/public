<?php

// individual single element
$post_layout = get_theme_mod('post_layout');

// all post layout
$article_layout = get_theme_mod('article_layout');

// Which post layout will be displayed?
if ( $post_layout == "wide" ) { get_template_part('single', 'wide'); }
elseif ( $post_layout == "video" ){ get_template_part('single', 'video'); }
elseif ( $post_layout == "wallpaper" ){ get_template_part('single', 'wallpaper'); }
elseif ( $post_layout == "narrow" ){ get_template_part('single', 'narrow'); }
else {
  if( $article_layout  == "wide"  ){ get_template_part('single', 'wide'); }
  elseif( $article_layout == "video"  ){ get_template_part('single', 'video'); }
  elseif( $article_layout == "wallpaper"  ){ get_template_part('single', 'wallpaper'); }
  elseif( $article_layout == "narrow"  ){ get_template_part('single', 'narrow'); }
  else{ get_template_part('single', 'narrow'); }
}//else
