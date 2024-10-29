'use client'
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSend = (text: string) => {
        const newMessage: Message = { text, sender: 'user' };
        setMessages([...messages, newMessage]);

        // 模拟Bot回复
        setTimeout(() => {
            const botMessage: Message = { text: `Bot response to: ${text}`, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                maxWidth: '800px',  // 限制最大宽度为600px
                margin: '0 auto',   // 居中显示
                // boxShadow: 1,       // 添加阴影，使界面更有层次感
                // borderRadius: 2,    // 圆角
            }}
        >
            <Typography variant="h4" align="center" sx={{ m: 2 }}>
                chatgpt-demo 演示
            </Typography>
            <MessageList messages={messages} />
            <MessageInput onSend={handleSend} />
        </Box>
    );
};

export default ChatApp;
