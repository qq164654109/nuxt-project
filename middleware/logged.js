export default ({ store, redirect }) => {
  if (store.state.user.token) {
    return redirect('/');
  }
}