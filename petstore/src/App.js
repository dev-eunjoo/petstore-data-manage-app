import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

//Pets function to manage the pet inventory
function Pets() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("Add");
  const [id, setId] = useState("");
  const [keyword, setKeyword] = useState("");

  // fetches pet data from the server
  function fetchPets() {
    if (keyword) {
      searchPet(keyword);
    } else {
      fetch("http://localhost:8000/api/pets")
        .then((res) => res.json())
        .then((result) => {
          setPets(result);
        });
    }
  }
  useEffect(fetchPets, []);

  //add pet data from the server
  function addPet() {
    let x = document.getElementById("alert");
    if (name === "" || description === "" || age === "" || price === "") {
      x.innerHTML = "Please make sure to fill all fields!";
      x.style.color = "red";
    } else {
      x.innerHTML = "";
      const pet = {
        name: name,
        description: description,
        age: age,
        price: price
      };

      axios({
        url: "http://localhost:8000/api/pets",
        method: "POST",
        data: pet
      }).then(() => {
        fetchPets();
      });

      setName("");
      setDescription("");
      setAge("");
      setPrice("");
    }
  }

  //delete pet data from the server using pet id
  function deletePet(id) {
    axios({
      url: "http://localhost:8000/api/pets/" + id,
      method: "DELETE"
    }).then(() => {
      fetchPets();
    });
  }

  //display the input form for editing the pet info
  function editMode(pet_name, pet_id, pet_desc, pet_age, pet_price) {
    setMode("Edit ");
    setName(pet_name);
    setDescription(pet_desc);
    setAge(pet_age);
    setPrice(pet_price);
    setId(pet_id);
    let inputbox = document.getElementById("inputbox");
    inputbox.style.backgroundColor = "rgb(229,246,253)";
    inputbox.style.padding = "20px";
    document.getElementById("editBtn").style.display = "inline";
    document.getElementById("cancleBtn").style.display = "inline";
    document.getElementById("addBtn").style.display = "none";
  }

  //display the input form for adding the pet info
  function addMode() {
    setMode("Add ");
    let inputbox = document.getElementById("inputbox");
    inputbox.style.backgroundColor = "aliceblue";
    inputbox.style.padding = "0";
    setId("");
    setName("");
    setDescription("");
    setAge("");
    setPrice("");
    document.getElementById("alert").innerHTML = "";
    document.getElementById("editBtn").style.display = "none";
    document.getElementById("cancleBtn").style.display = "none";
    document.getElementById("addBtn").style.display = "inline";
  }

  //update pet data from the server using updated pet information
  function updatePet(id) {
    let x = document.getElementById("alert");
    if (name === "" || description === "" || age === "" || price === "") {
      x.innerHTML = "Please make sure to fill all fields!";
      x.style.color = "red";
    } else {
      const pet = {
        name: name,
        description: description,
        age: age,
        price: price
      };

      axios({
        url: "http://localhost:8000/api/pets/" + id,
        method: "PUT",
        data: pet
      }).then(() => {
        fetchPets();
      });

      addMode();
    }
  }

  //search pet data from the server using searching keyword
  function searchPet(keyword) {
    fetch("http://localhost:8000/api/pets/" + keyword)
      .then((res) => res.json())
      .then((result) => {
        setPets(result);
      });

    setKeyword(keyword);
  }

  return (
    <div>
      <div id='header'>
        <div id='info'>
          <h1>Pet Data Inventory</h1>
        </div>
      </div>
      <div id='main'>
        <h2>Search Pet</h2>
        <Box
          component='form'
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete='off'>
          <div>
            <TextField id='outlined-basic' label='Search keyword' variant='outlined' onChange={(e) => searchPet(e.target.value)} size='small' />
          </div>
        </Box>
        <h2 id='mode'>{mode} Pet</h2>
        <div id='alert'></div>
        <div id='inputbox'>
          <Box
            component='form'
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" }
            }}
            noValidate
            autoComplete='off'>
            <div>
              <TextField id='outlined-basic' label='Pet Type' variant='outlined' value={name} onChange={(e) => setName(e.target.value)} size='small' />
              <TextField id='outlined-basic' label='Pet Description' variant='outlined' value={description} onChange={(e) => setDescription(e.target.value)} size='small' />
              <TextField id='outlined-basic' label='Pet Age' variant='outlined' value={age} onChange={(e) => setAge(e.target.value)} size='small' />
              <TextField id='outlined-basic' label='Pet Price' variant='outlined' value={price} onChange={(e) => setPrice(e.target.value)} size='small' />
              <Button size='large' id='addBtn' variant='contained' color='primary' onClick={() => addPet()}>
                Submit
              </Button>
              <Button size='large' id='editBtn' variant='contained' color='primary' onClick={() => updatePet(id)}>
                Edit
              </Button>
              <Button size='large' id='cancleBtn' variant='contained' color='primary' onClick={() => addMode()}>
                Cancle
              </Button>
            </div>
          </Box>
        </div>
        <h2>Pets Data</h2>
        <Table id='table'>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Animal</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Age</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Price (CAD)</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Delete</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Edit</TableCell>
            </TableRow>
            {pets.map((pet) => (
              <TableRow key={pet._id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.description}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>${pet.price}</TableCell>
                <TableCell>
                  <Button variant='contained' value={pet._id} onClick={() => deletePet(pet._id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant='contained' value={(pet._id, pet.animal)} onClick={() => editMode(pet.name, pet._id, pet.description, pet.age, pet.price)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <br /> <br />
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Pets />
    </div>
  );
}

export default App;
