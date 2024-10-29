'use client'
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}
const OPENROUTER_API_KEY = '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';
const YOUR_SITE_URL = '';
const YOUR_SITE_NAME = '';


const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);  // 新增状态用于逐字显示
    useEffect(() => {
        // 在应用加载时添加欢迎词
        const welcomeMessage: Message = { text: '欢迎来到 ChatGPT UI！有什么我可以帮助您的吗？', sender: 'bot' };
        setMessages([welcomeMessage]);
    }, []);

    const handleSend = async (text: string) => {
        const newMessage: Message = { text, sender: 'user' };
        setMessages([...messages, newMessage]);

        try {
            setIsTyping(true);  // 开始输入
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
                    "messages": [
                        {
                            "role": "user",
                            "content": text
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const botMessageText = data.choices[0].message.content;

            const botMessage: Message = { text: botMessageText, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            // 逐字显示 botMessageText
            displayTypingEffect(botMessageText);
        } catch (error) {
            console.error('Error fetching response:', error);
            const errorMessage: Message = { text: 'Sorry, something went wrong!', sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

    };
    const displayTypingEffect = (text: string) => {
        let index = 0;
        const botMessage: Message = { text: '', sender: 'bot' }; // 初始空文本

        // 逐字更新文本
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                botMessage.text += text.charAt(index);
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = botMessage; // 更新最后一条信息
                    return updatedMessages;
                });
                index++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false); // 完成逐字显示
            }
        }, 20); // 每50ms显示一个字符，可调整速度
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
            </Typography>
            <MessageList messages={messages} />
            {isTyping && (
                <Typography variant="body2" align="center" color="textSecondary">
                    正在输入...
                </Typography>
            )}
            <MessageInput onSend={handleSend} />
        </Box>
    );
};

export default ChatApp;
