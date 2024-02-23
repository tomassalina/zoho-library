import fs from 'fs'
import axios from 'axios'
import ZohoCRM from '../../core/ZohoCRM'
import FormData from 'form-data'
import { UploadFileOptions } from './type'

export default class Files {
  private zohoCRM: ZohoCRM
  private baseUrl = 'https://www.zohoapis.com/crm/v5/files'

  constructor(zohoCRM: ZohoCRM) {
    this.zohoCRM = zohoCRM
  }

  async upload(options: UploadFileOptions) {
    const { filePath, isImage } = options

    if (!filePath) throw new Error('"filePath" is required.')
    if (!this.zohoCRM.accessToken) await this.zohoCRM.authenticate()

    const formData = new FormData()
    formData.append('file', fs.createReadStream(filePath))

    if (isImage) formData.append('type', 'inline')

    try {
      return await axios.post(this.baseUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Zoho-oauthtoken ${this.zohoCRM.accessToken}`,
          scope: `ZohoCRM.Files.CREATE`,
        },
      })
    } catch (err: any) {
      console.error(`Error uploading file.`, err)
      throw new Error('Failed to upload file.')
    }
  }
}
