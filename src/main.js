import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Converter from './js/business_logic.js';

function showRate(response) {
  if (response.result === 'success') {
    $('.result').text(`${response.conversion_rates.EUR}`);
  } else {
    $('.error').text(`There was an error: ${response.message}`);
  }
}

$('#convert').click(function(event) {
  event.preventDefault();
  // const change = $('#change').val().toUpperCase();
  Converter.convert()
    .then(function(response) {
      showRate(response);
    });
});