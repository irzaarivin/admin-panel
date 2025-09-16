const xlsx = require('xlsx')

module.exports = async (repositories, helpers, file) => {
  const { response } = helpers
  const { bulkInsert } = repositories.moduleRepositories

  if (!file) return response.invalidData("File tidak ditemukan")

  try {
    const workbook = xlsx.readFile(file.path)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const jsonData = xlsx.utils.sheet_to_json(sheet)

    if (!jsonData.length) return response.invalidData("File kosong atau tidak sesuai format")

    const modules = jsonData.map(row => ({
      title: row.module,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    const inserted = await bulkInsert(modules)

    return response.success(inserted)
  } catch (error) {
    return response.serverError(error)
  }
}
