<form role="search" method="get" class="search-form d-block" action="<?php echo esc_url( home_url( '/' ) ); ?>">
  <div class="input-group  input-group-sm">
    <input type="search" class="form-control search-field rounded-0 f-main border" placeholder="<?php esc_attr_e( 'Search for...', 'balaton' ); ?>" aria-label="<?php esc_attr_e( 'Search for...', 'balaton' ); ?>" name="s">
    <span class="input-group-btn">
      <button class="btn bg-1 c-white search-submit rounded-0" type="submit"><i class="fas fa-search"></i></button>
    </span>
  </div>
</form>
