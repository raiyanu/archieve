import React, { Component } from "react";
import { Textarea, Button } from "@nextui-org/react";
export class Conversation extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col justify-center items-center  rounded p-2 h-[83vh]">
          {console.log(chatMessage)}{" "}
          <ul className="w-full p-3 overflow-scroll h-full flex flex-col">
            {chatMessage.map((message) => {
              return (
                <li
                  key={message.message_id}
                  className={
                    " p-2  rounded mb-3 max-w-4/5 flex flex-col " +
                    (message.sender_id === me.sender_id
                      ? " ml-auto text-end bg-indigo-700"
                      : " mr-auto text-start bg-purple-900  ")
                  }
                >
                  <h6 className="font-extrabold  inline border-cyan-400 grow-0 shrink-1 underline">
                    {" "}
                    {message.sender_id}
                  </h6>
                  <p>{message.content}</p>

                  <small
                    style={{
                      color: "rgba(255,255,255,.4)",
                      lineHeight: "8px",
                      fontSize: "8px",
                    }}
                  >
                    {formatTimestamp(message.timestamp)}
                  </small>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex  justify-center items-center  rounded p-1 h-auto">
          <Textarea
            key="bordered"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Enter your description"
            minRows="1"
            maxRows="3"
          />{" "}
          <Button color="primary" variant="solid" className="m-1 ml-2">
            Send{" "}
          </Button>
        </div>
      </>
    );
  }
}

export default Conversation;
const formatTimestamp = (timestamp) => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);

  const timeDifference = currentDate - messageDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 300) {
    return "";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (days === 1) {
    return `Yesterday at ${messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (days < 365) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    });
  } else {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};
const me = { sender_id: "ray_forever" };

const chatMessage = [
  {
    message_id: "1",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T13:00:00Z",
    content: "Hey Jaws, how's it going?",
    is_read: true,
    reactions: [
      {
        user_id: "jaws_javid",
        emoji: "👋",
      },
    ],
    mentions: ["jaws_javid"],
  },
  {
    message_id: "2",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T13:15:30Z",
    content: "Hey Ray, I'm doing well, thanks! How about you?",
    is_read: true,
  },
  {
    message_id: "3",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T13:30:45Z",
    content: "I'm good too. Just working on some projects.",
    is_read: false,
    reactions: [
      {
        user_id: "jaws_javid",
        emoji: "💻",
      },
    ],
  },
  {
    message_id: "4",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T13:45:15Z",
    content: "Nice! Anything exciting?",
    is_read: true,
  },
  {
    message_id: "5",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T14:00:00Z",
    content: "I'm currently working on a new web development project.",
    is_read: true,
    reactions: [
      {
        user_id: "jaws_javid",
        emoji: "🚀",
      },
    ],
  },
  {
    message_id: "6",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T14:30:20Z",
    content: "That sounds exciting! What technologies are you using?",
    is_read: false,
  },
  {
    message_id: "7",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T15:00:45Z",
    content: "I'm using React for the frontend and Node.js for the backend.",
    is_read: true,
    reactions: [
      {
        user_id: "jaws_javid",
        emoji: "⚛️",
      },
    ],
  },
  {
    message_id: "8",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T15:30:00Z",
    content: "Cool! Let me know if you need any help or collaboration.",
    is_read: true,
  },
  {
    message_id: "9",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T16:00:00Z",
    content: "Thanks! I appreciate that. How's your day going?",
    is_read: true,
  },
  {
    message_id: "10",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T16:30:20Z",
    content:
      "It's been a productive day so far. Just finished some coding tasks.",
    is_read: false,
    reactions: [
      {
        user_id: "ray_forever",
        emoji: "👏",
      },
    ],
  },
  {
    message_id: "11",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T17:00:45Z",
    content: "Nice! What kind of projects are you working on?",
    is_read: true,
  },
  {
    message_id: "12",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T17:30:00Z",
    content: "Currently working on a mobile app using React Native.",
    is_read: true,
    reactions: [
      {
        user_id: "ray_forever",
        emoji: "📱",
      },
    ],
  },
  {
    message_id: "13",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T18:00:00Z",
    content: "React Native is a great choice! How's the app shaping up?",
    is_read: true,
  },
  {
    message_id: "14",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T18:30:20Z",
    content: "It's coming along well. I'll share a demo with you soon!",
    is_read: false,
  },
  {
    message_id: "15",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T19:00:45Z",
    content: "Looking forward to it! Let me know if you need any feedback.",
    is_read: true,
  },
  {
    message_id: "16",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T19:30:00Z",
    content: "Sure thing! Your feedback is always valuable.",
    is_read: true,
  },
  {
    message_id: "17",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T20:00:00Z",
    content: "By the way, have you tried the new coding challenge on CodeLab?",
    is_read: true,
  },
  {
    message_id: "18",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T20:30:20Z",
    content: "Not yet! I'll check it out tonight. How's it?",
    is_read: false,
  },
  {
    message_id: "19",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T21:00:45Z",
    content: "It's challenging but fun. Give it a shot!",
    is_read: true,
  },
  {
    message_id: "20",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T21:30:00Z",
    content:
      "I'll definitely take on the challenge. Thanks for the recommendation!",
    is_read: true,
  },
  {
    message_id: "21",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T22:00:00Z",
    content: "Any exciting plans for the weekend?",
    is_read: true,
  },
  {
    message_id: "22",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T22:30:20Z",
    content: "Thinking of exploring some new cafes. How about you?",
    is_read: false,
  },
  {
    message_id: "23",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-29T23:00:45Z",
    content:
      "I might catch up on some reading and take a hike. Relaxing weekend ahead!",
    is_read: true,
  },
  {
    message_id: "24",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-29T23:30:00Z",
    content: "Sounds perfect! Enjoy your weekend, Ray!",
    is_read: true,
  },
  {
    message_id: "25",
    sender_id: "ray_forever",
    recipient_id: "jaws_javid",
    timestamp: "2023-12-30T00:00:00Z",
    content: "You too, Jaws! If you discover any cool cafes, let me know.",
    is_read: true,
  },
  {
    message_id: "26",
    sender_id: "jaws_javid",
    recipient_id: "ray_forever",
    timestamp: "2023-12-30T00:30:20Z",
    content: "Absolutely, will do! Have a great one!",
    is_read: false,
  },
];
