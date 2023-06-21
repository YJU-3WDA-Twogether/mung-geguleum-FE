import React from 'react';
import BestPage from "../pages/BestPage";
import MusicPage from "../pages/MusicPage";
import StoriesPage from "../pages/StoriesPage";
import RemakePage from "../pages/RemakePage";
import MyPage from "../pages/MyPage";
import SearchPage from "../pages/SearchPage";

function PostController({ PostName, handlePostClick,selectedPostUno,MainClose,searchQuery,setSearchQuery}) {
    let page;

    if(searchQuery.length > 0){
        PostName='Search';
    }

    switch (PostName) {
        case 'Best':
            page = <BestPage handlePostClick={handlePostClick} />;
            break;
        case 'Music':
            page = <MusicPage handlePostClick={handlePostClick} />;
            break;
        case 'Stories':
            page = <StoriesPage handlePostClick={handlePostClick} />;
            break;
        case 'Remake':
            page = <RemakePage handlePostClick={handlePostClick} />;
            break;
        case 'My':
            page = <MyPage handlePostClick={handlePostClick} selectedPostUno={selectedPostUno} MainClose={MainClose}/>;
            break;
        case 'Search':
            page = <SearchPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} handlePostClick={handlePostClick} selectedPostUno={selectedPostUno}/>;
            break;
    }

    return page;
}

export default PostController;
