import React, { useEffect, useRef } from 'react';
import { CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import Image from 'next/image';
interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface MessageListProps {
    messages: Message[];
    isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // 当消息列表更新时，滚动到底部
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <List sx={{ flexGrow: 1, overflow: 'auto', padding: '10px' }}>
            {messages.map((message, index) => (
                <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <Image
                                src={message.sender === 'user' ? '/man-user-circle-icon.png' : '/chatgpt-icon.png'} // 引用 public 目录下的图片
                                alt={message.sender === 'user' ? 'User Avatar' : 'ChatGPT Avatar'}
                                width={40}   // 设置宽度
                                height={40}  // 设置高度
                            />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body1"
                                color={message.sender === 'user' ? 'primary' : 'secondary'}
                            >
                                {message.sender === 'user' ? 'You' : 'ChatGPT'}
                            </Typography>
                        }
                        secondary={<Typography variant="body2">{message.text}</Typography>}
                    />
                </ListItem>
            ))
            }
            {isTyping && (
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <Image
                                src={'/chatgpt-icon.png'} // 引用 public 目录下的图片
                                alt={'ChatGPT Avatar'}
                                width={40}   // 设置宽度
                                height={40}  // 设置高度
                            />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body1"
                                color={'secondary'}
                            >
                                {'ChatGPT'}
                                <CircularProgress size={12} sx={{ ml: 1 }} color="inherit" />
                            </Typography>
                        }
                    />
                </ListItem>
            )}
            {/* 用于保持滚动到列表底部 */}
            <div ref={bottomRef} />
        </List >
    );
};

export default MessageList;
