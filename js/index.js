var tokenValue = "IGj9Xm1b1Xw817TL7W7MQFHBSehRh5PlA1XESXuyOvoclflo2IyUaVUyaFTtO7y3kNmQPP779bJln-u2CcmWUV0bTlBNUgMY";//デフォルトのトークン
var tokenValue1 = "jaF8i2mCJi7XJjsyk-bI4d1kHRlDdHZNVsPcDY1DtJULgXU8NdMxSny9aJQk8S-U0FBE7qNoU9a9dwZ9zEz3AP-htQteXY0M"//うらたのデータにアクセスするためのトークン
var apiUrl = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/activity/days"//歩数とかのデータにアクセスできるURL
var apiUrl1 = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/bodycomp/days"//体重とかのデータにアクセスできるURL

//GETでAPIを叩く関数
$(function(){
  $('button#getData').click(function(){   //id,getdataのbuttonを押したら以下の処理を行う
    // 重複実行防止のためにボタンを押せなくする
    if(isNotEmptyForGet()){
      var button = $(this);
      button.attr("disabled",true);
      $.ajax({
        headers: {
          "X-AccessToken" : tokenValue1
        },
        type: "GET",
        dataType: "json",
        url: apiUrl1,
        data: {startDate: $('#startDate').val(), endDate: $('#endDate').val()},         //ここで、health.htmlの記入ボックスからデータをもらってるっぽい。
        success: function(data){
          console.log("GET Success !");
          var results = data.results;
          //console.log(results);
          if(results.length > 0){
            // グラフ描画用変数
            var graphXCategory = [], graphTCal = [], graphBMI = [];       //取得したデータを入れるための配列を定義する。
            var result = $('#resultTable');
            //結果表示領域を一度リセット
            result.empty();
            //結果表示領域に表示するhtmlの作成
            var table = $("<table>").attr("class","table table-striped").appendTo(result);
            var thead = $("<thead>").appendTo(table);
            /*var tr = $("<tr>")
            .append("<th>測定日</th>")
            .append("<th>総消費カロリー</th>")
            .append("<th>歩数</th>")
            .append("<th>中強度運動時間</th>")
            .append("<th>入力区分</th>")
            .append("</tr>")
            .append("</thead>")
            .appendTo(thead);*/               //グラフの上に文字を入れたい時に使用する。
            var tbody = $("<tbody>").appendTo(table);
            for (var i = 0; i < results.length; i++) {
              /*$("<tr>")
              .append("<td>" + results[i].measurementDate + "</td>")
              .append("<td>" + (results[i].totalUsedCalories || "-- ") + "kcal" + "</td>")
              .append("<td>" + (results[i].walkingSteps || "-- ") + "歩" + "</td>")
              .append("<td>" + (results[i].moderateIntensityExerciseMinutes || "-- ") + "分" + "</td>")
              .append("<td>" + (results[i].inputType) + "</td>")
              .appendTo(tbody);*/             //グラフの上に取得したデータを文字で挿入する。
              graphXCategory.push(results[i].measurementDate);//定義した配列にmeasurementDate(観測日付)をかちこむ。ちなみにmeasurementDateはAPIで定義されているもの。
              graphTCal.push(results[i].weight);//定義した配列にwalkingSteps(歩数)をかちこむ。APIの仕様書にある、プロパティ名を変更することで、取得するデータを変更可能。
              graphBMI.push(results[i].bmi);//ここはbmiをかちこんでるところ。
          }
            drawGraph1(graphXCategory,graphTCal);//体重を描画する関数。
            //drawGraph2(graphXCategory,graphBMI);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
        },
        complete: function(){
          button.attr("disabled",false);
        }
      });
    }
  });
});

// グラフ描画関数（highcharts.js）
function drawGraph1(xCategory, tCal) {       //graphXCategoryをxCategoryにgraphTCalをtCalにかちこむ
  $('div#resultGraph').highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {    //図のタイトル
      text: '体重'
    },
    xAxis: [{   //x軸について
      categories: xCategory,    //データをかちこむ。
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}kg',      //y軸のラベルについて
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: '体重',             //凡例のタイトル
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      }
    }],
    tooltip: {
      shared: true
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
      name: '体重',
      type: 'spline',
      data: tCal,       //データをかちこむ
      tooltip: {
        valueSuffix: ' kg'
      }
    }]
  });
}


function isNotEmptyForGet(){
  var errMes = "";
  if($('#startDate').val() == "" || $('#endDate').val() == ""){
    errMes += "未入力項目があります。"
    var feedback = $('span#feedbackForGet');
    feedback.empty();
    feedback.append(errMes);
    return false;
  }
  return true;
}
