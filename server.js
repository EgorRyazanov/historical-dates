const express = require('express');
const { resolve } = require('node:path');

const app = express();
const PORT = 3000;

app.use(express.static('./build'));

app.get('/*', (_, res) => res.sendFile(resolve('build', 'index.html')));

app.listen(PORT, () => {
	console.log(`server is running on ${PORT}`);
});
