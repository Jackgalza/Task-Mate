body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  margin: 0;
  padding: 0;
}

.container {
  max-width: 500px;
  background: #fff;
  margin: 40px auto;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

.subtitle {
  text-align: center;
  color: #777;
  margin-bottom: 20px;
}

.task-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.task-input input, .task-input button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
}

.task-input button {
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.task-input button:hover {
  background: #0056b3;
}

.filter {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.filter button {
  border: none;
  background: #eee;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.filter button.active {
  background: #007bff;
  color: #fff;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 12px 16px;
  margin: 4px 0;
  transition: 0.3s;
}

.task-item:hover {
  background: #f0f8ff;
}

.task-item.done {
  text-decoration: line-through;
  color: #999;
  opacity: 0.7;
}

.task-item .info {
  display: flex;
  flex-direction: column;
}

.task-item .details {
  font-size: 0.9em;
  color: #666;
}

.streak {
  color: #ff6b00;
  font-weight: bold;
  font-size: 0.85em;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  transition: 0.3s;
}

.delete-btn:hover {
  transform: scale(1.2);
  color: red;
}
