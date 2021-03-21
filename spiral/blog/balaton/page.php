<?php get_header() ?>
<?php $i=0; if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<div class="section">
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="article-title c-black"><?php the_title() ?></h1>
        <div class="article-content my-4 l-1 clearfix">
          <div class="clearfix"><?php the_content() ?></div>
          <div class="link-pages c-meta l-black f-meta clearfix">
            <?php $defaults = array(
                'next_or_number'   => 'number',
                'pagelink'         => '<span class="bg-black c-2">%</span>',
              ); wp_link_pages( $defaults ); ?>
          </div>
        </div>
        <div id="weart-comments">
          <?php comments_template( '', true );  ?>
        </div>
      </div>
    </div>
  </div>
</div>
<?php $i++; endwhile; endif; ?>
<?php get_footer() ?>