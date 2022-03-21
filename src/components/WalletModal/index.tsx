import { Box, Dialog, DialogTitle, List, ListItem } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { connectors } from 'utils/connectors';

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

const WalletModal = ({ open, onClose }: WalletModalProps) => {
  const { error, active, activate } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = React.useState<unknown>();
  React.useEffect(() => {
    setActivatingConnector(undefined);
    if (active) {
      onClose();
    }
  }, [active, error]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Connect wallet</DialogTitle>
      <List>
        {Object.entries(connectors).map(([name, connectorData]) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              setActivatingConnector(connectorData.connector);
              activate(connectorData.connector);
            }}
            disabled={!!activatingConnector}>
            <Box sx={{ textAlign: 'center' }}>{connectorData.name}</Box>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default WalletModal;
