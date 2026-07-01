fetch("https://sheetdb.io/api/v1/3k5vdph36v8ej?sheet=" + encodeURIComponent("라이브관제"))
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data[data.length-1], null, 2)))
  .catch(err => console.error(err));
