import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar,  Container, ListItem, Link, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { AiOutlineFileJpg, AiOutlineFilePdf, AiOutlineFileZip } from 'react-icons/ai'
import { getFilesByLectures, getLecture } from '../../../redux/lectureReducer/lectureAction';
import SeeAllFeedbacksWithFilter from '../feedback/SeeAllFeedbacksWithFilter';
import { lectureDetailStyles } from './styles';

const LectureDetail = props => {
    const { match: { params: { id } } } = props;
    const dispatch = useDispatch();
    const styles = lectureDetailStyles();
    const { module, title, description, videoURL, githubURL } = useSelector(state => state.lectureReducer.lecture);
    const files = useSelector(state => state.lectureReducer.lectureFiles);

    useEffect(() => {
        dispatch(getLecture(id));
        dispatch(getFilesByLectures(id));
    }, [dispatch, id]);

    const extensions = {
        img: ['jpg', 'jpeg', 'png'],
        text: ['docx', 'txt', 'pdf']
    };

    const renderFile = (file, icon) => {
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
        )
    }

    return (
        <Container className={styles.container} >
            <Container className={styles.head} >
                <Container className={styles.title} >
                    <Typography className={styles.titleTypography} >{ title }</Typography>
                </Container>
            </Container>
            <Container className={styles.details} >
                <Typography>Módulo: { module }</Typography>
                <Typography>Video: <a className={styles.link} target='_blank' href={ videoURL } >{ `${videoURL?.slice(0, 21)}...` }</a></Typography>
                { githubURL && <Typography>Repositorio: <a className={styles.link} taget='_blank' href={ githubURL } >{ `${githubURL.slice(0, 20)}...` }</a></Typography> }
            </Container>
            <Container className={styles.description} >
                <Typography>{ description }</Typography>
            </Container>
            { files.filter(({extension}) => extensions.img.includes(extension)).length > 0 && 
                <Container>
                    <Typography>Imágenes: </Typography>
                    <Container>
                        { files.filter(({extension}) => extensions.img.includes(extension))
                            .map(imgFile => renderFile(imgFile, <AiOutlineFileJpg />))
                        }
                    </Container>
                </Container>
            }
            { files.filter(({extension}) => extensions.text.includes(extension)).length > 0 &&
                <Container>
                    <Typography>Archivos de texto: </Typography>
                    <Container>
                        { files.filter(({extension}) => extensions.text.includes(extension))
                            .map(textFile => renderFile(textFile, <AiOutlineFilePdf />))
                        }
                    </Container>
                </Container>
            }
            { files.filter(({extension}) => {
                return !extensions.img.includes(extension) 
                && !extensions.text.includes(extension)
            }).length > 0 &&
                <Container>
                    <Typography>Otros: </Typography>
                    <Container>
                        { files.filter(({extension}) => !extensions.img.includes(extension) 
                                                    || !extensions.text.includes(extension))
                            .map(otherFile => renderFile(otherFile, <AiOutlineFileZip />))
                        }
                    </Container>
                </Container>
            }
            <SeeAllFeedbacksWithFilter lectureId={id}/>
        </Container>
    );
};

export default LectureDetail;
