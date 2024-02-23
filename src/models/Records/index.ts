import axios from 'axios'
import ZohoCRM from '../../core/ZohoCRM'
import { GetRecordOptions, GetRecordsOptions, GetRecordsParams } from './type'

export default class Records {
  private zohoCRM: ZohoCRM
  private baseUrl = 'https://www.zohoapis.com/crm'

  constructor(zohoCRM: ZohoCRM) {
    this.zohoCRM = zohoCRM
  }

  async getOne(options: GetRecordOptions) {
    const { moduleName, recordId, fields } = options

    if (!moduleName) throw new Error('"moduleName" is required.')
    if (!recordId) throw new Error('"recordId" is required.')
    if (fields && fields.length > 50)
      throw new Error('Cannot request more than 50 "fields".')

    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()

    const endpoint = `${this.baseUrl}/v5/${moduleName}/${recordId}`

    try {
      return await axios.get(endpoint, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
        params: {
          fields: fields?.join(','),
        },
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
    const {
      moduleName,
      fields,
      ids,
      page,
      perPage,
      pageToken,
      sortOrder,
      sortBy,
    } = options

    if (!moduleName) throw new Error('"moduleName" is required.')
    if (!Array.isArray(fields) || fields.length === 0)
      throw new Error('The "fields" parameter must be a non-empty array.')
    if (fields.length > 50)
      throw new Error('Cannot request more than 50 "fields".')

    const params: GetRecordsParams = { fields: fields.join('') }

    if (ids) params.ids = ids.join(',')
    if (page) params.page = options.page
    if (perPage && perPage <= 200) params.per_page = perPage
    else params.per_page = 200
    if (pageToken) params.page_token = pageToken
    if (sortOrder) params.sort_order = sortOrder
    if (sortBy) params.sort_by = sortBy

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
}
