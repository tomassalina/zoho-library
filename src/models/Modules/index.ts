import axios from 'axios'
import ZohoCRM from '../../core/ZohoCRM'

export default class Modules {
  private zohoCRM: ZohoCRM
  baseUrl = 'https://www.zohoapis.com/crm/v5/settings/modules'

  constructor(zohoCRM: ZohoCRM) {
    this.zohoCRM = zohoCRM
  }

  async get(moduleName: string) {
    if (!this.zohoCRM.accessToken) {
      await this.zohoCRM.authenticate()
    }

    try {
      const response = await axios.get(this.baseUrl, {
        headers: {
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
        },
      })

      return response.data
    } catch (err) {
      console.error(`Error getting modules from Zoho CRM`, err)
      throw new Error(`Failed to get module ${moduleName}`)
    }
  }
}
