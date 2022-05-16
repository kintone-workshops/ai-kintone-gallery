// Declares a new type called "kintone"
declare namespace kintone.types {
  //These are fields from our app. 
  //If you add more, make sure to add their field codes here as well. (An image to upload, for example.)
  interface Fields {
    title: kintone.fieldTypes.SingleLineText;
    body: kintone.fieldTypes.MultiLineText;
  }
  // Saved fields are background, default fields in addition to our custom fields above.
  // You can see that "SavedFields" extends "Fields."
  // These usually don't need to be changed.
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    Created_by: kintone.fieldTypes.Creator;
    Updated_by: kintone.fieldTypes.Modifier;
    Updated_datetime: kintone.fieldTypes.UpdatedTime;
    Created_datetime: kintone.fieldTypes.CreatedTime;
    Record_number: kintone.fieldTypes.RecordNumber;
  }
}
