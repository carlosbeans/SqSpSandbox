import "./Avatar.scss";
import { Flex } from '@sqs/rosetta-primitives';
import { ActionList } from '@sqs/rosetta-compositions';

export default function Avatar() {
    return (
        <div className="avatarContainer">
            <ActionList.PopOver
                renderTrigger={({ toggleActionListOpen }) => (
                    <div className="avatar" onClick={toggleActionListOpen}></div>
                )}
                position="bottom-right"
            >
                {({ onRequestClose }) => (
                    <Flex as="ul" bg="white" flexDirection="column" py={1}>
                        <ActionList.Item onClick={onRequestClose}>Account Settings</ActionList.Item>
                        <ActionList.Item onClick={onRequestClose}>Duplicate</ActionList.Item>
                        <ActionList.Item onClick={onRequestClose}>Delete</ActionList.Item>
                    </Flex>
                )}
            </ActionList.PopOver>
        </div>
    );
}