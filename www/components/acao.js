window.onload = function(){
  var imgReais = "./img/real.jpg", imgDolar = "./img/dolar.jpg", imgCanada = "./img/dolarCanada.jpg", imgEuro = "./img/euro.jpg", imgArgentina = "./img/pesoArgentina.jpg", imgIene = "./img/iene.jpeg";
  
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

    valorConvertido = valor / cotacao;
    alert("Você tem "+ parseFloat(valorConvertido.toFixed(2))+ moeda);
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
          if(data['results']['currencies'][moedaConvertidaIso]['sell'] == null){
            var cotacao = data['results']['currencies'][moedaConvertidaIso]['buy'];
          }else{
            var cotacao = data['results']['currencies'][moedaConvertidaIso]['sell'];
          }
          conversao(cotacao, valor, moedaConvertidaIso);
        })
      });
  });
}