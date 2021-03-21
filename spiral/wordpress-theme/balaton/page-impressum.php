<?php
/*
 * Template Name: Impressum
 * Template Post Type: page
 */
get_header() ?>
<?php $i=0; if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<section class="section">
  <div class="container pt-5">

    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="article-title c-black"><?php the_title() ?></h1>
        <div class="article-content my-4 l-1">
          <?php the_content() ?>
        </div>
        <hr>
        <div class="my-4 l-1 row">
          <?php $weart_users = get_users('orderby=post_count&order=asc'); foreach($weart_users as $user) { $post_count = count_user_posts( $user->ID ); if($post_count < 1) continue; ?>
            <div class="col-lg-6">
            <div class="row align-items-center">
              <!-- users -->
                <div class="col-3">
                  <a href="<?php echo esc_html( get_author_posts_url( $user->ID ) ); ?>">
                    <img class="img rounded-circle" src="<?php echo esc_html( get_avatar_url( $user->user_email, array( 'size' => 480 )) ); ?>">
                  </a>
                </div>
                <div class="col">
                  <h4>
                    <a href="<?php echo esc_html( get_author_posts_url( $user->ID ) ); ?>">
                      <?php echo esc_html( $user->display_name ); ?>
                    </a>
                  </h4>
                  <p><?php the_author_meta('description'); ?></p>
                </div>
              <!-- end -->
            </div>
            </div>
          <?php } ?>
        </div>
      </div>

    </div>
  </div>
</section>
<?php $i++; endwhile; endif; ?>
<?php get_footer() ?>