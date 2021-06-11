let express = require('express');
let app = express();
let config = require('config');
let path = require('path');
const PORT = config.get('server.port') ?? 5000;
app.use(express.static(path.join(__dirname, '../', 'build')));

app.listen(PORT, () => {
	console.log(`server is started on port ${PORT}`);
});
