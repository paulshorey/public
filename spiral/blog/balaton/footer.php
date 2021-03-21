</main>


<?php get_sidebar('insta') ?>
<footer id="footer" class="bg-black">
  <div class="container f-text py-5">

    <?php if(get_theme_mod('want_footer_social',1)){ ?>
      <div class="d-flex justify-content-center">
        <?php if(has_nav_menu('social-menu')):
            wp_nav_menu( array(
              'theme_location' => 'social-menu',
              'container_class' => 'w-social d-none h5 c-meta l-meta',
            ) );
          endif; ?>
      </div>
    <?php } ?>

    <?php if(has_nav_menu('footer-menu')): ?>
    <div class="f-meta text-uppercase"><div class="d-inline-block border-top border-bottom p-3  c-white l-white">
      <?php
        wp_nav_menu( array(
          'theme_location' => 'footer-menu',
          'depth' => 1,
        ) );
      ?>
    </div></div>
    <?php endif; ?>

    <p class="m-0 pt-3 pb-4 f-text font-italic c-meta small">
      <?php echo get_theme_mod('copyright',esc_html__('&copy; 2018 The Balaton theme by weartstudio.','balaton')) ?>
    </p>

  </div>
</footer>


</div>
</div>
<?php wp_footer() ?>
</body>
</html>