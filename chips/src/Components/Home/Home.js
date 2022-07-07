import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [friendName, setFriendName] = useState({
    friendname: "",
  });
  const [friend, setfriend] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handelChange = (e) => {
    const { value, name } = e.target;
    setFriendName({
      ...friendName,
      [name]: value,
    });
  };
  const handelChange1 = (e) => {
    setText(e.target.value);
    let filteredData = [];
    if (text.length > 0) {
      filteredData = friend.filter((str) => {
        return str.includes(text);
      });
      setSuggestions(filteredData);
    }
    // else if (text.length === 0) {
    //   setSuggestions([]);
    // }
  };

  //   const validated = () => {
  //     let validation = friendName.friendname.split(" ");
  //     const newValue = validation.map((value) => {
  //       return value[0].toUpperCase() + value.substring(1);
  //     });
  //     return newValue.join(" ");
  //   };

  const handelClick = (e) => {
    // validated();

    e.preventDefault();
    if (!friendName.friendname) {
      alert("Please add a name to save");
    } else {
      axios
        .post("http://localhost:3004/addfriend", friendName)
        .then((res) => {
          console.log("Data Added");
        })
        .catch((err) => {
          console.log("Error Occured in Adding in Db");
        });
    }
    setFriendName({
      friendname: "",
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3004/getfriend")
      .then((res) => {
        const allnames = res.data.map((item) => {
          return item.friendname;
        });
        console.log("all", allnames);
        setfriend(allnames);
      })
      .catch((err) => {
        console.log("Error occured in getting data from db");
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <h1>Create Chips</h1>
          <h3>Add your friend to Database</h3>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            value={friendName.friendname}
            name="friendname"
            onChange={handelChange}
          />
          <button className="btn btn-primary" onClick={handelClick}>
            Add Friend
          </button>
        </div>
        <br></br>
        <div>{text}</div>
        <div className="card">
          <input
            type="text"
            class="form-control"
            id="inputEmail"
            value={text}
            onChange={handelChange1}
          />
          {suggestions.map((item) => {
            return <div>{item}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
