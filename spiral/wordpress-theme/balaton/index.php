<?php get_header();

  // fill up the Array for the layout details
    $p = array();
    for ($i=1; $i <= 5; $i++) {
      // default settings for the first run
      if($i===1){ $layoutDef='layout_5'; }
      else{ $layoutDef='off'; }

      $p[$i]=array(
        'cat' => get_theme_mod('home_cat'.$i),
        'tag' => get_theme_mod('home_tag'.$i),
        'offset' => get_theme_mod('home_offset'.$i),
        'title' => get_theme_mod('home_title'.$i),
        'layout' => get_theme_mod('home_layout'.$i,$layoutDef),
        'banner' => get_theme_mod('home_banner'.$i),
      );
    }
  // end

  // display blocks
    $pl=count($p);
    for ($i=1; $i <= $pl; $i++) {
      // basic variables
        $tag = $p[$i]['tag']; if ( !empty($tag) ) { $tag = get_term_by('name', $tag, 'post_tag'); $tag = $tag->slug;}
        $cat = $p[$i]['cat']; if ( !empty($cat) ) { $cat = get_cat_ID($cat); }
        $title = $p[$i]['title'];
        $offset = $p[$i]['offset'];
        $layout = $p[$i]['layout'];
        $banner = $p[$i]['banner'];
      // end

      // banner
        if(!empty($banner)){ ?>
          <div class="container w-ads px-0">
            <?php echo get_theme_mod('home_banner'.$i); ?>
          </div>
        <?php }

      // layout
        weart_section( array(
          'tag'=>$tag,
          'cat'=>$cat,
          'offset'=>$offset,
          'title'=>$title,
          'layout'=>$layout
        ));
      // end
    }
  // end

get_footer() ?>