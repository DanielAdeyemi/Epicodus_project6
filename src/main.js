import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Converter from './js/business_logic.js';

function showRate(response, change, number) {
  if (response.result === 'success' && change in response.conversion_rates) {
    $('.output').show();
    return $('.result').text(`You will recieve ${(response.conversion_rates[change] * number).toFixed(2)} ${change} for $${number}`);
  } else {
    $('.error').show();
    return (response.result !== 'success') ? $('#errorResult').text(`There was an error: ${Object.values(response)[1]}`) :
      $('#errorResult').text(`There was an error: This type of currency not available right now or you try to input invalid symbol.`);
  }
}

$('#selection').click(function(event3) {
  event3.preventDefault();
  $('#symbol').hide();
  $('.symbols').show();
  Converter.convert()
    .then(function(response) {
      Object.keys(response.conversion_rates).forEach(key => {
        $("#choose").append(`<option value="${key}">${key}</option>`);
      });
    });
});

$('form').submit(function(event1) {
  event1.preventDefault();
  $('.btn-success').hide();
  let input = ($('#symbol').val() !== '') ? $('.choice').val().toUpperCase() :
    $('#choose').val();
  let number = $('input#num').val();
  Converter.convert()
    .then(function(response) {
      showRate(response, input, number);
    });
});

$('.again').click(function(event2) {
  event2.preventDefault();
  $('form')[0].reset();
  $('.output, .error, #convert, #other, .symbols').hide();
  $('#currencyChoice, .btn-success, #symbol').show();
});