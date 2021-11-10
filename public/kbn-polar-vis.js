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

import { i18n } from '@osd/i18n';
import { AggGroupNames } from '../../../src/plugins/data/public';
import { Schemas } from '../../../src/plugins/vis_default_editor/public';

import tableVisTemplate from './kbn-polar-vis.html';
import { getKbnPolarVisualizationController } from './vis_controller';
import { kbnPolarRequestHandler } from './data_load/kbn-polar-request-handler';
import { kbnPolarResponseHandler } from './data_load/kbn-polar-response-handler';
import { KbnPolarOptions } from './components/kbn_polar_vis_options_lazy';
import { VIS_EVENT_TO_TRIGGER } from '../../../src/plugins/visualizations/public';
import './index.scss'
import image from './images/icon-polar.svg';


// define the visType object, which kibana will use to display and configure new Vis object of this type.
export function kbnPolarVisTypeDefinition(core, context) {
  return {
    type: 'polar',
    name: 'kbn_polar',
    title: i18n.translate('visTypeKbnPolar.visTitle', {
      defaultMessage: 'Polar'
    }),
    icon: image,
    description: i18n.translate('visTypeKbnPolar.visDescription', {
      defaultMessage: 'Visualize Polar charts'
    }),
    visualization: getKbnPolarVisualizationController(core, context),
    getSupportedTriggers: () => {
      return [VIS_EVENT_TO_TRIGGER.filter];
    },
    visConfig: {
      defaults: {},
      template: tableVisTemplate
    },
    editorConfig: {
      optionsTemplate: KbnPolarOptions,
      schemas: new Schemas([
        {
          group: AggGroupNames.Metrics,
          name: 'metric',
          title: 'Metric',
          aggFilter: ['!geo_centroid', '!geo_bounds'],
          aggSettings: {
            top_hits: {
              allowStrings: false
            }
          },
          max: 1,
          min: 1,
          defaults: [{ type: 'count', schema: 'metric' }]
        },
        {
          group: AggGroupNames.Buckets,
          name: 'field',
          title: "Field",
          min: 1,
          max: 1,
          aggFilter: ['terms', 'filters']
        }
      ])
    },
    implementsRenderComplete: true,
    requestHandler: kbnPolarRequestHandler,
    responseHandler: kbnPolarResponseHandler,
    hierarchicalData: (vis) => {
      return true;
    }
  };
}
