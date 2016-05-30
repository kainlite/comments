window.tuentiUan = window.tuentiUan || {};

window.tuentiUan.customGet = function(url, data, successMsg) {
	$.ajax({
		type: "GET",
		url: url,
		contentType: "application/json",
		dataType: "xml",
		data: data,
		success: function (result) {
			console.log(successMsg || result);
			return result;
		},
		error: function (result) {
			console.log(result);
			return result;
		}
	})
};

window.tuentiUan.getFromStorage = function(field) {
	var value;

	chrome.storage.sync.get('tuentiUanConfig', function(config) {
		value = config['tuentiUanConfig'][field];
	});

	return value;
};

(function () {

	document.addEventListener("DOMContentLoaded", function () {
		contentBody = document.getElementById("contentBody");
		contentBody.addEventListener("load", function () {
			rawContent = contentBody.contentDocument.getElementById("rawContent");
			if (rawContent) {
				var s = document.createElement("script");
				s.src = chrome.extension.getURL('injected.js');
				s.onload = function() {
					this.parentNode.removeChild(this);
				};

				(document.head||document.documentElement).appendChild(s);
			}
		});


		if (tuentiUan.getFromStorage('read_forum_notifications')) {
			keys = Object.keys(document.getElementById("contentBody").contentDocument.getElementById("rawContent").contentDocument.defaultView.window.messages);

			for (var i = 0, l = keys.length; i < l; i ++) {
				notificationId = keys[i];
				if (notificationId !== "discussionRoot") {
					var url = "https://siglo21.epic-sam.net/Content/Forum/Update.ashx?courseid=" + courseId +"&sectionid=" + sectionId + "&enrollmentid=" + enrollmentId + "&itemid=" + itemId + "&messageid=" + notificationId + "  &actiontype=updateviewed&_dc=14339";

					window.tuentiUan.customGet(
							url,
							{},
							"Message ID: " + notificationId + " readed."
							);
				}
			}
		}
	});
})();
