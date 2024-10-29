import React, { useEffect, useRef, useState } from 'react';
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

    const [displayedText, setDisplayedText] = useState<string>('');
    const [index, setIndex] = useState<number>(0); // 将 index 转为状态

    useEffect(() => {
        // 当新消息加入时逐字显示最后一条消息
        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            if (latestMessage.sender === 'bot') {
                setDisplayedText(''); // 重置显示文本
                setIndex(0); // 重置 index

                const intervalId = setInterval(() => {
                    setIndex((prevIndex) => {
                        if (prevIndex < latestMessage.text.length) {
                            setDisplayedText(latestMessage.text.slice(0, prevIndex + 1)); // 设置文本为最新进度
                            return prevIndex + 1;
                        } else {
                            clearInterval(intervalId); // 文本显示完毕后清除定时器
                            return prevIndex;
                        }
                    });
                }, 20); // 每 20 毫秒显示一个字
            } else {
                // 如果最后一条消息是用户消息，直接显示完整消息
                setDisplayedText(latestMessage.text);
            }
        }
    }, [messages]);

    useEffect(() => {
        // 当消息列表更新时，滚动到底部
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <List sx={{ flexGrow: 1, overflow: 'auto', padding: '10px' }}>
            {messages.slice(0, -1).map((message, index) => (
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
            {/* 最后一条消息逐字显示 */}
            {messages.length > 0 && (
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <Image
                                src={messages[messages.length - 1].sender === 'user' ? '/man-user-circle-icon.png' : '/chatgpt-icon.png'}
                                alt={messages[messages.length - 1].sender === 'user' ? 'User Avatar' : 'ChatGPT Avatar'}
                                width={40}
                                height={40}
                            />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body1"
                                color={messages[messages.length - 1].sender === 'user' ? 'primary' : 'secondary'}
                            >
                                {messages[messages.length - 1].sender === 'user' ? 'You' : 'ChatGPT'}
                            </Typography>
                        }
                        secondary={<Typography variant="body2">{displayedText}</Typography>}
                    />
                </ListItem>
            )}
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
