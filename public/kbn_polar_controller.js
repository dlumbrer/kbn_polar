import { AggResponseTabifyProvider } from 'ui/agg_response/tabify/tabify';
import { uiModules } from 'ui/modules';
import { assign } from 'lodash';

// get the kibana/kbn_polar module, and make sure that it requires the "kibana" module if it
// didn't already
const module = uiModules.get('kibana/kbn_polar', ['kibana']);

// add a controller to tha module, which will transform the esResponse into a
// tabular format that we can pass to the table directive
module.controller('KbnPolarVisController', function ($scope, $element, $timeout, Private) {
  const tabifyAggResponse = Private(AggResponseTabifyProvider);

  const uiStateSort = ($scope.uiState) ? $scope.uiState.get('vis.params.sort') : {};
  assign($scope.vis.params.sort, uiStateSort);

  var Chartjs = require('chart.js');

  const randomColor = require('randomcolor');

  $scope.$watchMulti(['esResponse'], function ([resp]) {
    if($scope.polarchart){
      $scope.polarchart.destroy()
    }

    if(resp){
      var id_firstfield = '0'
      var id_secondfield;
      var id_x = '1'
      var id_y = '2'
      var id_size = '3'
      var dicColor = {}
      //Names of the field that have been selected
      if ($scope.vis.aggs.bySchemaName['field']) {
        var firstFieldAggId = $scope.vis.aggs.bySchemaName['field'][0].id;
        var fieldAggName = $scope.vis.aggs.bySchemaName['field'][0].params.field.displayName;
      }


      // Retrieve the metrics aggregation configured
      if($scope.vis.aggs.bySchemaName['metric']){
        var metricsAgg_xAxis = $scope.vis.aggs.bySchemaName['metric'][0];
        if ($scope.vis.aggs.bySchemaName['metric'][0].type.name != "count"){
          var metricsAgg_xAxis_name = $scope.vis.aggs.bySchemaName['metric'][0].params.field.displayName;
        }else{
          var metricsAgg_xAxis_name = ""
        }
        var metricsAgg_xAxis_title = $scope.vis.aggs.bySchemaName['metric'][0].type.title
      }


      var labels = []
      var dataParsed = [];
      for (let index = 0; index < resp.tables[0].rows.length; index++) {
        const bucket = resp.tables[0].rows[index];
        labels.push(bucket[0])
        dataParsed.push(bucket[1])
      }
      var colors = randomColor({ hue: 'random', luminosity: 'bright', count: 200 });
      var dataComplete = {
        datasets: [{
          data: dataParsed,
          backgroundColor: colors //["rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(255, 205, 86)", "rgb(201, 203, 207)", "rgb(54, 162, 235)"]
        }],
        labels: labels
      }
    }

    $timeout(function () {
      //DOM has finished rendering
      var canvas = document.getElementById('polar_chart_' + $scope.$id);
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var options = {
        legend: {
          display: false
        }
      }

      $scope.polarchart = new Chartjs(ctx, {
        data: dataComplete,
        type: 'polarArea',
        options: options
      });
    });



  });
});
