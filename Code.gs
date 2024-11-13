// Function to fetch all data from the Google Sheet
function getData() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var range = sheet.getRange(1, 1, sheet.getLastRow(), 6); // Fetching first 6 columns and all rows with data
    var data = range.getValues();
    
    // Convert the Sign In and Sign Out times to "HH:mm:ss" format
    for (var i = 0; i < data.length; i++) {
      if (data[i][4]) { // If there's a value in the Sign In column
        var signInTime = new Date(data[i][4]);
        data[i][4] = Utilities.formatDate(signInTime, Session.getScriptTimeZone(), "HH:mm:ss");
      }
      if (data[i][5]) { // If there's a value in the Sign Out column
        var signOutTime = new Date(data[i][5]);
        data[i][5] = Utilities.formatDate(signOutTime, Session.getScriptTimeZone(), "HH:mm:ss");
      }
    }

    return data; // Return data to frontend
  } catch (error) {
    Logger.log("Error fetching data: " + error);
    return [];  // Return an empty array if there is an error
  }
}

// Function to add a new entry to Google Sheets
function addEntryToSheet(fname, lname) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var time = new Date(); // Get current time
    var timeString = Utilities.formatDate(time, Session.getScriptTimeZone(), "HH:mm:ss"); // Format as HH:mm:ss
    
    // Add new entry in the next available row
    sheet.appendRow([fname, lname, "", "", timeString, ""]); // Columns: fname, lname, groupname, standnumber, signin, signout
  } catch (error) {
    Logger.log("Error adding entry: " + error);
  }
}

// Function to handle "Sign In" and update the Sign In time in Google Sheets
function signIn(row) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var time = new Date(); // Get current time
    var timeString = Utilities.formatDate(time, Session.getScriptTimeZone(), "HH:mm:ss"); // Format as HH:mm:ss
    
    // Update the Sign In time for the specific row (column 5 is the "Sign In" column)
    sheet.getRange(row + 1, 5).setValue(timeString);
  } catch (error) {
    Logger.log("Error signing in: " + error);
  }
}

// Function to handle "Sign Out" and update the Sign Out time in Google Sheets
function signOut(row) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var time = new Date(); // Get current time
    var timeString = Utilities.formatDate(time, Session.getScriptTimeZone(), "HH:mm:ss"); // Format as HH:mm:ss
    
    // Update the Sign Out time for the specific row (column 6 is the "Sign Out" column)
    sheet.getRange(row + 1, 6).setValue(timeString);
  } catch (error) {
    Logger.log("Error signing out: " + error);
  }
}

// Function to serve the HTML page
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
