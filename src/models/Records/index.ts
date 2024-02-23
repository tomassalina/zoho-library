import axios from 'axios'
import ZohoCRM from '../../core/ZohoCRM'

import { validate } from './utils/validate'
import { paramBuilder } from './utils/paramBuilder'

import {
  GetRecordOptions,
  GetRecordsOptions,
  SearchRecordsOptions,
  CreateRecordOptions,
} from './type'

export default class Records {
  private zohoCRM: ZohoCRM
  private baseUrl = 'https://www.zohoapis.com/crm'

  constructor(zohoCRM: ZohoCRM) {
    this.zohoCRM = zohoCRM
  }

  async getOne(options: GetRecordOptions) {
    const { moduleName, recordId } = options

    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()
    validate.getOneMethod(options)

    const params = paramBuilder.createGetOneParams(options)
    const endpoint = `${this.baseUrl}/v5/${moduleName}/${recordId}`

    try {
      return await axios.get(endpoint, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
        params,
      })
    } catch (err: any) {
      console.error(
        `Error fetching record ${recordId} from module ${moduleName}`,
        err.response?.data
      )
      throw new Error(`Failed to fetch record ${recordId}`)
    }
  }

  async getAll(options: GetRecordsOptions) {
    const { moduleName } = options

    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()
    validate.getAllMethod(options)

    const params = paramBuilder.createGetAllParams(options)
    const endpoint = `${this.baseUrl}/v5/${moduleName}`

    try {
      return await axios.get(endpoint, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
        params,
      })
    } catch (err: any) {
      console.error(
        `Error fetching records from module ${moduleName}`,
        err.response?.data
      )
      throw new Error(`Failed to fetch records from module ${moduleName}`)
    }
  }

  async search(options: SearchRecordsOptions) {
    const { moduleName } = options

    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()
    validate.seachMethod(options)

    const params = paramBuilder.createSearchParams(options)
    const endpoint = `${this.baseUrl}/v3/${moduleName}/search`

    try {
      return await axios.get(endpoint, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
        params,
      })
    } catch (err: any) {
      console.error(
        `Error searching records from module ${moduleName}`,
        err.response?.data
      )
      throw new Error(`Failed to search records from module ${moduleName}`)
    }
  }

  async create(options: CreateRecordOptions) {
    const { moduleName, data } = options

    if (!this.zohoCRM.accessToken) {
      await this.zohoCRM.authenticate()
    }

    const endpoint = `${this.baseUrl}/v5/${moduleName}`
    try {
      return await axios.post(
        endpoint,
        { data },
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
          },
        }
      )
    } catch (err: any) {
      console.error(
        `Error creating records for the ${moduleName} module`,
        err.response?.data
      )
      throw new Error('Failed to create record.')
    }
  }
}
