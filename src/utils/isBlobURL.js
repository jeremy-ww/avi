export default url => {
  return typeof url === 'string' && url.startsWith('blob')
}
