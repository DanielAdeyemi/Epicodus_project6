import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Converter from './js/business_logic.js';

function showRate(response, change) {
  if (response.result === 'success' && change in response.conversion_rates) {
    $('.output').show();
    return $('.result').text(`${(response.conversion_rates[change])}`);
  } else {
    $('.error').show();
    return (response.result !== 'success') ? $('#errorResult').text(`There was an error: ${Object.values(response)[1]}`) :
      $('#errorResult').text(`There was an error: This type of currency not available right now or you try to input invalid symbol.`);
  }
}

$('.btn-warning').click(function(event1) {
  event1.preventDefault();
  $('#currencyChoice, .btn-warning').hide();
  let change = $('#choices').val();
  $('#convert').show();
  // const change = $('#change').val().toUpperCase();
  if (change === 'Other') {
    $('#other').show();
    change = $('#other').val().toUpperCase();
  }
  $('#convert').click(function(event2) {
    event2.preventDefault();
    if (!change) {
      $('.error').show();
      return $('#errorResult').text(`No currency to convert. Please, try again`);
    }
    Converter.convert()
      .then(function(response) {
        showRate(response, change);
      });
  });
});

$('.again').click(function(event1) {
  event1.preventDefault();
  $('p').text('');
  $('#main')[0].reset();
  $('.output, .error, #convert').hide();
  $('#main, .btn-warning').show();
});