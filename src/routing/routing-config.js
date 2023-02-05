import {
    Route,
    Routes,
} from "react-router-dom";
import NavBar from '../generic-components/navbar';
import RecentPhotos from '../app-components/recent-photos';
import TaggedPhotos from '../app-components/tagged-photos';
import PageNotFound from '../generic-components/page-not-found';

const router = (
    <>
        <NavBar />
        <Routes>
            <Route path="/" element={<TaggedPhotos />} />
            <Route path="/tagged-photos" element={<TaggedPhotos />} />
            <Route path="/recent-photos" element={<RecentPhotos />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
);
export default router; 