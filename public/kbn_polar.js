import 'plugins/kbn_polar/kbn_polar.less';
import 'plugins/kbn_polar/kbn_polar_controller';
import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';
import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';
import PolarVisTemplate from 'plugins/kbn_polar/kbn_polar.html';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import image from './images/polar.svg';
// we need to load the css ourselves

// we also need to load the controller and used by the template

// our params are a bit complex so we will manage them with a directive

// require the directives that we use as well

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(PolarVisTypeProvider);

// define the PolarVisType
function PolarVisTypeProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const Schemas = Private(VisSchemasProvider);

  // define the PolarVisController which is used in the template
  // by angular's ng-controller directive

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return VisFactory.createAngularVisualization({
    name: 'polar',
    title: 'Polar',
    image,
    description: 'Display values in a polar chart',
      category: CATEGORY.BASIC,
    visConfig: {
      template: PolarVisTemplate
    },
    editorConfig: {
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          aggFilter: '!geo_centroid',
          min: 1,
          max: 1
        },
        {
          group: 'buckets',
          name: 'field',
          title: 'Field',
          max: 1,
          min: 1,
          aggFilter: ['terms']
        }
      ])
    },
    implementsRenderComplete: true,
    hierarchicalData: function (vis) {
      return true;
    }

  });
}

export default PolarVisTypeProvider;
