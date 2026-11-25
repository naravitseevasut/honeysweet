// Google Sheet: แถวที่ 1 = orderId | time | name | phone | address | items | total | status
function doPost(e){
  const s=SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const d=JSON.parse(e.postData.contents);
  const id="HN"+Utilities.formatDate(new Date(),"Asia/Bangkok","yyMMddHHmmss");
  s.appendRow([id,new Date(),d.name,"'"+d.phone,d.address,JSON.stringify(d.items),d.total,"new"]);
  return ContentService.createTextOutput("ok");
}
function doGet(){
  const v=SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getDataRange().getValues();v.shift();
  const out=v.map(r=>({orderId:r[0],name:r[2],phone:String(r[3]).replace("'",""),address:r[4],items:r[5],total:r[6],status:r[7]}));
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
