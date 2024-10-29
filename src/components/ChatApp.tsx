'use client'
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}
const YOUR_SITE_URL = process.env.YOUR_SITE_URL;
const YOUR_SITE_NAME = process.env.YOUR_SITE_NAME;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);  // 新增状态用于逐字显示
    useEffect(() => {
        // 在应用加载时添加欢迎词
        const welcomeMessage: Message = {
            text: '欢迎来到 ChatGPT UI！有什么我可以帮助您的吗？',
            sender: 'bot',
        };
        setMessages([welcomeMessage]);
    }, []);

    const handleSend = async (text: string) => {
        const newMessage: Message = {
            text: text,
            sender: 'user',
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        try {
            setIsTyping(true);  // 开始输入

            const recentMessages = messages.slice(-15).map((msg) => ({
                role: msg.sender === 'user' ? 'user' : 'bot',
                content: msg.text,
            }));

            recentMessages.push({ role: 'user', content: text });

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
                    "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // "model": "mistralai/mistral-7b-instruct",
                    "model": "mistralai/mistral-7b-instruct:free",
                    "messages": recentMessages
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const botMessageText = data.choices[0].message.content;

            const botMessage: Message = { text: botMessageText, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching response:', error);
            const errorMessage: Message = {
                text: 'Sorry, something went wrong!',
                sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            setIsTyping(false); // 完成逐字显示
        } finally {
            setIsTyping(false);
        }

    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                maxWidth: '800px',  // 限制最大宽度为600px
                margin: '0 auto',   // 居中显示
            }}
        >
            <Typography variant="h4" align="center" sx={{ m: 2 }}>
            </Typography>
            <MessageList messages={messages} isTyping={isTyping} />
            <MessageInput onSend={handleSend} />
        </Box>
    );
};

export default ChatApp;
