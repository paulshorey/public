<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <?php wp_head() ?>
</head>
<body  <?php body_class(); ?>>
  <div class="px-lg-5 py-3" id="weart_balaton_theme">
    <div class="bg-white p-lg-5 shadow mw-weart">
<!-- mobile -->
  <div id="weart-mobile">
    <div class="inner bg-white l-black c-black f-meta text-uppercase">
      <a href="#close" class="fas fa-times bars"></a>
      <!-- menu -->
        <?php  if(has_nav_menu('mobile-menu')):
          wp_nav_menu( array(
            'theme_location' => 'mobile-menu',
            'container_class' => 'w-menu',
            ) );
          endif; ?>
      <!-- end -->
    </div>
  </div>
<!-- end -->

<!-- fly-over --><?php if(get_theme_mod('want_fixed_header',1)): ?>
  <div id="fly-over" class="bg-white f-text border-bottom shadow-sm border-top brd-bold brd-black border-bottom-0 border-right-0 border-left-0">
    <!-- menu -->
      <div class="l-black f-meta mx-lg-5 px-lg-5 align-items-center" id="w-menu2">

        <?php if(has_nav_menu('social-menu')):
          wp_nav_menu( array(
            'theme_location' => 'social-menu',
            'container_class' => 'w-social d-none border-right px-3',
          ) );
        endif; ?>

        <!-- menu -->
          <?php  if(has_nav_menu('desktop-menu')):
          wp_nav_menu( array(
            'theme_location' => 'desktop-menu',
            'container_class' => 'w-menu d-none d-lg-flex c-meta ml-auto',
            ) );
          endif; ?>
          <?php  if(has_nav_menu('mobile-menu')): ?>
            <div class="d-flex d-lg-none bars px-3 border-right mr-auto">
              <a href="#menubutton">
                <i class="fas fa-bars"></i>
              </a>
            </div>
          <?php endif; ?>
        <!-- end -->

        <!-- search -->
          <div class="w-search px-3 border-left ml-auto">
            <a href="#w-search" class="search-indicator"><i class="fas fa-search"></i></a>
            <div class="search-box bg-2">
              <?php get_search_form() ?>
            </div>
          </div>
        <!-- end -->

      </div>
    <!-- end -->
  </div><?php endif; ?>
<!-- end -->

<!-- hedader_layouts -->
  <?php $header_layout = get_theme_mod('header_layout','layout_1');
  if(isset($_GET['header_layout']) && !empty($_GET['header_layout'])){
    $header_layout =  $_GET['header_layout'];
  }
  if( $header_layout==='layout_1' ): ?>

    <header>

      <div class="top pb-3 border-bottom brd-bold brd-black">
        <div class="w-logoline">
          <!-- logo -->
            <div class="logo f-meta l-black pt-3 px-3 p-lg-0" itemscope itemtype="https://schema.org/Organization">
                <?php  if ( has_custom_logo() ) { ?>
                <div itemscope itemtype="https://schema.org/ImageObject">
                  <?php the_custom_logo(); ?>
                </div>
              <?php } else{ ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                  <?php bloginfo( 'name' ); ?>
                </a>
              <?php } ?>
              <meta itemprop="name" content="<?php bloginfo( 'name' ); ?>">
            </div>
          <!-- end -->
          <div class="meta small f-text d-none d-lg-flex c-text">
            <span class="date"><?php echo esc_attr(date(get_option('date_format'))); ?></span>
            <span class=""><?php echo esc_attr(get_bloginfo('description')); ?></span>
          </div>
        </div>
      </div>

      <div class="bottom d-flex c-black l-black lh-1 f-meta border-bottom minus position-relative" id="w-menu">

            <?php if(has_nav_menu('social-menu')):
              wp_nav_menu( array(
                'theme_location' => 'social-menu',
                'container_class' => 'w-social d-none border-right px-3',
              ) );
            endif; ?>

            <!-- menu -->
              <?php  if(has_nav_menu('desktop-menu')):
              wp_nav_menu( array(
                'theme_location' => 'desktop-menu',
                'container_class' => 'w-menu d-none d-lg-flex c-meta ml-auto',
                ) );
              endif; ?>
              <?php  if(has_nav_menu('mobile-menu')): ?>
                <div class="d-flex d-lg-none bars px-3 border-right mr-auto">
                  <a href="#menubutton">
                    <i class="fas fa-bars"></i>
                  </a>
                </div>
              <?php endif; ?>
            <!-- end -->

            <!-- search -->
              <div class="w-search px-3 border-left ml-auto">
                <a href="#w-search" class="search-indicator"><i class="fas fa-search"></i></a>
                <div class="search-box bg-2">
                  <?php get_search_form() ?>
                </div>
              </div>
            <!-- end -->

      </div>

    </header>

  <?php elseif( $header_layout==='layout_2' ): ?>

    <header>
      <!-- menu -->
        <div class="border-top brd-bold brd-black" id="weart-menu">
          <div class="d-flex c-black l-black lh-1 f-meta border-bottom minus " id="w-menu">

            <div class="logo-inner logo f-meta l-black mx-3" itemscope itemtype="https://schema.org/Organization">
                <?php  if ( has_custom_logo() ) { ?>
                <div itemscope itemtype="https://schema.org/ImageObject">
                  <?php the_custom_logo(); ?>
                </div>
              <?php } else{ ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                  <?php bloginfo( 'name' ); ?>
                </a>
              <?php } ?>
              <meta itemprop="name" content="<?php bloginfo( 'name' ); ?>">
            </div>

            <!-- menu -->
              <?php  if(has_nav_menu('desktop-menu')):
              wp_nav_menu( array(
                'theme_location' => 'desktop-menu',
                'container_class' => 'w-menu d-none d-lg-flex border-left c-meta mr-auto',
                ) );
              endif; ?>
              <?php  if(has_nav_menu('mobile-menu')): ?>
                <div class="d-flex d-lg-none bars px-3 border-left border-right mr-auto">
                  <a href="#menubutton">
                    <i class="fas fa-bars"></i>
                  </a>
                </div>
              <?php endif; ?>
            <!-- end -->

            <div class="d-none d-md-flex">
            <?php if(has_nav_menu('social-menu')):
              wp_nav_menu( array(
                'theme_location' => 'social-menu',
                'container_class' => 'w-social d-none px-3 ml-auto border-left',
              ) );
            endif; ?></div>

            <!-- search -->
              <div class="w-search px-3 border-left">
                <a href="#w-search" class="search-indicator"><i class="fas fa-search"></i></a>
                <div class="search-box bg-2">
                  <?php get_search_form() ?>
                </div>
              </div>
            <!-- end -->
          </div>
        </div>
      <!-- end -->
    </header>

    <?php endif; ?>
<!-- end -->

<main id="main" class="c-text f-text mb-5">
