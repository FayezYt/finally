const XLSX = require('xlsx');

// Realistic sample company names
const companyNames = [
  "شركة الأمل للتجارة", "مصنع الوفاء للصناعات الغذائية", "مؤسسة النجاح للأدوات المكتبية",
  "شركة المستقبل للتقنيات", "مؤسسة الحياة للتأمين", "شركة المدى للمقاولات",
  "مصنع الشرق للملابس", "مؤسسة الفجر للخدمات اللوجستية", "شركة النور للطاقة",
  "شركة الريان للبرمجيات", "مؤسسة الأفق للاستشارات", "شركة السحاب للاتصالات",
  "مصنع السندس للمنتجات البلاستيكية", "مؤسسة الرؤية للديكور", "شركة الشمس للتسويق الإلكتروني",
  "شركة البحيرة للنقل", "مؤسسة الهدى للتوريدات", "شركة المدينة للتطوير العقاري",
  "مؤسسة الأمل للخدمات المالية", "شركة الإبداع للتصميم"
];

// Sample cities and villages
const cities = ["Nablus", "Ramallah", "Hebron", "Gaza", "Jericho", "Jenin", "Bethlehem", "Tulkarem", "Qalqilya", "Jerusalem"];
const villages = [
  "بيتا", "عورتا", "قباطية", "برقة", "حارس", "زواتا", "كفر قدوم", "بيت أمر", 
  "سلواد", "دير استيا", "سبسطية", "بيت لاهيا", "الزاوية", "بيت فوريك", "بديا", 
  "دير غسانة", "كفر مالك", "بيتللو", "الظاهرية", "عقربا"
];

// Generate 100 sample entries
const companyData = [];
for (let i = 1; i <= 100; i++) {
  companyData.push({
    "Company Name": companyNames[i % companyNames.length],
    "Company Code": `CMP${String(i).padStart(3, '0')}`,
    "City": cities[i % cities.length],
    "Location": villages[i % villages.length]
  });
}

// Convert data to worksheet
const worksheet = XLSX.utils.json_to_sheet(companyData);

// Create a new workbook and add the worksheet
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "CompanyData");

// Export to Excel file
XLSX.writeFile(workbook, "CompanyData.xlsx");

console.log("Excel file 'CompanyData.xlsx' has been created successfully.");
