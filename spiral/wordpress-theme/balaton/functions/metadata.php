<?php


/* ADD CUSTOM META BOXES */

/* Fire our meta box setup function on the post editor screen. */
add_action( 'load-post.php', 'weart_post_meta_boxes_setup' );
add_action( 'load-post-new.php', 'weart_post_meta_boxes_setup' );

/* SETUP / Meta box setup function. */
if ( !function_exists( 'weart_post_meta_boxes_setup' ) ) {
function weart_post_meta_boxes_setup() {

  add_action( 'add_meta_boxes', 'weart_add_post_meta_boxes' );

  /* Save post meta on the 'save_post' hook. */
  add_action( 'save_post', 'weart_save_video_audio_meta', 10, 2 );
  add_action( 'save_post', 'weart_save_hide_sidebar_meta', 10, 2 );
} }

/* ADD / Create one or more meta boxes to be displayed on the post editor screen. */
if ( !function_exists( 'weart_add_post_meta_boxes' ) ) {
function weart_add_post_meta_boxes() {

    add_meta_box(
      'weart-video-audio',                // Unique ID
      esc_html__( 'Video, Audio embed', 'balaton' ),    // Title
      'weart_video_audio_meta_box',               // Callback function
      'post',                                   // Admin page (or post type)
      'normal',                                 // normal, side
      'default'                                 // Priority
    );

    add_meta_box(
      'weart-hide-sidebar',               // Unique ID
      esc_html__( 'Hide sidebar in this post?', 'balaton' ),    // Title
      'weart_hide_sidebar_meta_box',              // Callback function
      'post',                                   // Admin page (or post type)
      'side',                                 // normal, side
      'default'                                 // Priority
    );
} }

/* VIDEO/AUDIO */
  /* Display the post meta box. */
    if ( !function_exists( 'weart_video_audio_meta_box' ) ) {
    function weart_video_audio_meta_box( $post ) { ?>
      <?php wp_nonce_field( 'weart_save_video_audio_meta', 'weart_video_audio_nonce' ); ?>
      <p>
        <label for="weart-video-audio"><?php esc_html_e( "Add a featured video/audio to the post instead of featured image. Paste a video/audio embed code:", 'balaton' ); ?></label><br />
        <input class="widefat" type="text" name="weart-video-audio" id="weart-video-audio" value="<?php echo esc_attr( get_post_meta( $post->ID, 'weart_video_audio', true ) ); ?>" size="30" />
      </p>
    <?php } }
  /* Save the meta box's post metadata. */
    if ( !function_exists( 'weart_save_video_audio_meta' ) ) {
    function weart_save_video_audio_meta( $post_id, $post ) {

      /* Verify the nonce before proceeding. */
      if ( !isset( $_POST['weart_video_audio_nonce'] ) || !wp_verify_nonce( $_POST['weart_video_audio_nonce'], 'weart_save_video_audio_meta' ) )
        return $post_id;

      /* Get the post type object. */
      $post_type = get_post_type_object( $post->post_type );

      /* Check if the current user has permission to edit the post. */
      if ( !current_user_can( $post_type->cap->edit_post, $post_id ) )
        return $post_id;

      /* Get the posted data and sanitize it for use as an HTML class. */
      $new_meta_value = ( isset( $_POST['weart-video-audio'] ) ? weart_sanitize_balance( $_POST['weart-video-audio'] ) : '' );

      /* Get the meta key. */
      $meta_key = 'weart_video_audio';

      /* Get the meta value of the custom field key. */
      $meta_value = get_post_meta( $post_id, $meta_key, true );

      /* If a new meta value was added and there was no previous value, add it. */
      if ( $new_meta_value && '' == $meta_value )
        add_post_meta( $post_id, $meta_key, $new_meta_value, true );

      /* If the new meta value does not match the old value, update it. */
      elseif ( $new_meta_value && $new_meta_value != $meta_value )
        update_post_meta( $post_id, $meta_key, $new_meta_value );

      /* If there is no new meta value but an old value exists, delete it. */
      elseif ( '' == $new_meta_value && $meta_value )
        delete_post_meta( $post_id, $meta_key, $meta_value );
    } }


/* HIDE SIDEBAR */
  /* Display the post meta box. */
    if ( !function_exists( 'weart_hide_sidebar_meta_box' ) ) {
    function weart_hide_sidebar_meta_box( $post ) { ?>

      <?php wp_nonce_field( 'weart_save_hide_sidebar_meta', 'weart_hide_sidebar_nonce' );?>
      <?php $selected = get_post_meta($post->ID, 'weart_hide_sidebar', true); ?>

      <p>
        <select class="widefat" name="weart-hide-sidebar" id="weart-hide-sidebar">
          <option value="show" <?php selected( $selected, 'show' ); ?>><?php esc_html_e('Show sidebar', 'balaton') ?></option>
          <option value="hide" <?php selected( $selected, 'hide' ); ?>><?php esc_html_e('Hide sidebar', 'balaton') ?></option>
        </select>
      </p>
    <?php } }
  /* Save the meta box's post metadata. */
    if ( !function_exists( 'weart_save_hide_sidebar_meta' ) ) {
    function weart_save_hide_sidebar_meta( $post_id, $post ) {

      /* Verify the nonce before proceeding. */
      if ( !isset( $_POST['weart_hide_sidebar_nonce'] ) || !wp_verify_nonce( $_POST['weart_hide_sidebar_nonce'], 'weart_save_hide_sidebar_meta' ) )
        return $post_id;

      /* Get the post type object. */
      $post_type = get_post_type_object( $post->post_type );

      /* Check if the current user has permission to edit the post. */
      if ( !current_user_can( $post_type->cap->edit_post, $post_id ) )
        return $post_id;

      /* Get the posted data and sanitize it for use as an HTML class. */
      $new_meta_value = ( isset( $_POST['weart-hide-sidebar'] ) ? weart_sanitize_balance( $_POST['weart-hide-sidebar'] ) : '' );

      /* Get the meta key. */
      $meta_key = 'weart_hide_sidebar';

      /* Get the meta value of the custom field key. */
      $meta_value = get_post_meta( $post_id, $meta_key, true );

      /* If a new meta value was added and there was no previous value, add it. */
      if ( $new_meta_value && '' == $meta_value )
        add_post_meta( $post_id, $meta_key, $new_meta_value, true );

      /* If the new meta value does not match the old value, update it. */
      elseif ( $new_meta_value && $new_meta_value != $meta_value )
        update_post_meta( $post_id, $meta_key, $new_meta_value );

      /* If there is no new meta value but an old value exists, delete it. */
      elseif ( '' == $new_meta_value && $meta_value )
        delete_post_meta( $post_id, $meta_key, $meta_value );
    } }




/*SANITIZE*/
function weart_sanitize_balance( $input ) {
  esc_js($input);
  $input = str_replace(array("\r", "\n"), '', $input);
  return $input;
}
