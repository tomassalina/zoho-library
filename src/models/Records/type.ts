// GET RECORD
export interface GetRecordOptions {
  moduleName: string
  recordId: string
  fields?: string[]
}

// GET RECORDS
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

// SEARCH RECORDS
export interface SearchRecordsOptions {
  moduleName: string
  criteria?: string[]
  email?: string
  phone?: string
  word?: string
  fields?: string[]
  page?: number
  perPage?: number
}
export interface SearchRecordsParams {
  criteria?: string
  email?: string
  phone?: string
  word?: string
  fields?: string
  page?: number
  per_page?: number
}

// CREATE RECORD
export interface CreateRecordOptions {
  moduleName: string
  data: Array<object>
}

// UPDATE RECORDS
export interface UpdateRecordOptions {
  moduleName: string
  recordId: string
  data: Array<object>
}
type RecordUpdate = {
  id: string
  [key: string]: any
}
export interface BulkUpdateRecordsOptions {
  moduleName: string
  data: RecordUpdate[]
}

// DELETE RECORDS
export interface DeleteRecordsOptions {
  moduleName: string
  ids: string[]
}

// UPSERT RECORDS
export interface UpsertRecordsOptions {
  moduleName: string
  data: Array<object>
}

// GET DELETED RECORDS
export interface GetDeletedRecordsOptions {
  moduleName: string
  type?: 'all' | 'recycle' | 'permanent'
  page?: number
  perPage?: number
}
export interface GetDeletedRecordsParams {
  type?: 'all' | 'recycle' | 'permanent'
  page?: number
  per_page?: number
}

// GET COUNT OF RECORDS
export interface GetCountInModuleOptions {
  moduleName: string
  criteria?: string[]
  email?: string
  phone?: string
  word?: string
}
export interface GetCountInModuleParams {
  criteria?: string
  email?: string
  phone?: string
  word?: string
}

// GET TIMELINE
export interface GetTimelineOptions {
  moduleName: string
  recordId: string
  perPage: number
  pageToken: string
}
export interface GetTimelineParams {
  per_page?: number
  page_token?: string
}
