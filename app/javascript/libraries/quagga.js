import Quagga from 'quagga';
import Rails from 'rails-ujs';
import { openFoodApiCall } from '../components/foodapicall.js';

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
    while (lastResult.length != 13) {
      lastResult.push(lastCode);
    }
      try {
        const code = await orderByOccurence(lastResult)[0];
        const barcodeField = document.getElementById('product_barcode');
        barcodeField.value = code;
        document.querySelector('.slider').classList.add('open-partial');
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
      target: document.querySelector('.video-box'),
      constraints: {
            width: window.innerWidth,
            height: window.innerHeight,
            facing: "environment" // or user
        }    // Or '#yourElement' (optional)
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
