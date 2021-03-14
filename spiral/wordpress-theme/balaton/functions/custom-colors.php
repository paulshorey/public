<?php

//main
  $wp_customize->add_setting( 'main_color', array( 'default' => '#bf9d7a', 'sanitize_callback' => 'sanitize_hex_color' ) );
  $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'main_color', array(
    'label' => esc_html__('main color', 'balaton' ),
    'section' => 'colors',
    'settings' => 'main_color',
  ) ) );
// end

//black
  $wp_customize->add_setting( 'black_color', array( 'default' => '#080808', 'sanitize_callback' => 'sanitize_hex_color' ) );
  $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'black_color', array(
    'label' => esc_html__('black color', 'balaton' ),
    'section' => 'colors',
    'settings' => 'black_color',
  ) ) );
// end

//white
  $wp_customize->add_setting( 'white_color', array( 'default' => '#fff', 'sanitize_callback' => 'sanitize_hex_color' ) );
  $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'white_color', array(
    'label' => esc_html__('white color', 'balaton' ),
    'section' => 'colors',
    'settings' => 'white_color',
  ) ) );
// end

//meta
  $wp_customize->add_setting( 'meta_color', array( 'default' => '#99999', 'sanitize_callback' => 'sanitize_hex_color' ) );
  $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'meta_color', array(
    'label' => esc_html__('meta color', 'balaton' ),
    'section' => 'colors',
    'settings' => 'meta_color',
  ) ) );
// end

//text
  $wp_customize->add_setting( 'text_color', array( 'default' => '#222222', 'sanitize_callback' => 'sanitize_hex_color' ) );
  $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'text_color', array(
    'label' => esc_html__('text color', 'balaton' ),
    'section' => 'colors',
    'settings' => 'text_color',
  ) ) );
// end

//meta2
  $wp_customize->add_setting( 'meta2_color', array( 'default' => '#f5f5f5', 'sanitize_callback' => 'sanitize_hex_color' ) );
  $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'meta2_color', array(
    'label' => esc_html__('meta2 color', 'balaton' ),
    'section' => 'colors',
    'settings' => 'meta2_color',
  ) ) );
// end