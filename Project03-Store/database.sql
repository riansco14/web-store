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
