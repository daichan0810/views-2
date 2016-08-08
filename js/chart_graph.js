$(function () {

//タブ切り替え
    $('#tab-switch a').on('click', function() {
		$('#tab-contents > div').hide();
		$($(this).attr('href')).show();
		return false;
	});

//体重グラフ
    $('#graph_w').highcharts({
      chart: {
        width:500,
        heigth:300
      },
      title: {
        text: '体重推移',
        x: -20 //center
      },
      subtitle: {
        text: 'Weekly',
        x: -20
      },
      xAxis: {
        categories: ['0801', '0802', '0803', '0804', '0805', '0806',
          '0807']
      },
      yAxis: {
        title: {
          text: '体重(kg)'
        },
        plotLines: [{
          value: 0,
          width: 1,
        }],
        plotBands: [{ // visualize the weekend
                from: 50,
                to: 51,
                color: 'rgba(68, 170, 213, .2)',
            }]
      },
      tooltip: {
        valueSuffix: 'kg'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
      },
      series: [{
        name: '体重',
        color: '#0000FF',
        data: [51.0, 51.1, 50.2, 49.6, 49.0, 50.1, 50.5]
      }
      ]
    });

//BMIグラフ
    $('#graph_b').highcharts({
      chart: {
        width:500,
        heigth:300
      },
      title: {
        text: 'bmi推移',
        x: -20 //center
      },
      subtitle: {
        text: 'Weekly',
        x: -20
      },
      xAxis: {
        categories: ['0801', '0802', '0803', '0804', '0805', '0806',
          '0807']
      },
      yAxis: {
        title: {
          text: 'BMI'
        },
        plotLines: [{
          value: 0,
          width: 1,
        }],
        plotBands: [{ // visualize the weekend
                from: 19,
                to: 20,
                color: 'rgba(68, 170, 213, .2)',
            }]
      },
      tooltip: {
        valueSuffix: 'kg'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
      },
      series: [{
        name: 'BMI',
        color: '#66CC00',
        data: [22.0, 21.1, 20.2, 19.6, 19.0, 20.1, 20.5]
      }
      ]
    });
  });
