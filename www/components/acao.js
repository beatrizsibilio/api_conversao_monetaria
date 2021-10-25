window.onload = function(){
  
  const converter = document.querySelector("#converter");
  

  extrairIso = function(nomeMoeda){
    const iso = nomeMoeda.split(" - ");
    return iso[1];
  }

  conversao = function(cotacao, valor, moedaConvertidaIso){
    var moeda;

    if(moedaConvertidaIso == "USD"){
      moeda = " dólar(es)";
    }else if(moedaConvertidaIso == "EUR"){
      moeda = " euro(s)";
    }else if(moedaConvertidaIso == "ARS"){
      moeda = " peso(s) argentino(s)";
    }else if(moedaConvertidaIso == "JPY"){
      moeda = " iene(s)";
    }else{
      moeda = " dólares canadenses";
    }

    function retorno(){

    }

    valorConvertido = valor / cotacao;

    navigator.notification.alert("Você tem "+ parseFloat(valorConvertido.toFixed(2))+ moeda, retorno, "Valor convertido");
  }

  converter.addEventListener("click", function(iso){
    const moedaConvertida = document.getElementById("moedaConvertida").value;
    const moedaConvertidaIso = extrairIso(moedaConvertida);
    const valor = document.getElementById("valor").value;

    const opcoes = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }
    
    const url = "https://api.hgbrasil.com/finance";

    fetch(url, opcoes)
      .then(response => {response.json()
        .then(data => {
          var sell = data['results']['currencies'][moedaConvertidaIso]['sell'];
          var buy = data['results']['currencies'][moedaConvertidaIso]['buy']

          if( sell == null){
            var cotacao = buy;
          }else{
            var cotacao = sell;
          }
          
          conversao(cotacao, valor, moedaConvertidaIso);
        })
      });
  });
}