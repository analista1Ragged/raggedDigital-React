import React from 'react';
import { Helmet } from 'react-helmet';

function Head() {
  return (
    <Helmet>
      {/* Meta Data */}
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Title */}
      <title>Browny</title>

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&subset=devanagari,latin-ext"
        rel="stylesheet"
      />

      {/* Favicon */}
      <link rel="shortcut icon" type="image/icon" href="assets/logo/favicon.png" />

      {/* CSS Files */}
      <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
      <link rel="stylesheet" href="assets/css/flaticon.css" />
      <link rel="stylesheet" href="assets/css/animate.css" />
      <link rel="stylesheet" href="assets/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="assets/css/owl.theme.default.min.css" />
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/bootsnav.css" />
      <link rel="stylesheet" href="assets/css/style.css" />
      <link rel="stylesheet" href="assets/css/responsive.css" />

      {/* HTML5 shim and Respond.js for IE8 support */}
      {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    </Helmet>
  );
}

export default Head;
