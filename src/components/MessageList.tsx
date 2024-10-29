import React, { useEffect, useRef } from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // 当消息列表更新时，滚动到底部
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
            {/* 用于保持滚动到列表底部 */}
            <div ref={bottomRef} />
        </List>
    );
};

export default MessageList;
