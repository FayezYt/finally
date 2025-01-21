const express = require('express');
const bodyParser = require('body-parser');
const excel = require('exceljs');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 4455;

app.use(express.static('public'));
const corsOptions = {
    origin: '*', // Allow all origins (this is for all devices on the same network)
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};


app.use(cors(corsOptions));

app.use(express.json()); // No need for body-parser if using Express 4.16+

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Example of endpoint to get formatted data from Excel file
app.get('/get-companies', (req, res) => {
    // Path to the Excel file (total.xlsx)
    const filePath = path.join(__dirname, 'data_excel/total.xlsx');

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Get the first sheet's data
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const rawData = xlsx.utils.sheet_to_json(sheet);

    // Format the data as desired based on the new structure
    const companies = rawData.map(row => ({
        name: row['Company Name'],  // Company Name column in Excel
        code: row['Code'],          // Code column in Excel
        location: row['Location'],  // Location column in Excel
        city: row['City'],          // City column in Excel
        employee: row['employee']   // Employee column in Excel
    }));

    // Send the formatted data to the frontend
    res.json(companies);
});

// Example of endpoint to get formatted data from Excel file
app.get('/get-cities', (req, res) => {
    // Path to the Excel file (total.xlsx)
    const filePath = path.join(__dirname, 'data_excel/citys.xlsx');

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Get the first sheet's data
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const rawData = xlsx.utils.sheet_to_json(sheet);

    // Format the data as desired based on the new structure
    const companies = rawData.map(row => ({
        city: row['city'],          // City column in Excel
             
    }));

    // Send the formatted data to the frontend
    res.json(companies);
});

// Example of endpoint to get formatted data from Excel file
app.get('/get-locations', (req, res) => {
    // Path to the Excel file (total.xlsx)
    const filePath = path.join(__dirname, 'data_excel/locations.xlsx');

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Get the first sheet's data
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const rawData = xlsx.utils.sheet_to_json(sheet);

    // Format the data as desired based on the new structure
    const companies = rawData.map(row => ({
        location: row['location'],          // City column in Excel
            
    }));

    // Send the formatted data to the frontend
    res.json(companies);
});

// Function to get the formatted date (MONTH/DAY)
function getFormattedDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
}

app.post('/visit', (req, res) => {
    console.log('Received POST request to /visit');
  
    const { date, companies, worker } = req.body; // Updated destructuring
    console.log('Received data:', { date, companies, worker });

    const visitDate = new Date(date);

    if (isNaN(visitDate.getTime())) {
        console.error('Invalid date format:', date);
        return res.status(400).send('Invalid date format');
    }

    const filename = `${visitDate.getMonth() + 1}_${visitDate.getDate()}_${worker}.xlsx`;

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Visits');

    worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Day', key: 'dayName', width: 15 },
        { header: 'company_code', key: 'code', width: 15 },
        { header: 'company_name', key: 'name', width: 30 },
        { header: 'Notes', key: 'Notes', width: 45 },
        { header: 'startWork', key: 'startWork', width: 15 },
        { header: 'endWork', key: 'endWork', width: 15 }
    ];

    companies.forEach((company) => {
        worksheet.addRow({
            date: getFormattedDate(visitDate),
            dayName: visitDate.toLocaleDateString('en-US', { weekday: 'long' }),
            code: company.code,
            name: company.name,
            Notes: company.Notes,
            startWork: company.startWork,
            endWork: company.endWork
        });
    });

    workbook.xlsx.writeFile(filename)
        .then(() => {
            console.log(`Excel file '${filename}' generated successfully for visits`);
            res.status(200).send(`Excel file '${filename}' generated successfully for visits`);
        })
        .catch(err => {
            console.error('Error generating Excel file for visits:', err);
            res.status(500).send('Error generating Excel file for visits');
        });
});


// Route handler to add current date and day to the Excel file for no work
app.post('/no-work', (req, res) => {
    console.log('Received POST request for no work');

    const { date, worker } = req.body;
    console.log('Received data:', { date, worker });
    const noWorkDate = new Date(date);

    if (isNaN(noWorkDate.getTime())) {
        console.error('Invalid date format:', date);
        return res.status(400).send('Invalid date format');
    }

    const filename = `${noWorkDate.getMonth() + 1}_${noWorkDate.getDate()}_${worker}.xlsx`;

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('No Work');

    // Add column headers
    worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Day', key: 'dayName', width: 15 },
        { header: 'Worker', key: 'worker', width: 20 }
    ];

    // Add current date and day to the Excel file
    worksheet.addRow({
        date: getFormattedDate(noWorkDate), // Format date as MONTH/DAY
        dayName: noWorkDate.toLocaleDateString('en-US', { weekday: 'long' }), // Get day name
        worker: worker
    });
    worksheet.addRow({ date: 'Not going to work today', dayName: '', worker: '' });

    // Save the Excel file
    workbook.xlsx.writeFile(filename)
        .then(() => {
            console.log(`Excel file '${filename}' generated successfully for no work`);
            res.status(200).send(`Excel file '${filename}' generated successfully for no work`);
        })
        .catch(err => {
            console.error('Error generating Excel file for no work:', err);
            res.status(500).send('Error generating Excel file for no work');
        });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
  