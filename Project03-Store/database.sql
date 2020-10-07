CREATE TABLE "produtos" (
  "id" SERIAL PRIMARY KEY,
  "categoria_id" int UNIQUE,
  "usuario_id" int UNIQUE,
  "nome" text NOT NULL,
  "descricao" text NOT NULL,
  "old_preco" int,
  "preco" int NOT NULL,
  "quantidade" int DEFAULT 0,
  "status" int,
  "created_at" timestamp DEFAULT 'now()',
  "update_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "categorias" (
  "id" SERIAL PRIMARY KEY,
  "nome" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "nome" text,
  "path" text NOT NULL,
  "produto_id" int UNIQUE
);

ALTER TABLE "produtos" ADD FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id");

CREATE TABLE "usuarios"(
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" int UNIQUE NOT NULL,
  "cep" text,
  "adress" text,
  "created_at" timestamp DEFAULT 'now()',
  "update_at" timestamp DEFAULT 'now()' 
);

ALTER TABLE "produtos" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id");

-- procedures
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
BEGIN
	SET timezone='America/Recife';
	NEW.update_at= NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--gatilho de updated_at produtos
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON produtos
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


--gatilho de updated_at 
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

ALTER TABLE usuarios ADD COLUMN reset_token text;
ALTER TABLE usuarios ADD COLUMN reset_token_expires text;