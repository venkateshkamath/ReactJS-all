import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    setShowAddFriend((s) => !s);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    console.log(friend, selectedFriend);
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) => {
        if (friend.id === selectedFriend.id) {
          return { ...friend, balance: value + friend.balance };
        } else return friend;
      })
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend ? <FormAddFriend onAddFriend={handleAddFriend} /> : null}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((el) => {
        return (
          <Friend
            key={el.id}
            friend={el}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  console.log(isSelected);
  return (
    <li className={isSelected && "selected"}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          Your friend {friend.name} owes you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even. </p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [image, setImage] = useState("https://i.pravatar.cc/48?u");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID(); //generate a unique ID
    const newFriend = {
      image: `${image}=${id}`,
      name,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);
    setImage("https://i.pravatar.cc/48?u");
    setName("");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🧑Friend image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoPaid, setWhoPaid] = useState("friend");
  const friendsExpense = bill ? bill - paidByUser : "";

  function handleSubmit(e) {
    console.log("SUBMITTED");
    e.preventDefault();
    if (!bill || !paidByUser) return;
    const balanceValue = whoPaid === "user" ? friendsExpense : -paidByUser;
    console.log(balanceValue);
    onSplitBill(balanceValue);
  }

  return (
    <form className="form-split-bill">
      <h2>Split Bill with {selectedFriend.name}</h2>
      <label>🤑 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>👨 Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>🧑{selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={friendsExpense} />
      <label>😅 Who is paying?</label>
      <select value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button onClick={handleSubmit}>Split Bill</Button>
    </form>
  );
}
