require('dotenv').config()
const path = require('path')
const { ZohoCRM } = require('../dist/index')

const zoho = new ZohoCRM({
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
})

async function getOneCandidate() {
  const candidate = await zoho.records.getOne({
    moduleName: 'Candidates',
    recordId: '5905444000008108001',
    fields: ['id', 'Candidate_First_Name', 'Name'],
  })

  console.log('GET ONE CANDIDATE:', candidate.data)
  console.log('------------------------------')
}

async function getCandidates() {
  const candidates = await zoho.records.getAll({
    moduleName: 'Candidates',
    ids: ['5905444000008108001', '5905444000008068003', '5905444000008048021'],
    fields: ['id', 'Candidate_First_Name', 'Name'],
  })

  console.log('GET 3 CANDIDATES BY ID:', candidates.data)
  console.log('------------------------------')
}

async function searchCandidates() {
  try {
    const candidate = await zoho.records.search({
      moduleName: 'Candidates',
      email: 'pedrob@resorsi.com',
      fields: ['id', 'Candidate_First_Name', 'Name', 'Email'],
      // phone: '+541159826671',
      // criteria: [
      //   'Interview_Date:less_than:2024-02-20',
      //   'Personal_Interview_Status:not_equal:Passed',
      //   'Personal_Interview_Status:not_equal:Fail',
      // ],
    })

    console.log('GET CANDIDATE BY EMAIL:', candidate.data)
    console.log('------------------------------')
  } catch (err) {
    console.error(err)
  }
}

async function createCandidates() {
  try {
    const candidate = {
      Candidate_First_Name: 'Tomas',
      Email: 'salinatest@gmail.com',
      Name: 'SalinaTEST',
    }

    const candidate2 = {
      Candidate_First_Name: 'Franco',
      Email: 'francotest@gmail.com',
      Name: 'SalinaTEST2',
    }

    const createdCandidate = await zoho.records.create({
      moduleName: 'Candidates',
      data: [candidate, candidate2],
    })

    console.log('CREATE CANDIDATE:', createdCandidate.data)
    console.log('------------------------------')
  } catch (err) {
    console.error(err)
  }
}

async function updateCandidate() {
  try {
    const updated = await zoho.records.update({
      moduleName: 'Candidates',
      recordId: '5905444000008150003',
      data: {
        Candidate_First_Name: 'Tomasssss',
        Desired_Role: 'Frontend Developer',
      },
    })

    console.log(updated.data)
  } catch (err) {
    console.error(err)
  }
}

async function bulkUpdateCandidates() {
  const updates = await zoho.records.bulkUpdate({
    moduleName: 'Candidates',
    data: [
      {
        id: '5905444000008150003',
        Candidate_First_Name: 'Tomasssss',
        Desired_Role: 'UI Designer',
      },
      {
        id: '5905444000008165010',
        Candidate_First_Name: 'Francooooo',
        Desired_Role: 'Backend Developer',
      },
    ],
  })

  console.log(updates.data)
}

async function deleteCandidates() {
  const deleted = await zoho.records.delete({
    moduleName: 'Candidates',
    ids: ['5905444000008165010', '5905444000008150003', '5905444000008154014'],
  })

  console.log(deleted.data)
}

async function upsertCandidates() {
  const updated = await zoho.records.upsert({
    moduleName: 'Candidates',
    data: [
      {
        Name: 'SalinaTEST',
        Desired_Role: 'Data Science',
      },
      {
        Name: 'SofiaTEST',
        Email: 'sofiatest@gmail.com',
        Candidate_First_Name: 'Sofia',
        Desired_Role: 'Data Science',
      },
    ],
  })

  console.log(updated.data)
}

async function getDeletedCandidates() {
  const deletedRecords = await zoho.records.getDeleted({
    moduleName: 'Candidates',
    type: 'all',
  })

  console.log(deletedRecords.data)
}

async function uploadFile() {
  const cvPath = path.join(__dirname, './CV_Tomas_Salina.pdf')
  const upload = await zoho.files.upload({
    filePath: cvPath,
  })

  console.log(upload.data)
}

async function test() {
  // await getOneCandidate()
  // await getCandidates()
  // await searchCandidates()
  // await createCandidates()
  // await updateCandidate()
  // await bulkUpdateCandidates()
  // await deleteCandidates()
  // await upsertCandidates()
  // await getDeletedCandidates()
  // await uploadFile()
}

test()
