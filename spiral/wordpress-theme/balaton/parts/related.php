<?php // RELATED POSTS

global $post;
$categories = get_the_category($post->ID);

if($categories) {
  $category_ids = array();
  foreach($categories as $individual_category) $category_ids[] = $individual_category->term_id;

  $what_related = get_theme_mod('what_related','rand');
  if($what_related==='rand'){
    $args=array(
      'category__in' => $category_ids,
      'post__not_in' => array($post->ID),
      'posts_per_page'=> 15, // Number of related posts that will be shown.
      'ignore_sticky_posts'=>1,
      'orderby'=>'rand',
      'meta_key'     => '_thumbnail_id',
    );
  }elseif($what_related==='date'){
    $args=array(
      'category__in' => $category_ids,
      'post__not_in' => array($post->ID),
      'posts_per_page'=> 15, // Number of related posts that will be shown.
      'ignore_sticky_posts'=>1,
      'orderby'=>'date',
      'order'=> 'DESC',
      'meta_key'     => '_thumbnail_id',
    );
  }elseif($what_related==='latest'){
    $args=array(
      'post__not_in' => array($post->ID),
      'posts_per_page'=> 15, // Number of related posts that will be shown.
      'ignore_sticky_posts'=>1,
      'orderby'=>'date',
      'order'=> 'DESC',
      'meta_key'     => '_thumbnail_id',
    );
  }

  $related_posts = get_posts( $args );
  if($related_posts) { $i=1; foreach ( $related_posts as $post ) : setup_postdata( $post );
    $brd='border-0'; if($i!==1){ $brd = 'border-top'; }
    ?>

    <div <?php post_class('mb-4 '.$brd) ?>>
      <?php weart_item4( array('imgh'=>'bg-30','col'=>'col-md-6 pr-md-4') ) ?>
    </div>

<?php $i++; endforeach; } } wp_reset_postdata();?>