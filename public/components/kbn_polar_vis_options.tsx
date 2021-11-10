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

import { some } from 'lodash';
import React, { useEffect } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@kbn/osd/react';
import { EuiButtonEmpty, EuiDragDropContext, euiDragDropReorder, EuiDroppable, EuiFlexGroup, EuiFlexItem, EuiFormErrorText, EuiIconTip, EuiPanel, EuiSpacer, EuiTitle } from '@elastic/eui';

import { IAggConfigs } from '../../../../src/plugins/data/public';
import { VisOptionsProps } from '../../../../src/plugins/vis_default_editor/public';
import { NumberInputOption, SelectOption } from '../../../../src/plugins/charts/public';
import { SwitchOption } from './switch';
import { TextInputOption } from './text_input';
import { totalAggregations, AggTypes } from './utils';
import { array } from 'fp-ts';


export interface KbnPolarVisParams {
  type: 'polar';
}

function KbnPolarOptions({
  stateParams,
  setValue,
}: VisOptionsProps<KbnPolarVisParams>) {

  return (
    <div className="kbn-polar-vis-params">

    </div>
  );
}

// default export required for React.Lazy
// eslint-disable-next-line import/no-default-export
export { KbnPolarOptions as default };