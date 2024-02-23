import axios from 'axios'
import ZohoCRM from '../../core/ZohoCRM'
import {
  GetRecordOptions,
  GetRecordsOptions,
  GetRecordsParams,
  SearchRecordsOptions,
  SearchRecordsParams,
} from './type'
import {
  validateGetRecordOptions,
  validateGetRecordsOptions,
  validateSearchOptions,
} from './utils/validations'
import {
  createGetRecordParams,
  createGetRecordsParams,
  createSearchParams,
} from './utils/createParams'

export default class Records {
  private zohoCRM: ZohoCRM
  private baseUrl = 'https://www.zohoapis.com/crm'

  constructor(zohoCRM: ZohoCRM) {
    this.zohoCRM = zohoCRM
  }

  async getOne(options: GetRecordOptions) {
    const { moduleName, recordId, fields } = options

    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()
    validateGetRecordOptions(options)

    const params = createGetRecordParams(options)
    const endpoint = `${this.baseUrl}/v5/${moduleName}/${recordId}`

    try {
      return await axios.get(endpoint, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
        params,
      })
    } catch (err) {
      console.error(
        `Error fetching record ${recordId} from module ${moduleName}`,
        err
      )
      throw new Error(`Failed to fetch record ${recordId}`)
    }
  }

  async getAll(options: GetRecordsOptions) {
    const { moduleName } = options

    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()
    validateGetRecordsOptions(options)

    const params = createGetRecordsParams(options)
    const endpoint = `${this.baseUrl}/v5/${moduleName}`

    try {
      return await axios.get(endpoint, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
        params,
      })
    } catch (err) {
      console.error(`Error fetching records from module ${moduleName}`, err)
      throw new Error(`Failed to fetch records from module ${moduleName}`)
    }
  }

  async search(options: SearchRecordsOptions) {
    const { moduleName } = options

    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()
    validateSearchOptions(options)

    const params = createSearchParams(options)
    const endpoint = `${this.baseUrl}/v3/${moduleName}/search`

    try {
      return await axios.get(endpoint, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
        params,
      })
    } catch (err) {
      console.error(`Error searching records from module ${moduleName}`, err)
      throw new Error(`Failed to search records from module ${moduleName}`)
    }
  }
}
