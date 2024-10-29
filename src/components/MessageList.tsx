import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <List sx={{ flexGrow: 1, overflow: 'auto', padding: '10px' }}>
            {messages.map((message, index) => (
                <ListItem key={index} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <Box
                        sx={{
                            bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.300',
                            color: message.sender === 'user' ? 'white' : 'black',
                            p: 2,
                            borderRadius: 2,
                            maxWidth: '70%',
                        }}
                    >
                        <ListItemText primary={message.text} />
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default MessageList;

