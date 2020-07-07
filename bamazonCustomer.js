var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  inventory();
});

var inventory = function() {

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    var tab = "\t";
    console.log("ItemID\tProduct\tDepartment\tPrice\t# In Stock");
    console.log("--------------------------------------------------------");

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + tab + res[i].product_name + tab +
        res[i].department_name + tab + res[i].price + tab + res[i].stock_quantity);
    }
    console.log("--------------------------------------------------------");



    inquiry(res);
  });
};


var inquiry = function(res) {


    inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "WELCOME STRANGER! WHAT'RE YA BUYIN'? [Type EXIT to leave.]"
  }]).then(function(val) {

    var exists = false;

    for (var i = 0; i < res.length; i++) {

        if (res[i].product_name === val.choice) {
        exists = true;
        var product = val.choice;
        var id = i;

        inquirer.prompt([{
          type: "input",
          name: "quant",
          message: "HOW MANY ARE YA BUYIN'?"
        }]).then(function(val) {

            if ((res[id].stock_quantity - val.quant) >= 0) {

                connection.query(
              "UPDATE products SET stock_quantity='" + (res[id].stock_quantity - val.quant) +
              "' WHERE product_name='" + product + "'",
              function(err, res2) {
                if (err) {
                  throw err;
                }
                console.log("YOUR TOTAL IS " + (res[id].price * val.quant) + " PESETAS.")
                console.log("HEHEHEHEH... THANK YOU!");              
                inventory();
              });
          }
          
          else {
            console.log("NOT ENOUGH STOCK, STRANGER!");
            inquiry(res);
          }
        });
      }
          
      if (val.choice === "EXIT" || val.choice === "exit") {
        console.log("COME BACK ANYTIME.")
        process.exit();
      }
    }

    if (i === res.length && exists === false) {
      console.log("NOT FOR SALE, STRANGER!");
      inquiry(res);
    }
  });
};