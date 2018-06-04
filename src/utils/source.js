import axios from 'axios'

const CancelToken = axios.CancelToken

export default CancelToken.source.bind(CancelToken)
