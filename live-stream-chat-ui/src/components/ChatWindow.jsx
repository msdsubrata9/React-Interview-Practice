import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";

const PHOTO_URL =
  "https://yt4.ggpht.com/6Sb6tgiNw6PWRWuxv_ZMXfQsV6_29NYZQtvUFB2hSaqQl1-lMoCO342aLYATqjCyedpnA7PQgcE=s64-c-k-c0x00ffffff-no-rj";

const CHAT_MESSAGES_LIMIT = 20;

var nameList = [
  "Time",
  "Past",
  "Future",
  "Dev",
  "Fly",
  "Flying",
  "Soar",
  "Soaring",
  "Power",
  "Falling",
  "Fall",
  "Jump",
  "Cliff",
  "Mountain",
  "Rend",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gold",
  "Demon",
  "Demonic",
  "Panda",
  "Cat",
  "Kitty",
  "Kitten",
  "Zero",
  "Memory",
  "Trooper",
  "XX",
  "Bandit",
  "Fear",
  "Light",
  "Glow",
  "Tread",
  "Deep",
  "Deeper",
  "Deepest",
  "Mine",
  "Your",
  "Worst",
  "Enemy",
  "Hostile",
  "Force",
  "Video",
  "Game",
  "Donkey",
  "Mule",
  "Colt",
  "Cult",
  "Cultist",
  "Magnum",
  "Gun",
  "Assault",
  "Recon",
  "Trap",
  "Trapper",
  "Redeem",
  "Code",
  "Script",
  "Writer",
  "Near",
  "Close",
  "Open",
  "Cube",
  "Circle",
  "Geo",
  "Genome",
  "Germ",
  "Spaz",
  "Shot",
  "Echo",
  "Beta",
  "Alpha",
  "Gamma",
  "Omega",
  "Seal",
  "Squid",
  "Money",
  "Cash",
  "Lord",
  "King",
  "Duke",
  "Rest",
  "Fire",
  "Flame",
  "Morrow",
  "Break",
  "Breaker",
  "Numb",
  "Ice",
  "Cold",
  "Rotten",
  "Sick",
  "Sickly",
  "Janitor",
  "Camel",
  "Rooster",
  "Sand",
  "Desert",
  "Dessert",
  "Hurdle",
  "Racer",
  "Eraser",
  "Erase",
  "Big",
  "Small",
  "Short",
  "Tall",
  "Sith",
  "Bounty",
  "Hunter",
  "Cracked",
  "Broken",
  "Sad",
  "Happy",
  "Joy",
  "Joyful",
  "Crimson",
  "Destiny",
  "Deceit",
  "Lies",
  "Lie",
  "Honest",
  "Destined",
  "Bloxxer",
  "Hawk",
  "Eagle",
  "Hawker",
  "Walker",
  "Zombie",
  "Sarge",
  "Capt",
  "Captain",
  "Punch",
  "One",
  "Two",
  "Uno",
  "Slice",
  "Slash",
  "Melt",
  "Melted",
  "Melting",
  "Fell",
  "Wolf",
  "Hound",
  "Legacy",
  "Sharp",
  "Dead",
  "Mew",
  "Chuckle",
  "Bubba",
  "Bubble",
  "Sandwich",
  "Smasher",
  "Extreme",
  "Multi",
  "Universe",
  "Ultimate",
  "Death",
  "Ready",
  "Monkey",
  "Elevator",
  "Wrench",
  "Grease",
  "Head",
  "Theme",
  "Grand",
  "Cool",
  "Kid",
  "Boy",
  "Girl",
  "Vortex",
  "Paradox",
];

function generateRandomNames() {
  var finalName = nameList[Math.floor(Math.random() * nameList.length)];
  return finalName;
}

function ChatWindow() {
  const [messages, setMessages] = useState([]);

  function fetchData() {
    // Make an API call and get the data

    const data = [
      {
        name: generateRandomNames(),
        photo: PHOTO_URL,
        message:
          "This is live streaming chat video in Namaste Frontend system design series.",
      },
    ];

    setMessages((messages) => {
      let newMessageList = [...data, ...messages];
      newMessageList = newMessageList.splice(0, CHAT_MESSAGES_LIMIT);
      return newMessageList;
    });
  }

  function onSendButtonClick(inputValue) {
    setMessages((messages) => {
      let newMessageList = [
        { name: "Subrata Saha", photo: PHOTO_URL, message: inputValue },
        ...messages,
      ];
      return newMessageList;
    });
  }
  useEffect(() => {
    const s = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(s);
  });

  return (
    <div className="chatContainer">
      <div className="messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </div>

      <MessageInput onSendButtonClick={onSendButtonClick} />
    </div>
  );
}

export default ChatWindow;
