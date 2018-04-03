const http=require('http');
const url=require('url');
const StringDecoder=require('string_decoder').StringDecoder;

var server=http.createServer((req,res)=>{

  //parsing the url to get parameters from it
  var parsedURL=url.parse(req.url,true);

 //getting the path from parsed url
  var path=parsedURL.pathname;

//getting to know about the http method i.e.GET,POST etc
  var method=req.method.toUpperCase();

//getting the query parmater from url
  var queryStringParams=parsedURL.query;

//geting request headers
  var headers=req.headers;

//the path has been trimmed in order to get the parameters out of path in form of string
  var trimmedPath=path.replace(/^\/+|\/+$/g,'');

/* this part of code is very important as this would help us to get the
  payload from the request and store it in buffer ...........*/
  var decoder=new StringDecoder('utf-8');
  var buffer='';

  //this will store the payload in buffer until there is some data in payload
  req.on('data',(data)=>{
    buffer += decoder.write(data);
  });
  //once the data ends we will output the buffer
  req.on('end',()=>{
    buffer += decoder.end();
    res.end('hlw world\n');

    //this will output the path,method and query objects respectively.
    console.log(`Request received for path:${trimmedPath} through method ${method}
      with query objects as:${JSON.stringify(queryStringParams)}` )

//This will output the received headers
    console.log(`Request received with these headers ${JSON.stringify(headers)}`);

//This will output the payload
    console.log(`Requested payload is ${buffer}`);
  })
});

server.listen(3000,()=>{
  console.log('Listening to port 3000')
})
