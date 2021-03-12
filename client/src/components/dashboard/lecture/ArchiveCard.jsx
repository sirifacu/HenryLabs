import React from 'react';
import { Container, ListItem, ListItemAvatar, Avatar, ListItemText, Link } from '@material-ui/core';
import { archiveCardStyles } from './styles';

const ArchiveCard = ({ file, icon }) => {
    const styles = archiveCardStyles();

    return (
        <Container key={file.id} >
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                    primary={`${file.name}.${file.extension}`}
                    secondary={
                        <Link
                            className={styles.link}
                            href={file.url} 
                            download
                            rel="noreferrer" 
                            target="_blank" 
                            color="inherit" 
                            onClick={(e) => e.preventDefault}
                        >
                            Descargar
                        </Link>
                    }
                />
            </ListItem>
        </Container>
    );
};

export default ArchiveCard;
