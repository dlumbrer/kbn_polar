import { AggResponseTabifyProvider } from 'ui/agg_response/tabify/tabify';
import { uiModules } from 'ui/modules';
import { assign } from 'lodash';

// get the kibana/kbn_polar module, and make sure that it requires the "kibana" module if it
// didn't already
const module = uiModules.get('kibana/kbn_polar', ['kibana']);

// add a controller to tha module, which will transform the esResponse into a
// tabular format that we can pass to the table directive
module.controller('KbnPolarVisController', function ($scope, $element, Private) {
  const tabifyAggResponse = Private(AggResponseTabifyProvider);

  const uiStateSort = ($scope.uiState) ? $scope.uiState.get('vis.params.sort') : {};
  assign($scope.vis.params.sort, uiStateSort);

  var Chartjs = require('chart.js');

  //const randomColor = require('randomcolor');

  $scope.$watchMulti(['esResponse'], function ([resp]) {

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



      var dataParsed = resp.tables[0].rows.map(function(bucket) {

      });
    }
    var ctx = document.getElementById("myChart").getContext('2d');
    var dataExample = {
      datasets: [{
        data: [10, 20, 30]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    };

    new Chart(ctx, {
      data: dataExample,
      type: 'polarArea'
      //options: options
    });

  });
});
