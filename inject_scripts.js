var sGet = function(url, data, successMsg) {
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
