<!DOCTYPE html>
<html lang="en">

<?php
  $showMap = false;
  include 'sections/head.php';
?>

<?php
  $route = false;
  if (array_key_exists('route', $_GET)) {
    $route = $_GET['route'];
  }
?>

<body>

  <?php if ($route === 'products'): ?>
    <?php 
      include 'sections/header.php';
    ?>
  <?php else: ?>
    <div class="hero_area">
      <?php 
        include 'sections/header.php';
      ?>
      <?php
        include 'sections/slider.php';
      ?>
    </div>
  <?php endif; ?>

  <?php
    if ($route === 'products'):
    ?>
      <?php
        include 'sections/products.php';
      ?>
  <?php
    endif; ?>

  <?php 
    if (!$route): ?>

    <?php
      include 'sections/service.php';
    ?>

    <?php
      include 'sections/about.php';
    ?>

    <?php
      include 'sections/project.php';
    ?>

    <?php
      include 'sections/testimonial.php';
    ?>

    <?php
      include 'sections/why-us.php';
    ?>

    <?php
      $showMap = true;
      include 'sections/contact.php';
    ?>

    <?php
      include 'sections/info.php';
    ?>

  <?php endif; ?>

  <?php
    include 'sections/footer.php';
  ?>

  <!-- jQery -->
  <script src="js/jquery-3.4.1.min.js"></script>
  <!-- popper js -->
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
  </script>
  <!-- bootstrap js -->
  <script src="js/bootstrap.js"></script>
  <!-- owl slider -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js">
  </script>
  <!--  OwlCarousel 2 - Filter -->
  <script src="https://huynhhuynh.github.io/owlcarousel2-filter/dist/owlcarousel2-filter.min.js"></script>
  <!-- custom js -->
  <script src="js/custom.js"></script>
  
  <?php
    if ($showMap): ?>
  <!-- Google Map -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=myMap">
  </script>
  <!-- End Google Map -->
  <?php endif; ?>

  <script src="js/app/products.js" defer></script>
  <script src="js/app/urlHelper.js" defer></script>
  <script src="js/app/css.js" defer></script>
  <script src="js/app/consts.js" defer></script>
  <script src="js/app/storage.js" defer></script>
  <script src="js/app/login.js" defer></script>
  <script src="js/app/fetch.js" defer></script>
  <script src="js/app/index.js" defer></script>

  <?php
    require_once 'sections/loginForm.php';
  ?>
  <?php
    require_once 'sections/modalMessage.php';
  ?>

<script>
  $('#loginModal').on('shown.bs.modal')
</script>
</body>

</html>