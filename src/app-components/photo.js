import '../component-styles/photos.css';

function Photo({ photo }) {
    const { server, id, secret } = photo;

    return (
        <div className="image-card">
            <img height="100%" width="100%" src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`} alt={'flickr-pic'} />
        </div>
    );
}

export default Photo;
