
#  **Setup Instructions**

![image](https://github.com/user-attachments/assets/6bac4f3c-eed9-43de-98a8-48b679bdd73a)
![image](https://github.com/user-attachments/assets/a25ee4a2-57fa-4a12-804f-6230a46c9ae6)


##  Clone the Repository
```sh
git clone https://github.com/ank646/Expense.git
cd expense
```

##  Install Dependencies

### Backend
```sh
cd backend
npm install
```

### Frontend
```sh
cd frontend
npm install
```

---

##  Configuration

### Backend
1. Create a `.env` file inside the backend folder and add:
   ```env
   
   MONGO_URI=your-mongodb-connection-string
    ```

2. Start the backend server:
   ```sh
   npm start
   ```

### Frontend
1. Create a `.env` file inside the frontend folder:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

2. Start the frontend:
   ```sh
   npm start
   ```

##  Run the Application
1. Start the backend:
   ```sh
   cd backend
   npm start
   ```

2. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```

3. Open http://localhost:3000 in your browser.   

---
