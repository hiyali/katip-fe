export default {
  email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
  password: value => value.length >= 6,
  webImage: value => /^(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+\/[\w-/]+\.(png|jpg|jpeg|webm)$/i.test(value)
}
