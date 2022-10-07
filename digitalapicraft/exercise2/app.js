const http = require("http");
const get_ten_users = require("./helpers/get_ten_users");
const PORT = 3000;


const server = http.createServer(async (req, res) => {
    try{
        //set the request route
        if (req.url === "/users" && req.method === "GET") {
            const users = await get_ten_users();
            const response = users.map(user => {
                return{
                    Name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                    DOB: user.dob.date.split('T')[0],
                    email: user.email
                }
            })
            const response_json = JSON.stringify(response)
            //response headers
            res.writeHead(200, { "Content-Type": "application/json" });
            //set the response
            res.write(response_json);
            //end the response
            res.end();
        }
    
        // If no route present
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Route not found" }));
        }
    }catch(e){
        console.log(e);
    }
});
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});