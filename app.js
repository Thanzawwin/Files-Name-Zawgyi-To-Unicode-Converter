const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

//init
const app = express();

//file
app.use(fileUpload());

//middleware
app.use(express.json());

//static dir
app.use(express.static(path.join(__dirname, 'public')));

//@Get Index
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname, '/public/index.html'));
})

//@Post Change File
app.post('/:name',(req,res)=>{
	let files = req.files;
	let name = req.params.name;
	
	if(files.file){
		fileMove(files.file,name,(err)=>{
			if(err){
				res.json(err);
			}else{
				res.json(name);
			}
		})
	}else{
		console.log('multi')

	}
})




//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


//file move
function fileMove (file,name,done){
	let url = path.join(__dirname, '/public/output/');
	file.mv(url+name,done)
	
}