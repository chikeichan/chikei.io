Trio.Module.export(function() {
	Trio.Resource.register({
		name: 'ViewConfig',
		initialize: function() {
			this.getConfig();
		},
		interceptRequest: function(req) {
			req.setHeader('X-Parse-Application-Id', 'CQkkRpffa1guYEB1AprsuLXerAsROUZhBQaaEQQ2');
			req.setHeader('X-Parse-REST-API-Key', 'wvcaXvTiKobyawiwOCcgcYYSKEqrvplyOsq8QpNc');
		},
		interceptResponse: function(res) {
			return JSON.parse(res.responseText).results[0];
		},
		setConfig: function(config, cb) {
			this.sendRequest({
				type: 'post',
				url: 'https://api.parse.com/1/classes/viewConfig',
				payload: JSON.stringify(config)
			}, cb);
		},
		getConfig: function() {
			this.sendRequest({
				type: 'get',
				url: 'https://api.parse.com/1/classes/viewConfig'
			}, function(d) {
				this.attributes = d;
				this.hasBeenUpdated();
			}.bind(this));
		}
	})
});
