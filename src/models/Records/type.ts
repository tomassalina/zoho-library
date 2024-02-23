export interface GetRecordOptions {
  moduleName: string
  recordId: string
  fields?: string[]
}

export interface GetRecordsOptions {
  moduleName: string
  fields: string[]
  ids?: string[]
  page?: number
  perPage?: number
  pageToken?: string
  sortOrder?: 'asc' | 'desc'
  sortBy?: 'id' | 'Created_Time' | 'Updated_Time'
}

export interface GetRecordsParams {
  fields: string
  ids?: string
  page?: number
  per_page?: number
  page_token?: string
  sort_order?: 'asc' | 'desc'
  sort_by?: 'id' | 'Created_Time' | 'Updated_Time'
}
