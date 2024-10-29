import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface MessageInputProps {
    onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <Box sx={{ display: 'flex', p: 2, /* borderTop: '1px solid #ccc' */ }}>
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSend();
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px', // 设置圆角
                    },
                }}
            />
            <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default MessageInput;
