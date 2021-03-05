const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');



const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {

    if (error) {
      throw error
    }


    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



  const getUserEmail = function (request, response){

  const id = "reagmbk@gmail.com";

  pool.query('SELECT email FROM users WHERE email = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    //return true;
  })
}


const findUserByEmail = (email, response) => 
{     

  pool.query('SELECT email FROM users WHERE email = $1', [email], (error, results) => {
    
    if (error) {
      throw error
    }else{

      return "test";
    }


    // response.status(200).json(results.rows)

});

}


//   const createUser = (request, response) => {

//     console.log(request.body);
//   const { name, email, password } = request.body;

//   if(name, email, password ==''){
//     response.status(400).send("There was a problem registering the user.");

//   }else{

//           var hashedPassword = bcrypt.hashSync('test', 8);


//   pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword], (error, results) => {
    
//   //   if (error) {
//   //     throw error
//   //   }

//   // response.status(201).send(`User added with ID: ${result.insertId}`)

//     if (error) return response.status(500).send("There was a problem registering the user.")
//     // create a token
//     var token = jwt.sign({ id: user._id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });
//     respose.status(200).send({ auth: true, token: token });

//   })

//   }

   
// }


const createUser = (request, response) => {

  const { name, email, password } = request.body;

 //console.log(findUserByEmail(email));
   // console.log(request);
  // console.log(name);


if (!name) {

    response.status(400).send({
      status: 400,
      message: 'The name is required',
    });

  }else if (!email) {

    response.status(400).send({
      status: 400,
      message: 'The email is required',

    });
  } else if (!password) {

    //wrongDataStatus(res, 'The password is required');
     response.status(400).send({
      status: 400,
      message: 'The password is required',
    });


  }else{

      pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password], (error, results) => {
    
    if (error) {
      throw error
    }

   // create a token
    var token = jwt.sign({ id: results.rows[0].id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
   response.status(200).send({ "User added with ID:":results.rows[0].id, "auth": true, "token": token });
  })

   }

  }





const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}



