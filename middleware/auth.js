export default ({ store, redirect, route }) => {
  if (!store.state.user.token) {
    return redirect({
      path: '/login',
      query: {
        redirect: route.path
      }
    });
  }
}