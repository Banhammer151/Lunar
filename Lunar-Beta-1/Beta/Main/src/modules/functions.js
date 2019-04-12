// errors
process.on('uncaughtException', (err) => {
	const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	console.error('Uncaught Exception: ', errorMsg);
	// Always best practice to let the code crash on uncaught exceptions.
	// Because you should be catching them anyway.
	process.exit(1);
});

process.on('unhandledRejection', err => {
	console.error('Uncaught Promise Error: ', err);
});

