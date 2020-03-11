import { uiModules } from 'ui/modules';
import { assign } from 'lodash';

// get the kibana/kbn_polar module, and make sure that it requires the "kibana" module if it
// didn't already
const module = uiModules.get('kibana/kbn_polar', ['kibana']);

// add a controller to tha module, which will transform the esResponse into a
// tabular format that we can pass to the table directive
module.controller('KbnPolarVisController', function ($scope, $element, $timeout, Private) {
  const uiStateSort = ($scope.uiState) ? $scope.uiState.get('vis.params.sort') : {};
  assign($scope.vis.params.sort, uiStateSort);

  var Chartjs = require('chart.js');

  const randomColor = require('randomcolor');

  $scope.$watchMulti(['esResponse'], function ([resp]) {
    if($scope.polarchart){
      $scope.polarchart.destroy()
    }

    if(resp){
      //Names of the field that have been selected
      if ($scope.vis.aggs.bySchemaName['field']) {
        var firstFieldAggId = $scope.vis.aggs.bySchemaName['field'][0].id;
        var fieldAggName = $scope.vis.aggs.bySchemaName['field'][0].params.field.displayName;
      }


      // Retrieve the metrics aggregation configured
      if($scope.vis.aggs.bySchemaName['metric']){
        var metricsAgg_xAxis = $scope.vis.aggs.bySchemaName['metric'][0];
        var id_metric = $scope.vis.aggs.bySchemaName['metric'][0].id;
        if ($scope.vis.aggs.bySchemaName['metric'][0].type.name != "count"){
          var metricsAgg_xAxis_name = $scope.vis.aggs.bySchemaName['metric'][0].params.field.displayName;
        }else{
          var metricsAgg_xAxis_name = ""
        }
        var metricsAgg_xAxis_title = $scope.vis.aggs.bySchemaName['metric'][0].type.title
      }

      // Get col ids
      let col_id_firstfield, col_id_metric;
      resp.columns.forEach(e => {
        if (id_metric === e.aggConfig.id){
          col_id_metric = e.id
        }else if (firstFieldAggId === e.aggConfig.id){
          col_id_firstfield = e.id
        }
      });

      var labels = []
      var dataParsed = [];
      for (let index = 0; index < resp.rows.length; index++) {
        const bucket = resp.rows[index];
        labels.push(bucket[col_id_firstfield])
        dataParsed.push(bucket[col_id_metric])
      }
      var colors = randomColor({ hue: 'random', luminosity: 'bright', count: 200 });
      var dataComplete = {
        datasets: [{
          data: dataParsed,
          backgroundColor: colors
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
