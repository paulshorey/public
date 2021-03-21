

<!-- content -->
  <div class="article-content content l-1">
    <div class="clearfix"><?php the_content() ?></div>
    <div class="link-pages c-meta l-black f-meta clearfix">
      <?php $defaults = array(
        'next_or_number'   => 'number',
        'pagelink'         => '<span class="bg-black">%</span>',
      ); wp_link_pages( $defaults ); ?>
    </div>
  </div>
<!-- end -->

<!-- share -->
  <?php weart_meta_article() ?>
<!-- end -->

<!-- banner -->
  <?php if(!empty(get_theme_mod('article_banner'))){ ?>
    <div class="my-5 w-ads">
      <?php echo get_theme_mod('article_banner');?>
    </div>
  <?php } ?>
<!-- end -->

<!-- related -->
  <?php if(!is_page() && get_theme_mod('what_related','rand') !== 'none'): ?>
    <?php weart_metaTitle( array('title'=>'Related Posts')) ?>
    <?php get_template_part( 'parts/related' ); ?>
  <?php endif; ?>
<!-- end -->

<!-- comment -->
  <div id="weart-comments" class="my-5">
    <?php comments_template( '', true );  ?>
  </div>
<!-- end -->