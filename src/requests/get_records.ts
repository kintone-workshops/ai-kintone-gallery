export default async function getRecords() {

  const body = {
    'app': kintone.app.getId(),
    'query': kintone.app.getQuery(),
  };

  const resp = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body
  );
  let recordsArray = [];

  let respRecords = resp.records; // array of records (objects)

  recordsArray = respRecords.map(function (record: { $id: { value: any; }; title: { value: any; }; body: { value: any; }; image: { value: any; }; }) {
    return {
      uniqueKey: record.$id.value, // $id = Automatically generated Record ID
      title: record.title.value,
      body: record.body.value,
      image: record.image.value,
    }
  });

  return recordsArray;
};