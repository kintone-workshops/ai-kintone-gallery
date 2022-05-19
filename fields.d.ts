// Specifies the type of an top-level object exposed in the global namespace
declare namespace kintone.fieldTypes {
  // SystemFields are boilerplate, fields in addition to our custom fields above.
  // These usually don't need to be changed.
  interface SystemFields {
    $id: Id;
    $revision: Revision;
    Created_by: Creator;
    Updated_by: Modifier;
    Updated_datetime: UpdatedTime;
    Created_datetime: CreatedTime;
    Record_number: RecordNumber;
  }
  //These are fields from our app. 
  //If you add more, make sure to add their field codes here as well. (An image to upload, for example.)
  interface CustomFields extends SystemFields {
    title: SingleLineText;
    body: MultiLineText;
  }
}
