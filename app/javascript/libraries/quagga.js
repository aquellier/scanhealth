import Quagga from 'quagga';
import Rails from 'rails-ujs';
import { openFoodApiCall } from '../components/foodapicall.js';

const postBarCode = async (result) => {
  let lastResult = []
  var lastCode = await result.codeResult.code;
  while (lastResult.length != 13) {
    lastResult.push(lastCode);
  }
  Quagga.stop();
    try {
      const code = await orderByOccurence(lastResult)[0];
      console.log(code);
      const barcodeField = document.getElementById('product_barcode');
      barcodeField.value = code;
      openFoodApiCall(code);
    } catch(err) {
      console.log(err);
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
        "ean_reader"
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
