Trio.Module.import([
	'./src/modules/theme/factory/themeFactory.js'
]).and.export(function(ThemeFactory) {
	var ThemeService = Trio.Service.extend({
		onStart: function() {
			this.factory = new ThemeFactory();
		}
	});

	new ThemeService().start();
});