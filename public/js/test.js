const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file
const filePath = 'total.xlsx';
const workbook = XLSX.readFile(filePath);

// Get the first sheet (you can change the sheet name if necessary)
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = XLSX.utils.sheet_to_json(sheet);

// Store the data as an array of objects
const companies = jsonData.map(row => ({
  name: row['Company Name'],
  code: row['Code'].toString(), // Ensure 'code' is a string if needed
  location: row['Location'],
  day: row['Day']
}));

// Print the companies array
console.log(companies);
