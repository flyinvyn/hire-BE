CREATE DATABASE olshop;

CREATE TABLE category (
    id_category INT NOT NULL,
    name_category VARCHAR(255),
    image_category VARCHAR(255),
    PRIMARY KEY(id_category)
);

CREATE TABLE product (
    id_product INT NOT NULL,
    name_product VARCHAR(255),
    price INT,
    stock INT,
    image_product VARCHAR(255),
    rate INT,
    shop_name VARCHAR(255),
    PRIMARY KEY (id_product)
);

CREATE TABLE transactionn (
    id_transaction INT NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    qty INT,
    shipping VARCHAR,
    total_price INT,
    adress VARCHAR,
    id_product INT,
    id_category INT,
    PRIMARY KEY (id_transaction),
    FOREIGN KEY (id_product) REFERENCES product(id_product),
    FOREIGN KEY (id_category) REFERENCES category(id_category)
);

INSERT INTO category(id_category,name_category,image_category)VALUES(
    1,'T-shirt','Tshirt.png'
);

INSERT INTO product(id_product,name_product,price,stock,image_product,rate,shop_name)VALUES(
    1,'men fromal suit',100000,50,'shirt.png',10,'Zalora Cloth'
);

-- INSERT INTO costumer(id_costumer,name_costumer,no_hp,adress)VALUES(
--     1,'Alfin',0812147234,'Jl Tonjong Ganeas'
-- );

INSERT INTO transactionn(id_transaction,qty,shipping,total_price,adress,id_product,id_category) VALUES(
    1,1,'JNT',100000,'Jl Kota Walungan',1,1
);

SELECT * FROM category;
SELECT * FROM product;
-- SELECT * FROM costumer;
SELECT * FROM transactionn;


SELECT transactionn.id_transaction,transactionn.create_date,transactionn.qty,transactionn.shipping,transactionn.total_price,transactionn.adress,product.name_product,product.price,product.stock,product.image_product,product.rate,product.shop_name,
category.name_category,category.image_category FROM transactionn JOIN product ON transactionn.id_product = product.id_product
JOIN category ON transactionn.id_category = category.id_category;
