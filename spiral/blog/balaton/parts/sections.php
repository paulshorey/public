<?php /* HOME PAGE SECTIONS */

function weart_section( $args = array() ){
  // settings
    $tag = !isset($args['tag'])? '' : $args['tag'];
    $cat = !isset($args['cat'])? '' : $args['cat'];
    $offset = !isset($args['offset'])? 0 : $args['offset'];
    $layout = !isset($args['layout'])? 'layout_1' : $args['layout'];
    $title = !isset($args['title'])? '' : $args['title'];
  // end

  // global variables
    global $post; $i=0;
    $args = array(
      'cat'=>$cat,
      'tag' => $tag,
      'numberposts' => 20,
      'offset' => $offset,
      'meta_query' => array(array('key' => '_thumbnail_id'))
    );
    $section_posts = get_posts( $args );
    $gp = count($section_posts);
  // end

  // section title
    $display = '';
    if( $cat !== '' ){ $display .= get_cat_name( $cat ).' '; }
    if( $tag !== '' ){ $display .= $tag; }
  // end

  // always show at top of homepage:
  if($layout==='layout_1') {
  ?>
<style>
	
#newsletterForm {
	display:flex;
	padding: 0;
	margin: 0;
	min-height: 342px;
	/*background: url('https://www.lemonade.com/blog/wp-content/uploads/2020/06/BlogSkyline.jpg');*/
	background-size:cover;justify-content:center;color:#080808;font-size:16px;
}
#nf_form {
	margin: 26px 42px 22px; /* 74px */
    position: relative;
    white-space: nowrap;
    display: inline-block;
    width: 360px;
	display:flex;
	justify-content:center;
	flex-direction:column;
}
	.image_left,
	.image_right {
		background-size: contain !important;
		background-position: center center !important;
		background-repeat: no-repeat !important;
	}
	.image_left {
		background: url('https://spiral.paulshorey.com/blog/images/giving.png');
		margin-right: 0px;
		margin-left: 1.8%;
		width: 28%;
		margin-top: 26px;
	}
	.image_right {
		background: url('https://spiral.paulshorey.com/blog/images/lady-card.png');
		margin-left: 15px;
		width: 30%;
		margin-top: 5px;
	}
	@media (max-width: 699px) {	
		.image_left,
		.image_right {
			display:none !important;
		}
	}
	
#nf_form label.error,
#nf_submit_error {
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 3px 15px;
    border-radius: 0;
	color: #080808;
    background: #efefef;
}
	#nf_submit_error {
		background: #DA2E76;
		color: white;
		font-family: HelveticaNeue, Helvetica, sans-serif;
	}

#nf_form a {color:#DA2E76;text-shadow: 0 0 30px white;}

#nf_title {
	color:#DA2E76;text-shadow: 0 0 60px white;font-size:33px;line-height: 50px;margin-top: 33px;
	font-family: HelveticaNeue-Light, Helvetica, sans-serif;
}

#nf_caption {
	margin: 17px 1px;
	font-family: HelveticaNeue-Light, Helvetica, sans-serif;
}
#nf_caption a {
	font-family: HelveticaNeue, Helvetica, sans-serif;
	text-shadow: 0 0 30px white;
}

#nf_top_fieldset {}
#nf_bottom_fieldset {}

#newsletterForm input {
    padding: 5px 15px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #d92e76;
    border-radius: 9px;
    font-family: HelveticaNeue-Light,Helvetica,sans-serif;
    font-size: 18px;
    color: #000;
    background: #fff;
    -webkit-appearance: none;
}
#newsletterForm input[name="email"] {
    width: 100%;
		margin: 3px 0 7px;
}
#newsletterForm input[name="firstname"] {
	    width: calc(50% - 3px);
}
#newsletterForm input[name="lastname"] {
	    width: calc(50% - 2px);
}
#newsletterForm button {
	padding: 8px 0 10px;
	border: 0;
	border-radius: 26.5px;
	display: inline-block;
	vertical-align: middle;
	width: 100%;
	font-family: HelveticaNeue-Light,Helvetica,sans-serif;
	font-size: 18px;
	color: #fff;
	text-align: center;
	text-transform: none;
	background: #d92e76;
	cursor: pointer;
}

#nf_submit_success {white-space:normal !important;}
#nf_submit_success p b { font-size: 1.5rem;}
#nf_submit_success p {font-size: 1.125em;}	
#nf_submit_success p.tan { color: #bf9d7a; }
</style>
<form id="newsletterForm" style="display:none;">
	<div id="nf_submit_success" style="display:none;">
		<p><b>Congratulations! You are on the list.</b></p>
		<p class="tan">We just sent you a confirmation email with your early access information</p>
	</div>
	<div class="image_left"></div>
	<div id="nf_form">
		<div id="nf_submit_error" style="display:none;">Server error</div>
		
		<h5 id="nf_title">Banking that gives!</h5>

		<div id="nf_top_fieldset" style="max-width:260px;max-height:0;overflow:hidden;transition:max-height 0.3s, max-width 0.15s, overflow 0s linear 0.3s;">
			<input id="nf_firstname" name="firstname" type="text" value="" placeholder="First name" />
			<input id="nf_lastname" name="lastname" type="text" value="" placeholder="Last name" />
		</div>

		<div id="nf_bottom_fieldset">
			<div id="nf_email_field">
				<input id="nf_email" name="email" type="email" value="" placeholder="Enter your email address" />
			</div>
			<button type="button" id="nf_submit">Get your early access</button>
		</div>

		<div id="nf_caption">Learn more at <a href="https://spiral.us">spiral.us</a></div>
		
	</div>
	<div class="image_right"></div>
</form>
<script>
	let $ = jQuery;
	$('#newsletterForm').show();
	$('#nf_email').blur(function(){
		if (!!$('#nf_email').val()){
			$('#nf_top_fieldset').css('max-height','50px');
			$('#nf_top_fieldset').css('max-width','540px');
			$('#nf_top_fieldset').css('overflow','visible');
			setTimeout(function(){
				$('#newsletterForm button').attr('type','submit');
			},1500);
		}
	})
</script>
<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"></script>
<script>
	
	$("#newsletterForm").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			email: "Please enter a valid email address"
		},
		submitHandler: function(form) {
			let data = {
				email: form.email.value,
				first: form.firstname.value,
				last: form.lastname.value,
				id: nf_makeid(40)
			};
			nf_sendEmail(data);
		}
	});

	function nf_sendEmail(data) {
		console.log('SEND', data);
		$.ajax({
			type: 'POST',
			url: 'https://staging-api.spiral.us/register/wait',
			headers: {"Content-Type": "application/json"},
			contentType:"application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify(data),
			success: function(token){
				$('#nf_form').hide();
				$('#nf_submit_success').show();
			},
			error: function(errMsg) {
				$('#nf_submit_error').show();
				setTimeout(()=>{
					$('#nf_submit_error').hide();
				},10000)
			}
		});
	}

	function nf_makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

</script>
<?php
  }

  // show if controlled by admin in "template customize" settings:
  if($layout !== 'off'):
?>
  <?php /* FEATURED #1 */ if($layout==='layout_1' && $section_posts && !is_paged()): ?>
    <section class="section" id="featured-line">
      <div class="container">
        <?php weart_metaTitle(array('title'=>$title)) ?>
        <div class="row align-items-top">
          <?php $i=1; foreach ( $section_posts as $post ) : setup_postdata( $post ); ?>
            <?php if($i<=2): ?>
              <div class="col-md-6 <?php if($i===1){ echo esc_html('border-right'); } ?>">
                <?php weart_item2(array('imgsize'=>'weart-grid','imgh'=>'bg-45','size'=>'h4')) ?>
              </div>
          <?php endif; $i++;   endforeach; wp_reset_postdata(); ?>
        </div>
        <hr>
        <div class="row align-items-top">
          <?php $i=1; foreach ( $section_posts as $post ) : setup_postdata( $post ); ?>
            <?php if($i>2 && $i<=5 && has_post_thumbnail()): ?>
              <div class="col-lg-4 col-md-4 <?php if($i!==6){ echo esc_html('border-right'); } ?>">
                <?php weart_item(array('imgsize'=>'weart-list','img'=>1,'exc'=>1,'size'=>'h5')) ?>
              </div>
          <?php endif; $i++;   endforeach; wp_reset_postdata(); ?>
        </div>
      </div>
    </section>
  <?php /* SLIDER */ elseif($layout==='layout_2' && $section_posts && !is_paged()): ?>
    <section class="section" id="slider-">
      <div id="slider" class="carousel slide main" data-ride="carousel">
        <?php weart_metaTitle(array('title'=>$title)) ?>
        <div class="position-relative">
          <div class="carousel-inner">
            <?php $i=1; foreach ( $section_posts as $post ) : setup_postdata( $post ); if(has_post_thumbnail()): ?>
              <?php if($i<=4): ?>
                <div class="carousel-item <?php if($i===1){echo esc_html('active');} ?>">
                  <?php weart_item3(array('textwidth'=>'col-lg-5 mx-auto','imgsize'=>'weart-wide','imgh'=>'bg-75','more'=>0,'size'=>'h2')) ?>
                </div>
              <?php endif;  ?>
            <?php $i++; endif; endforeach; wp_reset_postdata(); ?>
          </div>
          <a class="carousel-control-prev" href="#slider" role="button" data-slide="prev">
            <span class="fas fa-chevron-left fa-lg" aria-hidden="true"></span>
          </a>
          <a class="carousel-control-next" href="#slider" role="button" data-slide="next">
            <span class="fas fa-chevron-right fa-lg" aria-hidden="true"></span>
          </a>
        </div>
        <div class="container"><ol class="carousel-indicators bg-white d-none d-lg-flex row">
            <?php $i=0; foreach ( $section_posts as $post ) : setup_postdata( $post ); if(has_post_thumbnail()): if($i<=3): ?>
            <li onclick="window.location='<?php the_permalink() ?>'" xxdata-target="#slider" xxdata-slide-to="<?php echo esc_html($i); ?>" class="link col-lg-3 <?php if($i===0){ echo esc_html('active');} else { echo esc_html('border-left'); } ?>">
              <div class="pt-4">
                <h3 class="h5 title mb-3"><?php the_title() ?></h3>
                <div class="text-center"><?php weart_meta() ?></div>
                <div class="text-justify c-meta">
                  <?php the_excerpt() ?>
                </div>
              </div>
            </li>
            <?php endif; $i++; endif; endforeach; wp_reset_postdata(); ?>
        </ol></div>
      </div>

    </section>
  <?php /* FEATURED #2 */ elseif($layout==='layout_3' && $section_posts && !is_paged()): ?>
    <section class="section" id="sidebarposts">
      <div class="container">
        <?php weart_metaTitle(array('title'=>$title)) ?>
          <div class="row">
            <?php $i=1; foreach ( $section_posts as $post ) : setup_postdata( $post ); if(has_post_thumbnail()): ?>
              <?php if($i===1): ?>
                <div class="col-lg-8 border-right">
                  <?php weart_item3(array('imgsize'=>'weart-grid','size'=>'h2','imgh'=>'bg-65','textwidth'=>'col-lg-8 mx-auto')) ?>
                </div>
              <?php elseif($i===2): ?>
                <div class="col-lg-4 col-md-6 my-4 my-lg-0">
                  <?php weart_item(array('imgsize'=>'weart-list')) ?>
                </div>
                <hr class="w-100 d-none d-lg-flex mx-4">
              <?php elseif($i===3): ?>
                <div class="col-lg-4  col-md-6 border-right my-4 my-lg-0">
                  <?php weart_item(array()) ?>
                </div>
              <?php elseif($i===4): ?>
                <div class="col-lg-8">
                  <?php weart_item3(array('size'=>'h2','imgh'=>'bg-65','textwidth'=>'col-lg-8 mx-auto')) ?>
                </div>
              <?php endif;  ?>
            <?php $i++; endif; endforeach; wp_reset_postdata(); ?>
          </div>
      </div>
    </section>
  <?php /* VIDEO */ elseif($layout==='layout_4' && $section_posts && !is_paged()): ?>
    <section class="section" id="video-">
      <div class="container"><?php weart_metaTitle(array('title'=>$title)) ?></div>
      <div id="video" class="carousel video slide" data-ride="carousel">
        <div class="container">
          <div class="row no-gutters bg-black c-white">
            <div class="col-lg-8">
              <div class="position-relative">
                <div class="carousel-inner">
                  <?php $i=1; foreach ( $section_posts as $post ) : setup_postdata( $post ); if(has_post_thumbnail()): ?>
                    <?php if($i<=4): ?>
                      <div class="carousel-item <?php if($i===1){echo esc_html('active');} ?>">
                        <?php weart_item3(array('imgsize'=>'weart-wide','imgh'=>'bg-70','more'=>0,'size'=>'h2','textwidth'=>'col-lg-8 mx-auto')) ?>
                      </div>
                    <?php endif;  ?>
                  <?php $i++; endif; endforeach; wp_reset_postdata(); ?>
                </div>
                <a class="carousel-control-prev" href="#video" role="button" data-slide="prev">
                  <span class="fas fa-chevron-left fa-lg" aria-hidden="true"></span>
                </a>
                <a class="carousel-control-next" href="#video" role="button" data-slide="next">
                  <span class="fas fa-chevron-right fa-lg" aria-hidden="true"></span>
                </a>
              </div>
            </div>
            <div class="col-4  d-none d-lg-flex align-items-center">
              <ol class="carousel-indicators m-0 p-0 w-100">
                <?php $i=0; foreach ( $section_posts as $post ) : setup_postdata( $post ); if(has_post_thumbnail()): if($i<=3): ?>
                <li data-target="#video" data-slide-to="<?php echo esc_html($i); ?>"
                    class="border-top <?php if($i===0){ echo esc_html('active border-top-0 mt-3');}?>">
                    <div class="row align-items-center no-gutters p-3">
                      <div class="col-3">
                        <!-- img -->
                          <?php if(has_post_thumbnail()){ ?>
                            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
                              <div class="bg-10 lazy" data-src="<?php the_post_thumbnail_url('thumbnail') ?>"></div>
                            </a>
                          <?php  } ?>
                        <!-- end -->
                      </div>
                      <div class="col pl-3">
                        <h3 class="h6 title"><?php the_title() ?></h3>
                      </div>
                    </div>
                </li>
                <?php endif; $i++; endif; endforeach; wp_reset_postdata(); ?>
              </ol>
            </div>
          </div>
        </div>
      </div>

    </section>
  <?php /* LATEST */ elseif($layout==='layout_5'): ?>
    <section class="section" id="latest">
      <div class="container">
        <?php weart_metaTitle(array('title'=>$title)) ?>
        <div class="row infinite">
          <div class="col-lg-8">
            <div class="grid">
            <?php $i=1; if ( have_posts() ) : while ( have_posts() ) : the_post(); if($i>=1): ?>
              <?php if($i===1){$brd='border-0';}else{$brd='border-top';} ?>
              <div <?php post_class('mb-5 grid-item '.$brd) ?>>
                <?php weart_item4( array('imgh'=>'bg-30','col'=>'col-md-6 pr-md-4','imgsize'=>'weart-list') ) ?>
              </div>
            <?php $i++; endif; endwhile; endif; ?>
            </div>
            <?php weart_infinite(array('infinite'=>get_theme_mod('want_infinite',0))); ?>
          </div>
          <?php get_sidebar() ?>

        </div>
      </div>
    </section>
  <?php endif; ?>

<?php endif; } ?>