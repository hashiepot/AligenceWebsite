// BAR CHART

var barChartOptions = {
  series: [{
    name: '',
    data: [12, 15, 18, 20]
  }],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: [
    "#8F81C7",
    "#C781B3",
    "#C7B381",
    "#CE4C44"
  ],
  plotOptions: {
    bar: {
      distributed: true,
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Total Studying Time', 'Lessons Completed', 'Passed in Graded Quiz', 'Failed in Graded Quiz'],
    labels: {
      show: false
    },
    title: {
      color: '#f5f7ff',
    },
  },
  yaxis: {
    title: {
      text: ''
    }, 
    labels: {
      show: false
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val;
      }
    }
  },
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();


// TIME AND DATE

function updateTimeAndDate() {
  const now = new Date();
  
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString(undefined, options);
  
  document.getElementById('time').textContent = timeString;
  document.getElementById('date').textContent = dateString;
}

updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);

