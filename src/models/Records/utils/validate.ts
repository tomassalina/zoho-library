import {
  BulkUpdateRecordsOptions,
  DeleteRecordsOptions,
  GetRecordOptions,
  GetRecordsOptions,
  SearchRecordsOptions,
  UpdateRecordOptions,
} from '../type'

const getOneMethod = (options: GetRecordOptions) => {
  const { moduleName, recordId, fields } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (!recordId) throw new Error('"recordId" is required.')
  if (fields && fields.length > 50)
    throw new Error('Cannot request more than 50 "fields".')
}

const getAllMethod = (options: GetRecordsOptions) => {
  const { moduleName, fields, ids } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (!Array.isArray(fields) || fields.length === 0)
    throw new Error('The "fields" parameter must be a non-empty array.')
  if (fields.length > 50)
    throw new Error('Cannot request more than 50 "fields".')
  if (ids && !Array.isArray(ids))
    throw new Error('"ids" parameter must be an array.')
}

const seachMethod = (options: SearchRecordsOptions) => {
  const { moduleName, criteria, fields } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (criteria && !Array.isArray(criteria))
    throw new Error('"criteria" parameter must be an array')
  if (fields && !Array.isArray(fields))
    throw new Error('"fields" parameter must be an array')
}

const updateMethod = (options: UpdateRecordOptions) => {
  const { moduleName, recordId, data } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (!recordId) throw new Error('"recordId" is required.')
  if (!data) throw new Error('"data" is required.')
  if (typeof data !== 'object' || Array.isArray(data))
    throw new Error('"data" must be an object.')
}

const bulkUpdateMethod = (options: BulkUpdateRecordsOptions) => {
  const { moduleName, data } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (!data.every(record => record.id))
    throw new Error('All objects in "data" must have an id.')
}

const deleteMethod = (options: DeleteRecordsOptions) => {
  const { moduleName, ids } = options

  if (!moduleName) throw new Error('"moduleName" is required.')
  if (!Array.isArray(ids) || ids.length === 0)
    throw new Error('"ids" is required and must be a non-empty array.')
}

export const validate = {
  getOneMethod,
  getAllMethod,
  seachMethod,
  updateMethod,
  bulkUpdateMethod,
  deleteMethod,
}
