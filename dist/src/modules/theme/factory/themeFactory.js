Trio.Module.export(function() {
	var ThemeFactory = Trio.Factory.extend({
		initialize: function() {
			this.sync('ViewConfig', function(d) {
				if (d && d.attributes) {
					var theme = d.attributes.theme;
					this.theme = theme;
					this.updateCSSVariables(theme);
				}
			}.bind(this))
		},
		updateCSSVariables: function(theme) {
			Trio.Stylizer.registerVariable('base-color', theme.baseColor);
			Trio.Stylizer.registerVariable('layout-color', theme.layoutColor);
			Trio.Stylizer.registerVariable('theme-color', theme.themeColor);
			this.broadcast('theme:update');
		}
	});

	return ThemeFactory;
});