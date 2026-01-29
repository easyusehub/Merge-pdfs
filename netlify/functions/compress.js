const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event, context) => {
  try {
    const ILovePDF_API_KEY = process.env.ILOVEPDF_API_KEY;
    const { fileUrl } = JSON.parse(event.body);

    const formData = new FormData();
    formData.append('task', 'compress');
    formData.append('file', fileUrl);

    const response = await fetch('https://api.ilovepdf.com/v1/compress', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${ILovePDF_API_KEY}` },
      body: formData
    });

    if(!response.ok) throw new Error('ILovePDF API failed');
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ downloadUrl: data.file.url })
    };

  } catch(err) {
    return { statusCode: 500, body: err.toString() };
  }
};
