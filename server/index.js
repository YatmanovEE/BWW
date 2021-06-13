let express = require('express');
let app = express();
let config = require('config');
let path = require('path');
const PORT = config.get('server.port') ?? 5000;
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'build', 'client', 'index.html')
		);
	});
}
app.listen(PORT, () => {
	console.log(`server is started on port ${PORT}`);
});
