import "./SiteThumbnail.scss";

export default function SiteThumbnail({size="medium", src}) {
    return (
        <div className={`siteThumbnail siteThumbnail--${size}`}>
            {src && <img className="siteThumbnailImage" src={src} alt="" />}
        </div>
    );
}