<?php get_header() ?>
<section class="section">
<div class="container">
  <div class="row justify-content-center py-5">
    <div class="col-lg-6 py-5 text-center">
      <h1 class="article-title c-black">
        <?php esc_html_e("Ooops! That page can't be found.",'balaton') ?>
      </h1>
      <div class="lead f-title my-5">
        <?php esc_html_e("We are sorry, we seem to have lost this page, but we do not want to lose you.",'balaton') ?>
      </div>
      <div class="buttons l-white c-white">
        <a href="<?php echo esc_url( home_url() ) ?>" class="btn btn-dark btn-lg w-category f-meta text-uppercase px-3 py-2 rounded-0 ">
          <?php esc_html_e('Go to Homepage','balaton') ?>
        </a>
      </div>
    </div>
  </div>
</div>
</section>
<?php get_footer() ?>