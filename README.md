// Google Sheet Code 

// Set the name of the sheet to interact with
var sheetName = 'Sheet1';

// Access the script properties, a way to store and retrieve key-value pairs
var scriptProp = PropertiesService.getScriptProperties();

// Function to run once during the initial setup
function intialSetup () {
  // Get the currently active spreadsheet
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Set the ID of the active spreadsheet as a property with key 'key'
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

// Function to handle HTTP POST requests
function doPost (e) {
  // Get a lock to prevent multiple simultaneous executions
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Try to lock for 10 seconds

  try {
    // Open the spreadsheet using the stored ID
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    
    // Get the sheet with the specified name
    var sheet = doc.getSheetByName(sheetName);

    // Get the headers (column names) of the sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Determine the row number for the new data
    var nextRow = sheet.getLastRow() + 1;

    // Create a new row of data based on the HTTP POST parameters
    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    // Set the values of the new row in the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // Return success response as JSON
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    // Return error response as JSON if an exception occurs
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    // Release the lock, regardless of success or failure
    lock.releaseLock();
  }
}
