import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';

// Styled dot for typing indicator
const Dot = styled('div')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#888', // Grey color for dots
  margin: '0 2px',
  animation: 'blink 1.4s infinite both',
  '@keyframes blink': {
    '0%, 20%, 50%, 80%, 100%': {
      opacity: 0,
    },
    '40%': {
      opacity: 1,
    },
  },
});

const TypingIndicator = () => {
  return (
    <Tooltip title="Typing...">
      <IconButton>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dot />
          <Dot />
          <Dot />
        </div>
      </IconButton>
    </Tooltip>
  );
};

export default TypingIndicator;
