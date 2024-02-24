# zoho-library

A sleek and powerful library to effortlessly bridge Node.js with Zoho CRM, featuring easy OAuth handling, seamless CRUD operations, and comprehensive management of contacts, leads, and more.

## Getting Started

To use `zoho-library`, start by installing the package in your Node.js project:

```bash
npm install zoho-library
```

Next, initialize the library with your Zoho CRM credentials:

```javascript
const { ZohoCRM } = require('zoho-library')

const zoho = new ZohoCRM({
  clientId: '<YOUR_CLIENT_ID>',
  clientSecret: '<YOUR_CLIENT_SECRET>',
  refreshToken: '<YOUR_REFRESH_TOKEN>',
})
```

Authenticate with Zoho CRM:

```javascript
zoho.authenticate()
  .then(() => console.log('Authentication successful!');)
  .catch((error) => console.error('Authentication failed:', error););
```

You can obtain your Zoho CRM credentials (Client ID, Client Secret, and Refresh Token) by following the instructions on the [Zoho API documentation.](https://www.zoho.com/crm/developer/docs/api/v5/)

## Examples

Here are some examples of what you can do with zoho-library:

### Modules

```javascript
// Get all modules
zoho.modules.get()
```

### Records

```javascript
// Get a single record
zoho.records.getOne({
  moduleName: string
  recordId: string
  fields?: string[]
})

// Get all records
zoho.records.getAll({
  moduleName: string
  fields: string[]
  ids?: string[]
  page?: number
  perPage?: number
  pageToken?: string
  sortOrder?: 'asc' | 'desc'
  sortBy?: 'id' | 'Created_Time' | 'Updated_Time'
})

// Search records
zoho.records.search({
  moduleName: string
  criteria?: string[]
  email?: string
  phone?: string
  word?: string
  fields?: string[]
  page?: number
  perPage?: number
})

// Create a new record
zoho.records.create({
  moduleName: string
  data: object[]
})

// Update a record
zoho.records.update({
  moduleName: string
  recordId: string
  data: Array<object>
})

// Bulk update records
zoho.records.bulkUpdate({
  moduleName: string
  data: RecordUpdate[]
})

// Delete a record
zoho.records.delete({
  moduleName: string
  ids: string[]
})

// Upsert a record
zoho.records.upsert({
  moduleName: string
  data: Array<object>
})

// Get deleted records
zoho.records.getDeleted({
  moduleName: string
  type?: 'all' | 'recycle' | 'permanent'
  page?: number
  perPage?: number
})

// Get record count in a module
zoho.records.getCountInModule({
  moduleName: string
  criteria?: string[]
  email?: string
  phone?: string
  word?: string
})

// Get record timeline
zoho.records.getTimeline({
  moduleName: string
  recordId: string
  perPage: number
  pageToken: string
})
```

### Files

```javascript
// Get file details
zoho.files.get({
  id: string
})

// Upload a file
zoho.files.upload({
  filePath: string
  isImage: boolean
})
```

## Contributing

We welcome contributions to `zoho-library`. Please feel free to contribute by opening issues or submitting pull requests.

## License

`zoho-library` is [MIT licensed](https://opensource.org/license/mit).
