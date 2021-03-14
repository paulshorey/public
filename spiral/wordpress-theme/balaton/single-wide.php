<?php
/*
 * Template Name: Wide
 * Template Post Type: post
 */
//theme header
get_header() ?>
<div class="section">
<article itemscope itemtype="http://schema.org/NewsArticle" class="article-container">
  <?php $i=0; if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <meta itemscope itemprop="mainEntityOfPage" content="<?php the_permalink(); ?>" itemType="https://schema.org/WebPage" itemid="<?php the_permalink(); ?>"/>

    <!-- featured img -->
      <div class="wide">
        <div class="row">
          <div class="col-12">
            <?php weart_featuredImg(array('post'=>$post,'size'=>'weart-wide')) ?>
          </div>
        </div>
      </div>
    <!-- end -->


    <!-- content-area -->
      <div class="container">

         <!-- header -->
          <?php $weart_sidebar = get_post_meta($post->ID, "weart_hide_sidebar", true);
          $weart_sidebar2 = get_theme_mod('article_sidebar',1);
          if ( is_active_sidebar( 'sidebar-main') && $weart_sidebar !== "hide" && $weart_sidebar2 ) { $sidebar=true; } ?>
          <div class="row <?php if(!$sidebar){ echo esc_html('justify-content-center'); } ?>">
            <div class="col-lg-10">
              <!-- article-header -->
                <header>
                  <h1 class="article-title h1 c-black my-4" itemprop="headline"><?php the_title() ?></h1>
                </header>
              <!-- end -->
            </div>
          </div>
        <!-- end -->

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <!-- excerpt -->
              <?php if( get_theme_mod('want_excerpt',0) ): ?>
                <div class="lead c-meta" itemprop="description"><?php the_excerpt() ?></div>
                <hr>
              <?php endif; ?>
            <!-- end -->
            <?php get_template_part('parts/content') ?>
          </div>
          <!-- sidebar -->
            <?php get_sidebar(); ?>
          <!-- end -->
        </div>
      </div>
    <!-- end -->

  <?php $i++; endwhile; endif; ?>
</article></div>
<?php get_footer() ?>