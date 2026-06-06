/**
 * Google Apps Script to handle Review Website submissions.
 * Deploy as a Web App with 'Execute as: Me' and 'Who has access: Anyone'.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append row: Timestamp, Mission Rating, Highlights, Cooking Rating, Bhakri Review, Missed Things, User Agent, Page Version
    sheet.appendRow([
      data.submittedAt,
      data.missionRating,
      data.highlights,
      data.cookingRating,
      data.bhakriReview,
      data.missedThings,
      data.userAgent,
      data.pageVersion
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = [
    "Timestamp", 
    "Mission Rating", 
    "Highlights", 
    "Cooking Rating", 
    "Bhakri Review", 
    "Missed Things", 
    "User Agent", 
    "Page Version"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
}
