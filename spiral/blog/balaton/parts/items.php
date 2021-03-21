<?php

function weart_meta( $args = array() ){
  $comment = !isset($args['comment'])? 0 : $args['comment'];
  $center = !isset($args['center'])? 1 : $args['center'];
  $color = !isset($args['color'])? 'c-meta l-meta' : $args['color'];
  ?>
  <div class="<?php echo esc_attr($color) ?>">
    <p class="small font-italic">
      <?php if( get_theme_mod('want_meta_date',1) ): ?><span class="date"><?php the_time(get_option('date_format')); ?></span><?php endif; ?>
      <span class="author"><?php the_author_posts_link() ?></span>
      <?php if($comment): ?><span class="comment_num f-meta"><i class="far fa-comment mr-1"></i><?php comments_number('','1','%'); ?></span><?php endif; ?>
    </p>

    <div class="left d-none">
      <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
        <?php esc_html_e('Read more','balaton') ?><i class="fas fa-angle-right ml-1"></i>
      </a>
    </div>
    <div class="right d-none">
      <?php if( get_theme_mod('want_meta_date',1) ): ?><span class="date"><?php the_time(get_option('date_format')); ?></span><?php endif; ?>
      <span class="comment_num f-meta"><i class="far fa-comment mr-1"></i><?php comments_number('','1','%'); ?></span>
    </div>

  </div>
  <?php
}

function weart_meta_article( $args = array() ){
  ?>
  <!-- displayable meta -->
    <div class="d-block d-md-flex align-items-center justify-content-between mb-4 l-1 c-meta border-top py-3 mb-5">

      <div class="left small font-italic ">

        <div class="top d-flex">
        <?php if( get_theme_mod('want_meta_wirter',1) ): ?>
          <span class="author mr-1" itemprop="author" itemscope itemtype="https://schema.org/Person">
            <?php esc_html_e('By','balaton') ?>
            <span itemprop="name"><?php the_author_posts_link(); ?></span>
          </span>
        <?php endif; ?>

        <?php if( get_theme_mod('want_meta_date',1) ): ?>
          <span class="date mr-1">
            <time itemprop="datePublished" datetime="<?php the_time('Y-m-d'); ?>"><?php the_time(get_option('date_format')); ?></time>
            <meta itemprop="dateModified" content="<?php the_modified_date('Y-m-d'); ?>"/>
          </span>
        <?php endif; ?>

        </div>
        <div class="bottom">
          <span class="tags mr-1 d-inline-block">
            <?php the_tags() ?>
          </span>

          <span class="category mr-1  d-inline-block">
            <?php esc_html_e('in ', 'balaton'); the_category(', ') ?>
          </span>
        </div>
      </div>

      <div class="right mt-4 mt-md-0">
        <?php if (function_exists('weart_share')) { weart_share(); } ?>
      </div>
    </div>
  <!-- end -->

  <!-- seo publisher -->
    <div class="d-none" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
      <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
        <?php if( has_custom_logo() ) { ?>
          <?php $custom_logo_id = get_theme_mod( 'custom_logo' );
                $image = wp_get_attachment_image_src( $custom_logo_id , 'full' ); ?>
          <meta itemprop="url" content="<?php echo esc_url($image[0]);?>" >
        <?php } else { ?>
          <meta itemprop="url" content="<?php echo get_template_directory_uri(); ?>/images/logos/logo-nav.png">
        <?php } ?>
      </div>
      <meta itemprop="name" content="<?php bloginfo( 'name' ); ?>">
    </div>
  <!-- end -->
  <?php
}

// basic items for archive-loop
function weart_item($args=array()){
  $size = !isset($args['size'])? 'h5' : $args['size'];
  $exc = !isset($args['exc'])? 1 : $args['exc'];
  $img = !isset($args['img'])? 1 : $args['img'];
  $imgsize = !isset($args['imgsize'])? 'weart-grid' : $args['imgsize'];
  $imgh = !isset($args['imgh'])? 'bg-30' : $args['imgh'];
  $padding = !isset($args['padding'])? '' : $args['padding'];
  ?>
    <div class="article item">

      <?php if($img && has_post_thumbnail()){ ?>
        <div class="featured-img l-black">
          <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
            <div class="<?php echo esc_html($imgh); ?> lazy" data-src="<?php the_post_thumbnail_url($imgsize) ?>"></div>
          </a>
        </div>
      <?php } ?>

      <hr class="m-0">
      <div class="weart-cat-badge">
        <div class="bg-1 l-white c-white f-meta">
          <?php the_category(', ') ?>
        </div>
      </div>

      <div class="m-0">
        <div class="mt-4 mb-2 text-center">
          <h2 class="<?php echo esc_attr($size) ?> l-black lh-1 my-3 title">
            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
              <?php the_title() ?>
            </a>
          </h2>
        </div>
        <div class="text-center"><?php weart_meta() ?></div>
        <div class="text-justify">
          <?php if($exc): ?><div class="excerpt c-meta"><?php the_excerpt() ?></div><?php endif; ?>
        </div>
      </div>
    </div>
  <?php
}

// section-title
function weart_metaTitle($args=array()){
  $title = !isset($args['title'])? '' : $args['title'];
  $size = !isset($args['size'])? 'h6' : $args['size'];
  if(!empty($title)):
  ?>
    <div class="meta-title text-center f-title border-bottomm  pb-2 mb-3 border-bottom <?php echo esc_attr($size) ?>">
      <span class="c-1"><?php echo esc_attr($title); ?></span>
      <hr class="brd-black brd-bold my-1">
    </div>
  <?php
  endif;
}

function weart_featuredImg($args=array()){
  $size = !isset($args['size'])? 'weart-grid' : $args['size'];
  $post = $args['post'];
  ?>
    <!-- featured image -->
      <?php if(get_post_meta($post->ID, "weart_video_audio", true)){ ?>

        <div class="featured-img embed-responsive embed-responsive-16by9">
          <?php echo get_post_meta($post->ID, "weart_video_audio", true); ?>
        </div>

      <?php }else{
        if(has_post_thumbnail()){ ?>
          <div class="featured-img" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
            <?php
              $thumb_id = get_post_thumbnail_id();
              $w_thumb_array = wp_get_attachment_image_src($thumb_id, $size, true);
              $w_thumb_url = $w_thumb_array[0];
              $w_thumb_width = $w_thumb_array[1];
              $w_thumb_height = $w_thumb_array[2]; ?>
            <meta itemprop="url" content="<?php echo esc_url($w_thumb_url) ?>">
            <meta itemprop="width" content="<?php echo esc_html($w_thumb_width) ?>">
            <meta itemprop="height" content="<?php echo esc_html($w_thumb_height) ?>">
            <?php the_post_thumbnail(); ?>
          </div>
        <?php }
      } ?>
    <!-- end -->
  <?php
}

function weart_infinite($args=array()){
  $infinite = !isset($args['infinite'])? 1 : $args['infinite'];
  if($infinite){ ?>
    <div class="infinite-nav d-none"><?php next_posts_link(); ?></div>
    <div class="row my-5"><button class="infinite-more f-meta btn btn-outline-dark py-2">
      <?php esc_html_e('More Stories','balaton') ?>
    </button></div>
  <?php } else { ?>
    <div class="pager my-5 c-black l-black">
      <div class="col-lg-6 mr-auto text-left f-meta text-uppercase"><?php previous_posts_link(); ?></div>
      <div class="col-lg-6 ml-auto text-right f-meta text-uppercase"><?php next_posts_link(); ?></div>
    </div>
  <?php }
}

// archive-title
function weart_sectionTitle($args=array()){
  $title = !isset($args['title'])? '' : $args['title'];
  $size = !isset($args['size'])? 'h2' : $args['size'];
  if(!empty($title)):
  ?>
	<!-- <section class="section minus pb-5 border-bottom">
      <div class="archive-title pt-5 pb-3">
        <h1 class="a-title c-black f-title <?php echo esc_attr($size); ?>"><?php echo $title; ?></h1>
        <hr class="brd-1 brd-bold">
      </div>
    </section> -->
  <?php
  endif;
}

// minus upper whitebg
function weart_item2($args=array()){
  $size = !isset($args['size'])? 'h5' : $args['size'];
  $exc = !isset($args['exc'])? 1 : $args['exc'];
  $imgsize = !isset($args['imgsize'])? 'weart-grid' : $args['imgsize'];
  $imgh = !isset($args['imgh'])? 'bg-35' : $args['imgh'];
  ?>
    <div class="mb-4 item2 item3">
      <!-- img -->
        <div class="featured-img l-black">
          <?php if(has_post_thumbnail()){ ?>
            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
              <?php if(has_post_thumbnail()){ ?>
                <div class="<?php echo esc_html($imgh); ?> lazy" data-src="<?php the_post_thumbnail_url($imgsize) ?>"></div>
              <?php  } ?>
            </a>
          <?php } ?>
          <!-- cat -->
            <div class="weart-cat-badge">
              <div class="bg-1 l-white c-white f-meta">
                <?php the_category(', ') ?>
              </div>
            </div>
          <!-- end -->
        </div>
      <!-- end -->

      <!-- text -->
        <div class="text bg-white pt-4">

          <!-- head -->
            <h2 class="title l-black lh-1 text-center px-4 py-3 <?php echo esc_attr($size) ?>">
              <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
                <span class=""> <?php the_title() ?></span>
              </a>
            </h2>
          <!-- end -->

          <div class="text-center"><?php weart_meta() ?></div>

          <?php if($exc){ ?><div class="c-meta"><?php the_excerpt();?></div><?php } ?>

        </div>
      <!-- end -->
    </div>
  <?php
}

// iteminner
function weart_item3($args=array()){
  $size = !isset($args['size'])? 'h5' : $args['size'];
  $imgsize = !isset($args['imgsize'])? 'weart-grid' : $args['imgsize'];
  $imgh = !isset($args['imgh'])? 'bg-50' : $args['imgh'];
  $textwidth = !isset($args['textwidth'])? '' : $args['textwidth'];
  $exc = !isset($args['exc'])? 0 : $args['exc'];
  ?>
    <div class="article-inner bg <?php echo esc_attr($imgh); ?> lazy" data-src="<?php the_post_thumbnail_url($imgsize) ?>">
      <div class="text c-white px-4 <?php echo esc_attr($textwidth); ?>">
        <!-- cat -->
          <hr class="w-50 my-0">
          <div class="weart-cat-badge">
            <div class="bg-1 l-white c-white f-meta">
              <?php the_category(', ') ?>
            </div>
          </div>
        <!-- end -->
        <h2 class="my-3 title <?php echo esc_attr($size); ?>"><?php the_title(); ?></h2>
        <?php weart_meta(array('color'=>'c-white l-white')) ?>
        <?php if($exc){ ?>
          <div class="excerpt">
            <?php the_excerpt() ?>
          </div>
        <?php } ?>
      </div>
      <a href="<?php the_permalink() ?>" class="cover"></a>
    </div>
  <?php
}

// list
function weart_item4($args=array()){
  $size = !isset($args['size'])? 'h5' : $args['size'];
  $exc = !isset($args['exc'])? 1 : $args['exc'];
  $cat = !isset($args['cat'])? 1 : $args['cat'];
  $imgsize = !isset($args['imgsize'])? 'weart-grid' : $args['imgsize'];
  $imgh = !isset($args['imgh'])? 'bg-35' : $args['imgh'];
  $col = !isset($args['col'])? 'col-lg-4 pr-4' : $args['col'];
  $img = !isset($args['img'])? 1 : $args['img'];
  ?>
    <div class="row no-gutters list-item">

      <!-- img -->
        <?php if($img && has_post_thumbnail()){ ?>
          <div class="<?php echo esc_html($col); ?> featured-img l-black ">
            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
              <?php if(has_post_thumbnail()){ ?>
                <?php the_post_thumbnail($imgsize) ?>
              <?php  } ?>
            </a>
          </div>
        <?php  } ?>
      <!-- end -->

      <!-- text -->
        <div class="col <?php if(!has_post_thumbnail() || !$img){ echo esc_html('px-4'); } ?>">
          <!-- head -->
            <!-- cat -->
              <?php if($cat): ?>
                <div class="weart-cat-badge mt-4 mb-3 d-none d-md-flex">
                  <div class="bg-1 l-white c-white f-meta">
                    <?php the_category(', ') ?>
                  </div>
                </div>
              <?php endif; ?>
            <!-- end -->
            <h2 class="title l-black lh-1 mb-3 mt-4 mt-md-0 <?php echo esc_attr($size) ?>">
              <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
                <?php the_title() ?>
              </a>
            </h2>
            <?php weart_meta() ?>
          <!-- end -->
          <!-- exc -->
            <?php if($exc): ?>
              <div class="excerpt c-meta mb-3">
                <p class="m-0"><?php echo esc_html(get_the_excerpt()); ?></p>
              </div>
            <?php endif; ?>
          <!-- end -->
        </div>
      <!-- end -->

    </div>
  <?php
}
