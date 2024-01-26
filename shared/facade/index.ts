import axios from 'axios'
import { HOST } from '../constants'

axios.defaults.baseURL = HOST

export default axios