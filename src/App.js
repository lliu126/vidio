import React from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoList, VideoDetail, VideoItem } from './components';
import styles from './App.module.css';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('')
    }

    onVideoSelect = (video) => {
        this.setState( { selectedVideo: video })
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: `${API_KEY}`,
                q: searchTerm,
            }
        });

        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }

    render () {
    const { selectedVideo, videos } = this.state;
        return (
            <Grid justify="center" container spacing={12}>
                <Grid item xs={12}>
                    <div className={styles.banner}>
                    <section>
                        <h1>Vidio</h1>
                        <p>Watch videos from YouTube&trade;</p>
                    </section>
                    </div>
                    <Grid container spacing={12}>
                        <Grid item xs={12}> 
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
                <div className={styles.footer}/>
            </Grid>
            
        )
    }
}


export default App;