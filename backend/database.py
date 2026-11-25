import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "schoolhub")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")


def get_db_connection():
    if DATABASE_URL:
        url = DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return psycopg2.connect(url, cursor_factory=RealDictCursor)

    connection = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        cursor_factory=RealDictCursor
    )
    return connection


def create_database_if_not_exists():
    if DATABASE_URL:
        return
    try:
        # Connect to default postgres DB with autocommit
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname="postgres",
            user=DB_USER,
            password=DB_PASSWORD
        )
        conn.autocommit = True
        cur = conn.cursor()

        # Check if DB exists
        cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s;", (DB_NAME,))
        exists = cur.fetchone()
        if not exists:
            cur.execute(f'CREATE DATABASE "{DB_NAME}";')
            print(f"[DB Setup] Database '{DB_NAME}' created successfully.")
        else:
            print(f"[DB Setup] Database '{DB_NAME}' already exists.")

        cur.close()
        conn.close()
    except Exception as error:
        print(f"[DB Setup Warning] Could not verify/create database '{DB_NAME}': {error}")


def initialize_tables():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    schema_path = os.path.join(base_dir, "schema.sql")
    seed_path = os.path.join(base_dir, "seed.sql")

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # 1. Execute schema.sql
            with open(schema_path, "r", encoding="utf-8") as f:
                schema_sql = f.read()
            cur.execute(schema_sql)
            print("[DB Setup] Schema tables created successfully.")

            # 2. Execute seed.sql
            with open(seed_path, "r", encoding="utf-8") as f:
                seed_sql = f.read()
            cur.execute(seed_sql)
            print("[DB Setup] Seed data inserted successfully.")

        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"[DB Setup Error] Failed to initialize database: {e}")
        raise e
    finally:
        conn.close()


def initialize_tables_if_needed():
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT to_regclass('public.students');")
            result = cur.fetchone()
            table_exists = result and result.get("to_regclass") is not None
        conn.close()

        if not table_exists:
            print("[DB Setup] Tables not found. Initializing database schema and seed data...")
            initialize_tables()
        else:
            print("[DB Setup] Database tables already present.")
    except Exception as e:
        print(f"[DB Setup Warning] Could not verify/initialize tables automatically: {e}")


if __name__ == "__main__":
    print("Initializing SchoolHub PostgreSQL database...")
    create_database_if_not_exists()
    initialize_tables()
    print("Database initialization complete.")

