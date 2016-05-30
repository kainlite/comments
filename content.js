(function () {
	var populateStorageAndFireTasks = function() {
		initialState = {
			Config: {
				autoread_messages:			false,
				autoread_events:				false,
				autoread_notifications: false,
				read_forum_notifications: true,
			}
		};

		chrome.storage.sync.get('Config', function(config) {
			if (!(Object.getOwnPropertyNames(config).length > 0)) {
				chrome.storage.sync.set(initialState, function() {
					console.log("Saved initial state...");
					Config = initialState;
				})
			} else {
					Config = config['Config'];
			}

			go(Config);
		});
	};

	var injectScripts = function (scriptName) {
		document.addEventListener("DOMContentLoaded", function () {
			contentBody = document.getElementById("contentBody");
			contentBody.addEventListener("load", function () {
				rawContent = contentBody.contentDocument.getElementById("rawContent");
				if (rawContent) {
					var s = document.createElement("script");
					s.src = chrome.extension.getURL(scriptName);
					s.onload = function() {
						this.parentNode.removeChild(this);
					};

					(document.head||document.documentElement).appendChild(s);
				}
			});
		});
	};

	var go = function (Config) {
		// First inject utilities
		injectScripts("inject_scripts.js");

		// Maybe we can refactor this later, as of today it's not worth the time...
		if (Config['autoread_messages'] === true) {
			// TODO: Implement autoread_messages.js
			console.log("Injecting autoread_messages");
			// injectScripts("autoread_messages.js");
		}

		if (Config['autoread_events'] === true) {
			// TODO: Implement autoread_events.js
			console.log("Injecting autoread_events");
			// injectScripts("autoread_events.js");
		}

		if (Config['autoread_notifications'] === true) {
			// TODO: Implement autoread_notifications.js
			console.log("Injecting autoread_notifications");
			// injectScripts("autoread_notifications.js");
		}

		if (Config['read_forum_notifications'] === true) {
			console.log("Injecting read_forum_notifications");
			injectScripts("read_forum_notifications.js");
		}
	}

	populateStorageAndFireTasks();
})();
