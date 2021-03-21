<?php
/**
 * Plugin Name: Latest posts
 */

// Register and load the widget
function weart_load_latestposts() { register_widget( 'weart_latestposts' ); }
add_action( 'widgets_init', 'weart_load_latestposts' );

// Creating the widget
class weart_latestposts extends WP_Widget {

  function __construct() {
    parent::__construct(
      /* Base   ID   */ 'weart_latestposts',
      /* Widget name */ esc_html__('Weart: Latest Posts', 'balaton')
    );
  }

  // DISPLAY
    public function widget( $args, $instance ) {

      global $post;
      $title = apply_filters('widget_title', $instance['title'] );
      $number = $instance['number'];

      // before and after widget arguments are defined by themes
      echo wpautop( $args['before_widget'] );
      // if widget has title
      if ( $title ) { echo wpautop( $args['before_title'] . $title . $args['after_title'] ); } ?>

      <?php $i = 1; $recent = new WP_Query(array( 'posts_per_page' => $number )); while($recent->have_posts()) : $recent->the_post(); if(has_post_thumbnail()): if($i===1){$brd='border-0 mt-0 pt-0';}else{$brd='border-top mt-3 pt-3 ';} ?>
        <div <?php post_class('row no-gutters align-items-center '.$brd) ?>>

            <div class="col-1 fa-lg pr-3 font-italic">
              <?php echo esc_attr($i); ?>
            </div>

            <div class="col-3">
              <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>"><div class="w-100 lazy bg-10" data-src="<?php the_post_thumbnail_url() ?>"></div></a>
            </div>

            <div class="col pl-3 ">
              <h3 class="h6 lh-1"><a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>"><?php the_title() ?></a></h3>
            </div>



        </div>
      <?php $i++; endif;  endwhile; wp_reset_postdata(); ?>


      <?php //end of the widget displaying
      echo wpautop( $args['after_widget'] );
    }

  // FORM
    public function form( $instance ) {
      //defaults
        $defaults = array( 'title' => esc_html__('Fresh','balaton'), 'number' => 5 );
        $instance = wp_parse_args( (array) $instance, $defaults ); ?>

      <p><!-- title -->
        <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e('Title:','balaton') ?></label>
        <input id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' )); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" style="width:90%;" />
      </p><!-- title -->

      <p><!-- posts num -->
        <label for="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"><?php esc_html_e('Number of posts to display:','balaton'); ?></label>
        <input id="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'number' ) ); ?>" value="<?php echo esc_attr( $instance['number'] ); ?>" size="5" />
      </p><!-- posts num -->
    <?php }

  // UPDATING DATAS
    public function update( $new_instance, $old_instance ) {
      $instance = array();
      $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
      $instance['number'] = ( ! empty( $new_instance['number'] ) ) ? strip_tags( $new_instance['number'] ) : '';
      return $instance;
    }

}


