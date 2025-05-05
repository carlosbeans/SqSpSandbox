import WebsitePreview from "../components/WebsitePreview/WebsitePreview";
import Button from "../components/Button/Button";
import "../styles/styles.scss";

export default function Websites() {
    return (
        <div className="container">
            <div className="row space-between">
                <h1>Dashboard</h1>
                <Button buttonLabel={"Create Website"} />
            </div>

            <div className="websitesGrid">
                {/* Example 1: WebsitePreview without children */}
                <WebsitePreview />

                {/* Example 2: WebsitePreview with children */}
                <WebsitePreview>
                    <div className="websiteActions">
                        <Button buttonLabel={"Edit"} />
                        <Button buttonLabel={"Delete"} />
                    </div>
                </WebsitePreview>

                {/* Example 3: WebsitePreview with different children */}
                <WebsitePreview>
                    <div className="websiteStatus">
                        <p>Status: Live</p>
                        <p>Visitors: 1,234</p>
                    </div>
                </WebsitePreview>
            </div>
        </div>
    );
}