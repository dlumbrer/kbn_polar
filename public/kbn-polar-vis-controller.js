/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import _ from 'lodash';

import randomColor from 'randomcolor';
import Chartjs from 'chart.js'

import AggConfigResult from './data_load/agg_config_result';
import { getNotifications, getFormatService } from './services';

// KbnPolarVis AngularJS controller
function KbnPolarVisController($scope, config, $timeout) {

  $scope.$watchMulti(['esResponse'], function ([resp]) {
    if ($scope.polarchart) {
      $scope.polarchart.destroy()
    }

    if (resp) {
      //Names of the field that have been selected
      if (resp.aggs.bySchemaName('field')) {
        var firstFieldAggId = resp.aggs.bySchemaName('field')[0].id;
        var fieldAggName = resp.aggs.bySchemaName('field')[0].params.field.displayName;
      }


      // Retrieve the metrics aggregation configured
      if (resp.aggs.bySchemaName('metric')) {
        var metricsAgg_xAxis = resp.aggs.bySchemaName('metric')[0];
        if (resp.aggs.bySchemaName('metric')[0].type.name != "count") {
          var metricsAgg_xAxis_name = resp.aggs.bySchemaName('metric')[0].params.field.displayName;
        } else {
          var metricsAgg_xAxis_name = ""
        }
        var metricsAgg_xAxis_title = resp.aggs.bySchemaName('metric')[0].type.title
      }


      var labels = []
      var dataParsed = [];
      for (let index = 0; index < resp.tables[0].rows.length; index++) {
        const bucket = resp.tables[0].rows[index];
        labels.push(bucket[0].value)
        dataParsed.push(bucket[1].value)
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
}

export { KbnPolarVisController };