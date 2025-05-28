$(document).ready(() => {
  let dateFormatter = t => {
    let d = t.split(" ")[0], m = parseInt(d.split("-")[1]) * 3 - 1;
    return `${"--JanFebMarAprMayJunJulAugSepOctNovDec".substring(m, m + 3)} ${d.split("-")[2]}, ${d.split("-")[0]}`
  }
  let storeHandler = _ => {
    let storeId = $('#store-select').select2('data')[0].id;
    $('.price-changes').remove();
    fetch(`./prices-${storeId}.json`)
      .then(r => { return r.json(); })
      .then(r => {
        for (let i = 0; i < r.length; i++) {
          let d = r[i];
          if (d.pafter_date != null) {
            $('<tr>').addClass('price-changes').append(
              $('<td>').text(dateFormatter(d.pafter_date)),
              $('<td>').append(
                $('<a>')
                  .attr('href', `https://traderjoes.com/home/products/pdp/${d.psku}`)
                  .attr('target', '_blank')
                  .text(d.pitem_title)
              ),
              $('<td>').text(d.pbefore_price),
              $('<td>')
                .addClass(d.pbefore_price > d.pafter_price ? 'green' : 'red')
                .text(d.pafter_price)
            ).appendTo('#price-changes');
          }
        }
      });
  };
  $('.dropdown').select2({ width: '70%' });
  $('#store-select').on('select2:select', storeHandler);
  storeHandler();
});