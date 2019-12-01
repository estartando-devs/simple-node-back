const express = require('express');
const server = express();

server.use(express.json());


//applying Global middleware
server.use((req,res, next)=>{
	console.time('Request');
	console.log('METHOD', req.method , 'URL' ,req.url , 'BODY' , req.body);
	next();
	console.timeEnd('Request');
})

//function middleware localy...
function checkValidBody(req,res,next){

	if(!req.body.name){
		return res.status(400).json({error: 'User name is required'})
	}

	return next();
}

function checkValidParam(req,res,next){

	const {id} = req.params;
	if(!id){
		return res.status(400).json({error: 'Id is required'});

	}
	else{
		if(id > users.length){
			return res.status(400).json({error:'User does not exist'});
		}	
	}
	return next();
}


//data colection
const users = ['Fredd' , 'Luiz' , 'Maria'];


//endpoints

server.get('/users', (req,res) => {

	return res.json(users)
});

server.get('/users/:id' ,checkValidParam ,  (req,res)=>{

	const { id } = req.params;
	return res.json(users[id]);

})

server.post('/users' ,checkValidBody, (req,res) => {

	const { name } = req.body;
	users.push(name);
	return res.json(users);

})

server.put('/users/:id' ,checkValidBody,checkValidParam ,  (req,res) => {

	const {name} = req.body;
	const {id} = req.params;

	users[id] = name;

	return res.json(users); 
})

server.delete('/users/:id',checkValidParam, (req,res) => {

	console.log('chegou?');
	const {id} = req.params;
	users.splice(id , 1);
	return res.send();

})


server.listen(3000);
