<?php get_header();

weart_sectionTitle(array('title'=>esc_html__( 'Searched: ', 'balaton' ) . get_search_query()  ));
weart_section(array('layout'=>'layout_5','on'=>1));

get_footer() ?>