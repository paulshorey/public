<?php
/*
 * Template Name: Video
 * Template Post Type: post
 */
//theme header
get_header() ?>
<div class="section">
<article itemscope itemtype="http://schema.org/NewsArticle" class="mt-4">
  <?php $i=0; if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <meta itemscope itemprop="mainEntityOfPage" content="<?php the_permalink(); ?>" itemType="https://schema.org/WebPage" itemid="<?php the_permalink(); ?>"/>

    <!-- content-header -->
      <div class="row no-gutters">

        <!-- featured img -->
          <div class="col-lg-8">
            <?php weart_featuredImg(array('post'=>$post)) ?>
          </div>
        <!-- end -->

        <!-- cat & title -->
          <div class="col-lg-4 list-item">
            <div class="bg-black c-white l-white h-100 w-100 p-4 ">
              <!-- cat -->
                <div class="weart-cat-badge mt-4 mb-3">
                  <div class="bg-1 l-white c-white f-meta">
                    <?php the_category(', ') ?>
                  </div>
                </div>
              <!-- end -->
              <h1 class="h2 mb-3" itemprop="headline"><?php the_title() ?></h1>
              <div class="c-white"><?php weart_meta( array('color'=>'l-white c-white') ) ?></div>
              <?php if( get_theme_mod('want_excerpt',0) ): ?>
                <div class="lead c-meta" itemprop="description"><?php the_excerpt() ?></div>
              <?php endif; ?>
            </div>
          </div>
        <!-- end -->

      </div>
    <!-- end -->

    <!-- content-area -->
      <div class="container">
        <div class="row mt-5 justify-content-center">
          <div class="col-lg-8">
            <?php get_template_part('parts/content') ?>
          </div>
          <!-- sidebar -->
            <?php get_sidebar() ?>
          <!-- end -->
        </div>
      </div>
    <!-- end -->

  <?php $i++; endwhile; endif; ?>
</article></div>
<?php get_footer() ?>