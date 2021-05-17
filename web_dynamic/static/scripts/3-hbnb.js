$(document).ready(function () {
  const checkedAmenities = {};
  const checkboxes = $('input');
  const initialText = $('DIV.amenities h4').text();
  for (const box of checkboxes) {
    box.addEventListener('change', function () {
      if (box.checked) {
        checkedAmenities[$(box).data('id')] = $(box).data('name');
      } else {
        delete checkedAmenities[$(box).data('id')];
      }
      const checkedList = Object.values(checkedAmenities);
      if (checkedList.length < 1) {
        checkedList.push(initialText);
      }
      $('DIV.amenities h4').text(checkedList.join(', '));
    });
  }
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('avalable');
  }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (const place of data) {
      const holder = '<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div></div><div class="description">' + place.description + '</div></article>';
      $(holder).appendTo('SECTION.places');
    }
  }
});
