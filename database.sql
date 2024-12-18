create table admins(
	admin_id serial primary key,
    username varchar(50) unique not null,
	email varchar(255) default null,
	password varchar(255) not null,
    role varchar(50) not null check (role in ('administrateur', 'superadmin')),
    privileges JSONB not null default '{}'::jsonb,
    access_rights JSONB not null default '{}'::jsonb,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    updated_at timestamp not null default CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION set_default_privileges()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role = 'communautaire' THEN
        NEW.privileges = '{
		"USER_PRIVILEGES": true,
        "ALLUMNI_PRIVILEGES": false,
        "AMANIUS_PRIVILEGES": false
		}';
        NEW.access_rights = '{
		"USER_RIGHTS": true,
        "ALLUMNI_RIGHTS": false,
        "AMANIUS_RIGHTS": false
		}';
    ELSIF NEW.role = 'ancienIAI' THEN
        NEW.privileges = '{
		"USER_PRIVILEGES": true,
        "ALLUMNI_PRIVILEGES": true,
        "AMANIUS_PRIVILEGES": false,
		}';
        NEW.access_rights = '{
		"USER_RIGHTS": true,
        "ALLUMNI_RIGHTS": true,
        "AMANIUS_RIGHTS": false
		}';
    ELSIF NEW.role = 'amaniens' THEN
        NEW.privileges = '{
		"USER_PRIVILEGES": true,
        "ALLUMNI_PRIVILEGES": true,
        "AMANIUS_PRIVILEGES": true
		}';
        NEW.access_rights = '{
		"USER_RIGHTS": true,
        "ALLUMNI_RIGHTS": true,
        "AMANIUS_RIGHTS": true
		}';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_default_privileges_trigger
BEFORE INSERT ON admins
FOR EACH ROW
EXECUTE PROCEDURE set_default_privileges();





create table users(
	user_id serial primary key,
    username varchar(50) default null,
	email varchar(255) unique not null,
	password varchar(255) not null,
    role varchar(50) not null check (role in ('communautaire', 'ancienIAI', 'amaniens')),
    privileges JSONB not null default '{}'::jsonb,
    access_rights JSONB not null default '{}'::jsonb,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    updated_at timestamp not null default CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION set_default_privileges()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role = 'communautaire' THEN
        NEW.privileges = '{
		"USER_PRIVILEGES": true,
        "ALLUMNI_PRIVILEGES": false,
        "AMANIUS_PRIVILEGES": false
		}';
        NEW.access_rights = '{
		"USER_RIGHTS": true,
        "ALLUMNI_RIGHTS": false,
        "AMANIUS_RIGHTS": false
		}';
    ELSIF NEW.role = 'ancienIAI' THEN
        NEW.privileges = '{
		"USER_PRIVILEGES": true,
        "ALLUMNI_PRIVILEGES": true,
        "AMANIUS_PRIVILEGES": false,
		}';
        NEW.access_rights = '{
		"USER_RIGHTS": true,
        "ALLUMNI_RIGHTS": true,
        "AMANIUS_RIGHTS": false
		}';
    ELSIF NEW.role = 'amaniens' THEN
        NEW.privileges = '{
		"USER_PRIVILEGES": true,
        "ALLUMNI_PRIVILEGES": true,
        "AMANIUS_PRIVILEGES": true
		}';
        NEW.access_rights = '{
		"USER_RIGHTS": true,
        "ALLUMNI_RIGHTS": true,
        "AMANIUS_RIGHTS": true
		}';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_default_privileges_trigger
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE PROCEDURE set_default_privileges();






create table events(
	event_id serial primary key,
    event_name varchar(50) unique not null,
	Description varchar(255) not null,
    visual varchar(255) not null,
    event_date timestamp not null default CURRENT_TIMESTAMP,
    key_words varchar(255) default null,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    updated_at timestamp not null default CURRENT_TIMESTAMP
);


create table testcomment(
	comment_id serial primary key,
    post_id integer not null,
    username varchar(255) default null,
    comment text not null,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    updated_at timestamp not null default CURRENT_TIMESTAMP
);


insert into comtest(comment)values("first comment");



create table comment(
	comment_id serial primary key,
    post_id integer not null,
    username varchar(255) default null,
    comment text not null,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    updated_at timestamp not null default CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
); /*final*/

insert into comment(post_id,username,comment)values($1,$2,$3); /*pour express*/

create table like(
	like_id serial primary key,
    post_id integer not null,
    username varchar(255) default null,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
); /*final*/

insert into likes(post_id,username)values($1,$2); /*pour express*/

create table recommends(
	rec_id serial primary key,
    post_id integer not null,
    rec_sendername varchar(255) default not null,
    rec_username varchar(255) default null,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    updated_at timestamp not null default CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
); /*final*/

insert into recommends(post_id,rec_sendername,rec_username)values($1,$2,$3,$4); /*pour express*/

create table applies(
	aply_id serial primary key,
    post_id integer not null,
    username varchar(255) default not null,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
); /*final*/

insert into applies(post_id,username)values($1,$2); /*pour express*/


create table shares(
	share_id serial primary key,
    post_id integer not null,
    username varchar(255) default not null,
    created_at timestamp not null default CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
); /*final*/

insert into shares(post_id,username)values($1,$2,); /*pour express*/



