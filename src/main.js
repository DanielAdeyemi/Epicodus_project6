import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Converter from './js/business_logic.js';

function showRate(response, change) {
  if (response.result === 'success') {
    return $('.result').text((change in response.conversion_rates) ?
      (`${(response.conversion_rates[change])}`) :
      (`There was an error: This type of currency not available right now.`));
  } else {
    $('.error').text(`There was an error: ${Object.values(response)[1]}`);
  }
}

$('#convert').click(function(event) {
  event.preventDefault();
  const change = $('#change').val().toUpperCase();
  Converter.convert()
    .then(function(response) {
      showRate(response, change);
    });
});