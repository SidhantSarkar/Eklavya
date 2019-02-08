const express=require('express');
const app=express();



app.use('/',express.static(__dirname));



app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/camera.html')
})

// 404 if no other route
app.use(function (req, res) {
  // res.status(404).sendFile(__dirname+'/404.html');
  res.send('NOT FOUND')
})

const ip = require("ip"); // gets local IP
var port = process.env.PORT || 8000

app.listen(port, function() {
	console.log('Running now on ' + ip.address() + ":" + port);
});
