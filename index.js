const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
   axios
      .get(req.query.url, { responseType: 'arraybuffer' })
      .then((r) => {
         res.header('Access-Control-Allow-Origin', '*');
         res.send({
            success: true,
            url: req.query.url,
            data: `data:image/png;base64,${Buffer.from(r.data, 'binary').toString('base64')}`,
         });
      })
      .catch(() =>
         res.send({
            success: false,
            url: req.query.url,
            data: null,
         })
      );
});

app.listen(process.env.PORT || 3333);
