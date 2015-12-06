Trio.Module.import([
	'./src/resources/ViewConfig/ViewConfig.js'
]).and.export(function(ViewConfig) {
	return {
		ViewConfig: ViewConfig
	};
});