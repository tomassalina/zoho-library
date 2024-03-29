import axios from 'axios'
import Modules from '../models/Modules'
import Records from '../models/Records'
import Files from '../models/Files'
import { ZohoCRMOptions } from './type'

export default class ZohoCRM {
  private options: ZohoCRMOptions
  public records: Records
  public modules: Modules
  public files: Files
  accessToken: string

  constructor(options: ZohoCRMOptions) {
    this.options = options
    this.modules = new Modules(this)
    this.records = new Records(this)
    this.files = new Files(this)
    this.accessToken = ''
  }

  async authenticate() {
    const endpoint = 'https://accounts.zoho.com/oauth/v2/token'

    try {
      const response = await axios.post(endpoint, null, {
        params: {
          refresh_token: this.options.refreshToken,
          client_id: this.options.clientId,
          client_secret: this.options.clientSecret,
          grant_type: 'refresh_token',
        },
      })
      this.accessToken = response.data.access_token
    } catch (err) {
      console.error('Error authenticating with Zoho CRM', err)
      throw new Error('Authentication failed')
    }
  }
}
