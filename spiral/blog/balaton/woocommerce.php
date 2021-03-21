<?php get_header() ?>

<section class="section">
  <div class="container pt-5">

    <div class="row justify-content-center">


      <div class="col">
        <div class="l-1">
          <?php woocommerce_content(); ?>
        </div>
      </div>

      <?php get_sidebar('woo'); ?>

    </div>
  </div>
</section>

<?php get_footer() ?>