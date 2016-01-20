var http = require("http");
var url = require("url");


function start(route, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for" + pathname + "received");

		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data chunk'"+
				postDataChunk + "'.");
		});

		request.addListener("end", function(){
			route(handle,pathname,response,postData);
		});
		/*
		var pathname = url.parse(request.url).pathname;
		console.log("Request for" + pathname+"received.");
		route(handle,pathname,response);*/
		/*
		response.writeHead(200,{"Content-Type" : "text/plain"});
		var content = route(handle, pathname);
		response.write(content);
		response.end();*/
	}
	http.createServer(onRequest).listen(8888);
	console.log("server has started, please check");
}

function upload(){
	console.log("Request handler 'upload' was called");
}

exports.start = start;
exports.upload = upload;