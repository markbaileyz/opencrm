
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MessageItem from "./MessageItem";

const MessageList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MessageItem
            name="Sales Team"
            message="Updated leads report for Q3 available"
            time="10m ago"
            unread
          />
          <MessageItem
            name="Support Agent"
            message="Question about subscription for Johnson, T."
            time="32m ago"
            unread
          />
          <MessageItem
            name="Front Desk"
            message="New meeting request from Davis Corp"
            time="1h ago"
          />
          <MessageItem
            name="Marketing Team"
            message="Follow-up notes from today's campaign review"
            time="3h ago"
          />
          <MessageItem
            name="Sarah (Client)"
            message="Thank you for the great service yesterday!"
            time="1d ago"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageList;
