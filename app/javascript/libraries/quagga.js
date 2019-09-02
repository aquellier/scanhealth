import Quagga from 'quagga';
import Rails from 'rails-ujs';

const orderByOccurence = (array) => {
  const counts = {};
  array.forEach((value) => {
    if(!counts[value]){
      counts[value] = 0;
    }
    counts[value]++;
  });
  return Object.keys(counts).sort(() => {
    return counts[curKey] < counts[nextKey];
  })
}

const postBarCode = async (result) => {
    let lastResult = []
    var lastCode = await result.codeResult.code;
    lastResult.push(lastCode);
    Quagga.stop();
    if (lastResult > 20) {
      try {
        const code = await orderByOccurence(lastResult)[0];
        console.log(code);
        const request = await fetch("/products/get_barcode", {
          method: 'post',
          body: JSON.stringify({upc: code}),
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': Rails.csrfToken()
          },
          credentials: 'same-origin'
        });
      } catch(err) {
        console.log(err);
      }
    }
  }

const quaggaInit = () => {

  if (Quagga.initialized == undefined) {
    Quagga.onDetected(postBarCode);
  }

  Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('.video-box')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : [
        "code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "2of5_reader",
        "code_93_reader"
      ]
    }
  },
  function(err) {
      if (err) { console.log(err); return }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      Quagga.initialized = true;
  });
}


export { quaggaInit }
