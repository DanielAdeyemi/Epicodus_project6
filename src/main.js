import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Converter from './js/business_logic.js';

function showRate(response, change, number) {
  if (response.result === 'success' && change in response.conversion_rates) {
    $('.output').show();
    return $('.result').text(`${(response.conversion_rates[change] * number)}`);
  } else {
    $('.error').show();
    return (response.result !== 'success') ? $('#errorResult').text(`There was an error: ${Object.values(response)[1]}`) :
      $('#errorResult').text(`There was an error: This type of currency not available right now or you try to input invalid symbol.`);
  }
}

$('#selection').click(function(event3) {
  event3.preventDefault();
  $('#symbol').hide();
  Converter.convert()
    .then(function(response) {
      Object.keys(response.conversion_rates).forEach(key => {
        $("#choose").append(`<option value="${key}">${key}</option>`);
      });
    });
});

$('form').submit(function(event1) {
  event1.preventDefault();
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
  // $('input').text('');
  $('form')[0].reset();
  $('.output, .error, #convert, #other').hide();
  $('#currencyChoice, .btn-success, #symbol').show();
});

// $('.btn-success').click(function(event1) {
//   event1.preventDefault();
//   $('#currencyChoice, .btn-warning').hide();
//   let change;
//   $('#convert').show();
//   // const change = $('#change').val().toUpperCase();
//   // if ($('#choices').val() === 'Other') {
//   //   $('#other').show();
//   //   change = $('#other').val().toUpperCase();
//   // } else {
//   change = $('#choices').val();
//   // }
//   // $('#convert').click(function(event2) {
//   //   event2.preventDefault();
//   //   if (!change) {
//   //     $('.error').show();
//   //     $('p').text('');
//   //     return $('#errorResult').text(`No currency to convert. Please, try again`);
//   //   } else {
//   Converter.convert()
//     .then(function(response) {
//       showRate(response, change);
//     });
// });
// //   });
// // });