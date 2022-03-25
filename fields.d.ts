declare namespace kintone.types {
  interface Fields {
    title: kintone.fieldTypes.SingleLineText;
    body: kintone.fieldTypes.MultiLineText;

    image: kintone.fieldTypes.File;
  }
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
