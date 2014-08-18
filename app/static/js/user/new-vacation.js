/* jshint camelcase: false */

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addVacation);
  });

  function addVacation(e){
    e.preventDefault();
  }

})();


