CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TMP", "Firearms", 10000.00, 1),
  ("Striker", "Firearms", 43000.00, 1),
  ("Red9", "Firearms", 14000.00, 1),
  ("Matilda", "Firearms", 70000.00, 1),
  ("Killer7", "Firearms", 77700.00, 1),
  ("Scope", "Attachments", 8000.00, 5),
  ("Stock", "Attachments", 4000.00, 5),
  ("TacVest", "Equipment", 60000.00, 1),
  ("Spray", "Healing Items", 5000.00, 99),
  ("Map", "Miscellaneous", 9000.00, 3);