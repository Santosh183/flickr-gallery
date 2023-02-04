import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-regular-svg-icons'

function Photo({ photo }) {
    /* <a href="/images/dada.jpg" download></a> */

    function createUrl() {
        return '';
    }

    return (
        <div>
            <img src={createUrl} />
            <FontAwesomeIcon icon={faDownload} />
        </div>
    );
}

export default Photo;
