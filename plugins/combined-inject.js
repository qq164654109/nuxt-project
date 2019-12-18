import _get from 'lodash/get';
import { fmtTime } from '~/utils/date';

export default (ctx, inject) => {
  inject('val', _get);
  inject('time', fmtTime);
}