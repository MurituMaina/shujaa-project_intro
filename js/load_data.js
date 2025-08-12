// js/load-data.js
async function loadStudentData(callback) {
  try {
    const response = await fetch('data/students_data.xlsx');
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });

    let students = [];
    workbook.SheetNames.forEach(sheet => {
      const blockData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: "", raw: false });
      blockData.forEach(entry => {
        entry["Block"] = sheet; // Add block classification
        students.push(entry);
      });
    });

    callback(students); // Call function with student data
  } catch (error) {
    console.error("Error loading Excel data:", error);
  }
}
