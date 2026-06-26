from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import razorpay
import sqlite3
import time
import os

app = Flask(__name__)
CORS(app)

# ================== RAZORPAY CONFIG ==================
# Set these in terminal:
# export RAZORPAY_KEY_ID="your_key"
# export RAZORPAY_SECRET="your_secret"

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_SECRET = os.getenv("RAZORPAY_SECRET")

razorpay_client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_SECRET)
)

# ================== DATABASE ==================
def get_db():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

# Init DB
with get_db() as db:
    db.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mobile TEXT UNIQUE
        )
    """)
    db.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT,
            user_mobile TEXT,
            total INTEGER,
            status TEXT,
            created_at TEXT
        )
    """)

# ================== PAGE ROUTES ==================
@app.route("/")
def index():
    return render_template("login.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/success")
def success():
    return render_template("success.html")

@app.route("/orders-page")
def orders_page():
    return render_template("orders.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

# ================== API ROUTES ==================

# ---------- LOGIN ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    mobile = data.get("mobile")

    if not mobile:
        return jsonify({"error": "Mobile required"}), 400

    db = get_db()
    db.execute(
        "INSERT OR IGNORE INTO users (mobile) VALUES (?)",
        (mobile,)
    )
    db.commit()

    return jsonify({"success": True})

# ---------- CREATE RAZORPAY ORDER ----------
@app.route("/create-order", methods=["POST"])
def create_order():
    try:
        data = request.get_json()
        amount = int(data.get("amount"))

        order = razorpay_client.order.create({
            "amount": amount * 100,
            "currency": "INR",
            "receipt": f"gm_{int(time.time())}"
        })

        return jsonify(order)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------- SAVE ORDER ----------
@app.route("/save-order", methods=["POST"])
def save_order():
    data = request.get_json()

    db = get_db()
    db.execute(
        """
        INSERT INTO orders (id, user_mobile, total, status, created_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            data.get("order_id"),
            data.get("mobile"),
            data.get("total"),
            data.get("status", "Paid"),
            time.strftime("%Y-%m-%d %H:%M:%S")
        )
    )
    db.commit()

    return jsonify({"success": True})

# ---------- USER ORDERS ----------
@app.route("/orders/<mobile>")
def user_orders(mobile):
    db = get_db()
    rows = db.execute(
        "SELECT * FROM orders WHERE user_mobile=?",
        (mobile,)
    ).fetchall()

    return jsonify([dict(row) for row in rows])

# ---------- ADMIN ORDERS ----------
@app.route("/admin-orders")
def admin_orders():
    db = get_db()
    rows = db.execute("SELECT * FROM orders").fetchall()
    return jsonify([dict(row) for row in rows])

# ================== RUN ==================
if __name__ == "__main__":
    app.run(debug=True)
