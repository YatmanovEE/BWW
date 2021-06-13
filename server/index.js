let express = require('express');
let app = express();
let config = require('config');
let path = require('path');
const PORT = config.get('server.port') ?? 5000;
app.use(express.static(path.join(__dirname, '../', 'build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
});
app.listen(PORT, () => {
	console.log(`server is started on port ${PORT}`);
});
