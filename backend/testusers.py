"""
Run once to create the database tables and insert test users.

Usage:
    uv run python testusers.py
"""

import bcrypt

from database import Base, engine, SessionLocal
from models import User

import argparse


def seed(reset_passwords: bool = False):
    # Create all tables defined by Base subclasses (just 'users' for now).
    # If the table already exists, this is a no-op — it won't drop/recreate it.
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    test_users = [
        {"email": "lawton@example.com", "password": "testpass123"},
    ]

    try:
        for user_data in test_users:
            # Check if user already exists so the script is safe to re-run
            existing = db.query(User).filter(User.email == user_data["email"]).first()
            if existing and not reset_passwords:
                print(f"  Skipped {user_data['email']} (already exists)")
                continue
            elif existing and reset_passwords:
                existing.hashed_password = bcrypt.hashpw(
                    user_data["password"].encode(), bcrypt.gensalt()
                ).decode()
                db.add(existing)
                print(f"  Reset password for {user_data['email']}")
                continue

            user = User(
                email=user_data["email"],
                hashed_password=bcrypt.hashpw(
                    user_data["password"].encode(), bcrypt.gensalt()
                ).decode(),
            )
            db.add(user)
            print(f"  Added {user_data['email']}")

        db.commit()
        print("\nDone! Users seeded successfully.")
    except Exception as e:
        db.rollback()
        print(f"\nError: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed the database with test users.")
    # bool arg to reset passwords of existing users to the test password
    parser.add_argument(
        "--reset-passwords",
        action="store_true",
        help="Reset passwords of existing users to the test password",
    )
    args = parser.parse_args()
    seed(args.reset_passwords)
