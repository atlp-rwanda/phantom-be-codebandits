const renderEmail = (link) => {
	const template = `
	  
	  <!DOCTYPE html>
	  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
	  
	  <head>
		  <title></title>
		  <meta charset="utf-8" />
		  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
		  <style>
			  * {
				  box-sizing: border-box;
				  font-family: "Lexend";
			  }
	  
			  body {
				  margin: 0;
				  padding: 0;
				  background-color: #0094e9fb;
				  display: flex;
				  align-items: center;
				  justify-content: center;
				  background-size: cover;
				  background-attachment: fixed;
				  background-repeat: no-repeat;
				  height: 100%;
				  width: 100%;
			  }
	  
			  p {
				  line-height: inherit
			  }
	  
			  a {
				  text-decoration: none;
			  }
	  
			  .reset-button {
				  background-color: rgb(2, 90, 86);
				  color: white;
				  border-radius: 30px;
				  padding: .5rem 2rem;
				  margin: 1rem;
			  }
	  
			  table {
				  padding: 1rem;
				  width: fit-content;
				  margin: 2rem 1rem;
				  background-color: rgba(255, 255, 255, 0.432);
				  border-radius: 10px;
				  justify-content: center;
				  position: relative;
				  margin-top: 50px;
				  z-index: 1;
				  box-shadow: 2px 2px 9px 3px white;
			  }
		  </style>
	  </head>
	  
	  <body>
		  <main>
			  <table>
	  
				  <tr class="password-text">
					  <td>
						  <br>
						  <h1>Password Reset</h1>
					  </td>
					  <td></td>
				  </tr>
				  <tr>
					  <td>
						  <hr>
					  </td>
	  
				  </tr>
				  <tr>
					  <td>
						  <p>You requested a password reset</p><br>
						  <p>Use the link below. If it doesnt work, copy the link to the browser<p>
					  </td>
				  </tr>
				  <tr>
					  <td>
						  <br>
						  <a href="${link}" class="reset-button">RESET MY PASSWORD</a>
						  <br>
					  </td>
				  </tr>
				  <tr>
					  <td>
						  <br>
						  <small>${link}</small>
					  </td>
				  </tr>
				  <tr>
					  <td>
						  <br>
						  <p>This link will expire in <b>20 minutes!</b></P>
					  </td>
				  </tr>
			  </table>
	  
		  </main>
	  
	  </body>
	  
	  </html>
	  `;

	return template;
};

export default renderEmail;
