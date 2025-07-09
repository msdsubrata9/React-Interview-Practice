import React from "react";
import CommentBox from "./CommentBox";

const data = [
  {
    username: "Subrata Saha",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    replies: [
      {
        username: "Dipika Padukon",
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ],
  },
  {
    username: "Elon Musk",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    replies: [
      {
        username: "Dipika Padukon",
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        replies: [
          {
            username: "Dipika Padukon",
            comment:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            replies: [
              {
                username: "Dipika Padukon",
                comment:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                replies: [
                  {
                    username: "Dipika Padukon",
                    comment:
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    replies: [
                      {
                        username: "Dipika Padukon",
                        comment:
                          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                        replies: [
                          {
                            username: "Dipika Padukon",
                            comment:
                              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            username: "Dipika Padukon",
            comment:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
        ],
      },
      {
        username: "Dipika Padukon",
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ],
  },
  {
    username: "Sachin Tendulkar",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

function Comments() {
  return (
    <div>
      <CommentBox data={data} />
    </div>
  );
}

export default Comments;
