body {
  font-family: Arial, sans-serif;
  background-color: #d7f4d1;
  text-align: center;
  padding: 20px;
}

.status {
  font-size: 20px;
  margin-bottom: 10px;
}

.shops button {
  margin: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
}

#shop-container {
  margin: 15px auto;
  max-width: 600px;
  min-height: 150px;
  border: 2px solid #4e3a28;
  border-radius: 8px;
  background: #f1f9ed;
  padding: 10px;
  text-align: left;
}

#shop-container button {
  margin: 5px 0;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #4e3a28;
  background-color: #e8f0d5;
}

#buy-btn {
  margin: 10px auto 20px;
  padding: 12px 25px;
  font-size: 18px;
  cursor: pointer;
}

.garden {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  gap: 10px;
  justify-content: center;
  margin: 20px auto;
  max-width: 550px;
}

.plot {
  width: 100px;
  height: 100px;
  background-color: #8b5e3c;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  border: 3px solid #4e3a28;
  transition: background-color 0.3s ease;
}

.plot.empty:hover {
  background-color: #a57e53;
}

.plant {
  position: absolute;
  bottom: 10px;
  left: 15px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  transition: transform 0.3s ease;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.master-plant {
  margin-top: 30px;
}

.master-plant button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

