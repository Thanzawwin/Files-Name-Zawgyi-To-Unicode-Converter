//DOM Func
function _(data){
	return document.querySelector(data);
}


_('#files').addEventListener('input',(e)=>{
	let files = e.target.files;

	for (let i = 0; i < files.length;i++){
		//convet name
		nameConvert(files[i].name,(name)=>{
			//formdata
			createData(files[i], (file) => {
				//server
				sendServer(file,name);
			})
		})
		
	}
})

//Crate FormData
function createData(file, done) {
	let data = new FormData();
	data.append('file', file);

	done(data);
}


//Send Server
function sendServer (file,name){
	const header = {
		headers:{
			'Content-Type':'multipart/form-data'
		}
	}

	axios.post(`/${name}`,file,header)
		.then(({data})=>{
			_('#result').innerHTML += `<li>${data}</li>`;
		})
}


//convert name 
//zawgyi to unicode
let rules = zawgyi;
function nameConvert(name,done){

	rules.forEach(rule =>{
		let from = rule.from;
		let to = rule.to;

		let reg = new RegExp(from, 'g');
		name = name.replace(reg, to);
	})
	done(name);
}
