<?php
// comments title
  if(comments_open()){
    weart_metaTitle( array( 'title' => esc_html('Comments','balaton'), ));
  }
// end

// Password Protection, Not load directly
  if ( post_password_required() ) { ?><div class="alert alert-warning"><?php esc_html_e('This post is password protected. Enter the password to view comments.', 'balaton'); ?></div><?php return; }
// end

// COMMENTSAREA
  if (have_comments()) : ?>

    <ul class="pt-2 l-black c-text comment-list">
      <?php wp_list_comments('avatar_size=40');?>
    </ul>

    <p class="text-muted">
      <?php paginate_comments_links(); ?>
    </p>

  <?php endif;
/* end */ ?>

<!-- comment form -->
  <?php if (comments_open()) : ?>
    <div class="c-meta l-meta mb-5 f-text">
      <?php $commenter = wp_get_current_commenter();
      $req = get_option( 'require_name_email' );
      $aria_req = ( $req ? " aria-required='true'" : '' );
      $comment_args = array(
        'class_submit'        => 'submit btn btn-dark btn-sm w-category f-meta text-uppercase px-3 py-2 rounded-0',

        'title_reply_before'  => '<div class="mb-2 mt-5"><span class="f-title h4 c-black">',
        'title_reply_after'   => '</span></div>',

        'cancel_reply_before' => '<span class="f-title small pl-2">',
        'cancel_reply_after'  => '</span>',

        'fields' => apply_filters( 'comment_form_default_fields', array(
          'author' => '<div class="row"><div class="author col form-group"><input id="author" class="form-control rounded-0 w-category f-meta" placeholder="'.esc_attr__( 'Name', 'balaton' ).'" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></div>',
          'email'  => '<div class="email col form-group"><input id="email" class="form-control rounded-0 w-category f-meta" placeholder="'.esc_attr__( 'Email', 'balaton' ).'" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' /></div></div>',
        )),

        'comment_field' =>  '<div class="form-group"><textarea name="comment" class="form-control rounded-0 w-category f-meta" id="comment" rows="5" aria-required="true"></textarea></div>',


      );
      comment_form($comment_args); ?>
    </div>
  <?php endif; ?>
<!-- end -->
