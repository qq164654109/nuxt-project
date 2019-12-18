import axios from 'axios';

export default ({ store }) => {
  store.state.fetchSource.cancel && store.state.fetchSource.cancel()
  store.commit('setFetchSource', axios.CancelToken.source());
}