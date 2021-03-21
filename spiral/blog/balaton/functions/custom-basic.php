<?php

// main-panel
  $wp_customize->add_panel( 'theme_settings', array(
    'priority'    => 1,
    'title'       => esc_attr__( 'Theme Settings', 'balaton' ),
  ) );
  $wp_customize->add_panel( 'home_settings', array(
    'priority'    => 2,
    'title'       => esc_attr__( 'Home Settings', 'balaton' ),
  ) );
// end

// header
  // section
    $wp_customize->add_section( 'header_settings', array(
      'title'          => esc_attr__( 'header settings', 'balaton' ),
      'priority'       => 12,
      'panel'          => 'theme_settings',
    ));
  // end

  // fixed header?
    $wp_customize->add_setting( 'want_fixed_header', array( 'default' => 1, 'sanitize_callback' => 'weart_sanitize_checkbox'));
    $wp_customize->add_control( 'want_fixed_header', array(
      'label' => esc_html__( 'fixed header', 'balaton' ),
      'section' => 'header_settings',
      'type' => 'checkbox',
    ));
  // end

  // header_layout
    $wp_customize->add_setting( 'header_layout', array( 'capability' => 'edit_theme_options', 'default' => 'layout_1', 'sanitize_callback' => 'weart_sanitize_radio', ) );
    $wp_customize->add_control( 'header_layout', array(
      'type' => 'select',
      'section' => 'header_settings',
      'label'          => esc_html__('Header Layout','balaton'),
      'choices' => array(
        'layout_1' => esc_html__( 'Big header', 'balaton' ),
        'layout_2' => esc_html__( 'Small header', 'balaton' ),
      ),
    ) );
  // end

// end

// home
  // section
    $wp_customize->add_section( 'home_basic_settings', array(
      'title'          => esc_attr__( 'basic settings', 'balaton' ),
      'priority'       => 12,
      'panel'          => 'home_settings',
    ));
  // end

  // home sections
    for ($i=1; $i <= 5; $i++) {
      // section
        $wp_customize->add_section( 'home_settings'.$i, array(
          'title'          => esc_attr__( 'section #'.$i, 'balaton' ),
          'priority'       => 12,
          'panel'          => 'home_settings',
        ));
      // end

      // title
        $wp_customize->add_setting( 'home_title'.$i, array('sanitize_callback' => 'weart_sanitize_text'));
        $wp_customize->add_control( 'home_title'.$i, array(
          'label' => esc_html__( 'Want Title?', 'balaton' ),
          'section' => 'home_settings'.$i,
          'type' => 'text',
        ));
      // end

      // layout
        $wp_customize->add_setting( 'home_layout'.$i, array( 'capability' => 'edit_theme_options', 'default' => 'off', 'sanitize_callback' => 'weart_sanitize_radio', ) );
        $wp_customize->add_control( 'home_layout'.$i, array(
          'type' => 'select',
          'section' => 'home_settings'.$i,
          'label'          => esc_html__('Layout','balaton'),
          'description' => esc_html__( 'Layout of the section. Switch off if you want to turn off.', 'balaton' ),
          'choices' => array(
            'layout_2' => esc_html__( 'Main Slider', 'balaton' ),
            'layout_1' => esc_html__( 'Featured #1', 'balaton' ),
            'layout_3' => esc_html__( 'Featured #2', 'balaton' ),
            'layout_4' => esc_html__( 'Video', 'balaton' ),
            'layout_5' => esc_html__( 'Latest Posts', 'balaton' ),
            'off' => esc_html__( 'Off this section', 'balaton' ),
          ),
        ) );
      // end

      // tag
        $wp_customize->add_setting( 'home_tag'.$i, array('sanitize_callback' => 'weart_sanitize_text'));
        $wp_customize->add_control( 'home_tag'.$i, array(
          'label' => esc_html__( 'Posts by Tag?', 'balaton' ),
          'section' => 'home_settings'.$i,
          'type' => 'text',
        ));
      // end

      // cat
        $wp_customize->add_setting( 'home_cat'.$i, array('sanitize_callback' => 'weart_sanitize_text'));
        $wp_customize->add_control( 'home_cat'.$i, array(
          'label' => esc_html__( 'Posts by Category?', 'balaton' ),
          'section' => 'home_settings'.$i,
          'type' => 'text',
        ));
      // end

      // offset
        $wp_customize->add_setting( 'home_offset'.$i, array('sanitize_callback' => 'weart_sanitize_text'));
        $wp_customize->add_control( 'home_offset'.$i, array(
          'label' => esc_html__( 'Offset?', 'balaton' ),
          'section' => 'home_settings'.$i,
          'type' => 'text',
        ));
      // end

      // banner
        $wp_customize->add_setting( 'home_banner'.$i, array( 'sanitize_callback' => 'weart_sanitize_adsense',));
        $wp_customize->add_control( 'home_banner'.$i, array(
          'label' => esc_html__( 'Banner', 'balaton' ),
          'description' => esc_html__( 'Just put your banner code and we will display above the section.', 'balaton' ),
          'section' => 'home_settings'.$i,
          'type' => 'textarea',
        ));
      // end
    }
  // end

  // want writer?
    $wp_customize->add_setting( 'want_meta_wirter', array( 'default' => 1, 'sanitize_callback' => 'weart_sanitize_checkbox'));
    $wp_customize->add_control( 'want_meta_wirter', array(
      'label' => esc_html__( 'Meta Writer', 'balaton' ),
      'section' => 'home_basic_settings',
      'type' => 'checkbox',
    ));
  // end

  // want date?
    $wp_customize->add_setting( 'want_meta_date', array( 'default' => 1, 'sanitize_callback' => 'weart_sanitize_checkbox'));
    $wp_customize->add_control( 'want_meta_date', array(
      'label' => esc_html__( 'Meta Date', 'balaton' ),
      'section' => 'home_basic_settings',
      'type' => 'checkbox',
    ));
  // end

  // want infinite?
    $wp_customize->add_setting( 'want_infinite', array( 'default' => 0, 'sanitize_callback' => 'weart_sanitize_checkbox'));
    $wp_customize->add_control( 'want_infinite', array(
      'label' => esc_html__( 'Infinite Scroll', 'balaton' ),
      'section' => 'home_basic_settings',
      'type' => 'checkbox',
    ));
  // end
// end

// footer
  // section
    $wp_customize->add_section( 'footer_settings', array(
      'title'          => esc_attr__( 'footer settings', 'balaton' ),
      'priority'       => 12,
      'panel'          => 'theme_settings',
    ));
  // end

















  // footer social
    $wp_customize->add_setting( 'want_footer_social', array( 'default' => 1, 'sanitize_callback' => 'weart_sanitize_checkbox'));
    $wp_customize->add_control( 'want_footer_social', array(
      'label' => esc_html__( 'Display footer social', 'balaton' ),
      'section' => 'footer_settings',
      'type' => 'checkbox',
    ));
  // end

  // footer copyright
    $wp_customize->add_setting( 'copyright', array('sanitize_callback' => 'weart_sanitize_text'));
    $wp_customize->add_control( 'copyright', array(
      'label' => esc_html__( 'Copyright text', 'balaton' ),
      'section' => 'footer_settings',
      'type' => 'text',
    ));
  // end
// end

// article
  // section
    $wp_customize->add_section( 'article_settings', array(
      'title'          => esc_attr__( 'article settings', 'balaton' ),
      'priority'       => 12,
      'panel'          => 'theme_settings',
    ));
  // end

  // article layout
    $wp_customize->add_setting( 'article_layout', array( 'capability' => 'edit_theme_options', 'default' => 'narrow', 'sanitize_callback' => 'weart_sanitize_radio', ) );
    $wp_customize->add_control( 'article_layout', array(
      'type' => 'select',
      'section' => 'article_settings',
      'label'          => esc_html__('Article Layout','balaton'),
      'choices' => array(
        'wide'=>esc_html__('Wide Layout','balaton'),
        'narrow'=>esc_html__('Narrow Layout','balaton'),
        'video'=>esc_html__('Video Layout','balaton'),
        'wallpaper'=>esc_html__('Wallpaper Layout','balaton'),
      ),
    ) );
  // end

  // Related post Random or Latest
    $wp_customize->add_setting( 'what_related', array( 'capability' => 'edit_theme_options', 'default' => 'rand', 'sanitize_callback' => 'weart_sanitize_radio', ) );
    $wp_customize->add_control( 'what_related', array(
      'type' => 'select',
      'section' => 'article_settings',
      'label'          => esc_html__('Related Posts','balaton' ),
      'choices' => array(
        'rand'=>esc_html__('Random from category','balaton'),
        'date'=>esc_html__('By date from category','balaton'),
        'latest'=>esc_html__('Latest posts','balaton'),
        'none'=>esc_html__('No-related','balaton'),
      ),
    ) );
  // end

  // Sticky?
    $wp_customize->add_setting( 'want_sticky', array( 'default' => 1, 'sanitize_callback' => 'weart_sanitize_checkbox'));
    $wp_customize->add_control( 'want_sticky', array(
      'label' => esc_html__( 'Sticky sidebar?', 'balaton' ),
      'section' => 'article_settings',
      'type' => 'checkbox',
    ));
  // end

  // banner
    $wp_customize->add_setting( 'article_banner', array( 'sanitize_callback' => 'weart_sanitize_adsense',));
    $wp_customize->add_control( 'article_banner', array(
      'label' => esc_html__( 'Banner', 'balaton' ),
      'description' => esc_html__( 'Put your banner under the article.', 'balaton' ),
      'section' => 'article_settings',
      'type' => 'textarea',
    ));
  // end

  // Excerpt?
    $wp_customize->add_setting( 'want_excerpt', array( 'default' => 0, 'sanitize_callback' => 'weart_sanitize_checkbox'));
    $wp_customize->add_control( 'want_excerpt', array(
      'label' => esc_html__( 'Want excerpt?', 'balaton' ),
      'section' => 'article_settings',
      'type' => 'checkbox',
    ));
  // end

// end