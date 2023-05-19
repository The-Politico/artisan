import { useState } from 'react';
import IconButton from '../IconButton';
import ConfirmPublishAlert from '../ConfirmPublishAlert';

export default function PublishButton({ id }) {
  const [showPubilshAlert, setShowPublishAlert] = useState(false);

  return (
    <>
      <IconButton
        iconName="GlobeAltIcon"
        label="Publish"
        onClick={() => setShowPublishAlert(true)}
      />
      <ConfirmPublishAlert
        id={id}
        showPubilshAlert={showPubilshAlert}
        setShowPublishAlert={setShowPublishAlert}
      />
    </>
  );
}
