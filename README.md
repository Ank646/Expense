
#  **Setup Instructions**

## **1️⃣ Clone the Repository**
```sh
git clone https://github.com/ank646/Expense.git
cd expense
```

## **2️⃣ Install Dependencies**

### **Backend**
```sh
cd backend
npm install
```

### **Frontend**
```sh
cd frontend
npm install
```

---

## **3️⃣ Configuration**

### **Backend**
1. Create a **`.env`** file inside the **backend** folder and add:
   ```env
   
   MONGO_URI=your-mongodb-connection-string
    ```

2. Start the backend server:
   ```sh
   npm start
   ```

### **Frontend**
1. Create a **`.env`** file inside the **frontend** folder:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

2. Start the frontend:
   ```sh
   npm start
   ```



## **5️⃣ Run the Application**
1. **Start the backend:**  
   ```sh
   cd backend
   npm start
   ```

2. **Start the frontend:**  
   ```sh
   cd frontend
   npm start
   ```

3. Open **http://localhost:3000** in your browser.   

---
