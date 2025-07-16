# Mini ERP Lite

A *Mini Inventory Management System* built as part of the *AI & Full-Stack Trainee Technical Assessment*.
This project demonstrates my ability to design, develop, deploy, and document a basic *ERP-like module* with scope to grow into AI workflows and ERPNext integration.

---

## 📌 Project Objective

This app helps a small-scale retail business manage:
- 📦 *Products:* Add, update, delete, track stock
- 🏭 *Suppliers:* Add suppliers & associate products
- 💰 *Transactions:* Record purchases & sales, auto-update stock
- 📊 *Dashboard:* Get real-time stock alerts & inventory value
- 📈 *Reports:* Low-stock items, total value, products by supplier

---

## ⚙ Tech Stack

| Layer    | Technology                                |
|----------|-------------------------------------------|
| Frontend | *React.js* + *TailwindCSS* |
| Backend  | *Node.js* + *Express.js* |
| Database | *MongoDB Atlas (Cloud)* |
| Hosting  | *Vercel* (Frontend) / *Render* (Backend)  |
| Bonus    | *AI API (e.g., Together AI)* for reorder suggestions |

---

## 🎥 Walkthrough Video

👉 [Watch the 3–5 min Screen Recording]([https://www.loom.com/share/a68656bee10f48fba5c5cde6ef6b9d11])

---

## 📂 Folder Structure

plaintext
/mini-erp-lite
 ├── /client        → React frontend (Vite + TailwindCSS)
 ├── /server        → Node.js + Express backend (MongoDB)
 └── README.md      → Project overview & instructions
`

## ✅ Key Features

  - *Dashboard:* Product count, stock alerts, total inventory value.
  - *Products Page:* Add, update, delete products.
  - *Suppliers Page:* Add suppliers and link to products.
  - *Transactions Page:* Record sales and purchases, auto-adjust stock.
  - *Reports:* Low stock products, total inventory value, products by supplier.
  - *(Bonus)* AI reorder quantity suggestions.

-----

## 🗂 Database Models

  - *Product:* `name`, `SKU`, `price`, `quantity`, `supplier` (references Supplier, stored as String in current schema).
  - *Supplier:* `name`, `contact`, `products` (array of Strings, likely product names/SKUs).
  - *Transaction:* `product` (references Product ID), `supplier` (references Supplier ID, optional), `quantity`, `type` (`IN`/`OUT`), `date`.

-----

## ⚙ Setup Instructions

1.  **Clone the Repository**

    bash
    git clone [https://github.com/YOUR-USERNAME/mini-erp-lite.git](https://github.com/YOUR-USERNAME/mini-erp-lite.git)
    cd mini-erp-lite
    

2.  **Install Dependencies**

    ```bash
    # Frontend
    cd client
    npm install
    ```

    ```bash
    # Backend
    cd ../server
    npm install
    ```

3.  **Environment Variables**

    Create a `.env` file inside `/server`:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    AI_API_KEY=your_ai_api_key_if_applicable # e.g., for Together AI
    ```

    *Note: If your frontend makes direct API calls, you might need environment variables in your `/client` directory as well, depending on your frontend build tool (e.g., `VITE_APP_BACKEND_URL`).*

4.  **Run Locally**

    ```bash
    # Start backend
    cd server
    npm run dev
    ```

    ```bash
    # Start frontend
    cd ../client
    npm run dev
    ```

---

## ☁ Deployment

* *Frontend:* Deployed on *Vercel*
* *Backend:* Deployed on *Render* (or as *Vercel serverless functions* if integrated with Next.js API routes)
* *Database:* Hosted on *MongoDB Atlas (Cloud)*

---

## 📚 ERPNext Readiness

This app’s structure is designed to adapt into ERP systems like *ERPNext*:

* Replace the Node backend with *Frappe Framework* for ERPNext compatibility.
* Convert Mongo collections to *Doctypes*.
* Utilize ERPNext’s built-in inventory workflows, stock ledger, and user permissions.
* Extend functionalities by integrating with ERPNext modules for accounting, billing, or HR.

---

## 💡 Bonus: AI Suggestion Feature

Integrated with an *AI API (e.g., Together AI)* to:

* Analyze current stock levels and transaction history.
* Suggest optimal reorder quantities for products.
* Potentially forecast inventory trends for better planning.

---

## 🙌 Author

*Jayant Singh Bisht*
Trainee Technical Assessment — AI & Full-Stack
