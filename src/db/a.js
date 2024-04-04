// @ts-nocheck
function getFireStore() {
  var config = {
    project_id: 'ftmpc-63d81',

    private_key: 'AIzaSyAvmbsTuzVwUA-fyRZtfwe5mP8WloX2tCY',

    client_email: 'rafsanamin2020@gmail.com',
  };

  var firestore = FirestoreApp.getFirestore(
    config.client_email,
    config.private_key,
    config.project_id
  );

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getActiveSheet();

  // the following lines depend on the structure of your database

  // specify the document in the Firestore to access by replacing the countries with the name of your database

  const allDocuments = firestore.getDocuments('countries');

  // for each column and row in the document selected

  for (var i = 0; i < allDocuments.length; i++) {
    var myArray = [];
    //initializes the  array to be printed to Google Sheets
    allDocuments[i].fields.forEach((value) => {
      var cities = allDocuments[i].fields[value];

      var cities2 = cities.arrayValue.values;

      var cities3 = [];

      for (var j = 0; j < cities2.length; j++) {
        cities3.push(cities.arrayValue.values[j].stringValue);
      }
      myArray.push(cities3.join());
    });
    sheet.appendRow(myArray);
  }
}
