CREATE DATABASE hire;

-- CREATE TABLE

--     users(

--         id_user VARCHAR PRIMARY KEY NOT NULL,

--         name VARCHAR,

--         email VARCHAR,

--         company VARCHAR,

--         job_desk VARCHAR,

--         no_hp VARCHAR,

--         password VARCHAR

--     );

CREATE TABLE
    worker(
        id_worker VARCHAR PRIMARY KEY NOT NULL,
        name VARCHAR NULL,
        email VARCHAR NULL,
        password VARCHAR NULL,
        phone_number VARCHAR NULL,
        role VARCHAR,
        job_desk VARCHAR NULL,
        domisili VARCHAR NULL,
        work_place VARCHAR NULL,
        description VARCHAR NULL,
        photo VARCHAR NULL,
        verify text not null,
        updated_on timestamp default CURRENT_TIMESTAMP not null
    );

CREATE FUNCTION UPDATE_UPDATED_ON_WORKER() RETURNS 
TRIGGER AS $$ 
	$$ $$ BEGIN NEW.updated_on = now();


RETURN NEW;

END;

$$ language 'plpgsql';

CREATE TRIGGER UPDATE_USERS_UPDATED_ON 
	UPDATE_USERS_UPDATED_ON update_users_updated_on BEFORE
	UPDATE ON worker FOR EACH ROW
	EXECUTE
	    PROCEDURE update_updated_on_users();


create table
    worker_verification (
        id text not null,
        worker_id text,
        token text,
        created_on timestamp default CURRENT_TIMESTAMP not null,
        constraint worker foreign key(worker_id) references worker(id_worker) ON DELETE CASCADE,
        primary key (id)
    )

-- id_skill varchar NULL,

-- id_exp VARCHAR NULL,

-- id_porto VARCHAR NULL,

-- Foreign Key (id_skill) REFERENCES skills (id_skill),

-- Foreign Key (id_exp) REFERENCES experience (id_exp),

-- Foreign Key (id_porto) REFERENCES portofolio (id_porto)

CREATE TABLE
    skills (
        id_skill VARCHAR PRIMARY KEY NOT NULL,
        skill_name VARCHAR,
        id_worker VARCHAR,
        Foreign Key (id_worker) REFERENCES worker (id_worker)
    );

CREATE TABLE
    experience (
        id_exp VARCHAR PRIMARY KEY NOT NULL,
        position VARCHAR,
        company_name VARCHAR,
        work_start VARCHAR,
        work_end VARCHAR,
        description VARCHAR,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_worker VARCHAR,
        Foreign Key (id_worker) REFERENCES worker (id_worker)
    );

CREATE TABLE
    portofolio (
        id_porto VARCHAR PRIMARY KEY NOT NULL,
        apk_name VARCHAR,
        link_repo VARCHAR,
        type VARCHAR,
        photo VARCHAR,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_worker VARCHAR,
        Foreign Key (id_worker) REFERENCES worker (id_worker)
    );

CREATE TABLE
    recruiter (
        rec_id VARCHAR NOT NULL PRIMARY KEY,
        rec_compname VARCHAR(255),
        rec_jobfield VARCHAR(255),
        rec_province VARCHAR(255),
        rec_city VARCHAR(255),
        rec_desc TEXT,
        rec_emailcomp VARCHAR(255),
        rec_phone VARCHAR(255),
        rec_linkedin VARCHAR(255),
        rec_name VARCHAR(255),
        rec_email VARCHAR(255),
        rec_position VARCHAR(255),
        rec_password VARCHAR(255),
        rec_confirmpassword VARCHAR(255),
        rec_photo VARCHAR(255),
        verify text not null,
        updated_on timestamp default CURRENT_TIMESTAMP not null
    );

CREATE FUNCTION UPDATE_UPDATED_ON_USERS() RETURNS TRIGGER 
AS $$ 
	$$ $$ BEGIN NEW.updated_on = now();


RETURN NEW;

END;

$$ language 'plpgsql';

CREATE TRIGGER UPDATE_USERS_UPDATED_ON 
	UPDATE_USERS_UPDATED_ON update_users_updated_on BEFORE
	UPDATE ON recruiter FOR EACH ROW
	EXECUTE
	    PROCEDURE update_updated_on_users();


create table
    users_verification (
        id text not null,
        recruiter_id text,
        token text,
        created_on timestamp default CURRENT_TIMESTAMP not null,
        constraint recruiter foreign key(recruiter_id) references recruiter(rec_id) ON DELETE CASCADE,
        primary key (id)
    )

create table hire(
    id VARCHAR not null,
    offering VARCHAR,
    description TEXT,
    id_worker VARCHAR,
    name VARCHAR,
    email VARCHAR,
    rec_id VARCHAR,
    rec_email VARCHAR,
    rec_compname VARCHAR
);

SELECT
    user_worker.id,
    worker.name,
    worker.job_desk,
    worker.domisili,
    skills.skill_name

SELECT
    transactionn.id_transaction,
    transactionn.create_date,
    transactionn.qty,
    transactionn.shipping,
    transactionn.total_price,
    transactionn.adress,
    product.name_product,
    product.price,
    product.stock,
    product.image_product,
    product.rate,
    product.shop_name,
    category.name_category,
    category.image_category
FROM transactionn
    JOIN product ON transactionn.id_product = product.id_product
    JOIN category ON transactionn.id_category = category.id_category;

SELECT
    worker.*,
    skills.skill_name,
    experience.position,
    experience.company_name,
    experience.work_start,
    experience.work_end,
    experience.description,
    experience.create_at,
    portofolio.apk_name,
    portofolio.link_repo,
    portofolio.type,
    portofolio.photo,
    portofolio.create_at
FROM worker
    JOIN skills ON worker.id_skill = skills.id_skill
    JOIN experience ON worker.id_exp = experience.id_exp
    JOIN portofolio ON worker.id_porto = portofolio.id_porto;

SELECT
    skills.*,
    worker.name,
    worker.job_desk,
    worker.domisili,
    worker.work_place,
    worker.description,
    worker.photo
FROM skills
    JOIN worker ON skills.id_worker = worker.id_worker;

SELECT
    experience.*,
    worker.name,
    worker.job_desk,
    worker.domisili,
    worker.work_place,
    worker.description,
    worker.photo
FROM experience
    JOIN worker ON experience.id_worker = worker.id_worker;

SELECT
    portofolio.*,
    worker.name,
    worker.job_desk,
    worker.domisili,
    worker.work_place,
    worker.description,
    worker.photo
FROM portofolio
    JOIN worker ON portofolio.id_worker = worker.id_worker;

SELECT
    worker.*,
    skills.skill_name
FROM worker
    LEFT JOIN skills ON worker.id_worker = skills.id_worker