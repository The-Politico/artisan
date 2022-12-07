import IconButton from '../IconButton';
import ConfirmPublishAlert from '../ConfirmPublishAlert';

export default function PublishButton({
  projectSlug,
  showPubilshAlert,
  setShowPublishAlert,
}) {
  return (
    <>
      <IconButton
        iconName="GlobeAltIcon"
        label="Publish"
        onClick={() => setShowPublishAlert(true)}
      />
      <ConfirmPublishAlert
        projectSlug={projectSlug}
        showPubilshAlert={showPubilshAlert}
        setShowPublishAlert={setShowPublishAlert}
      />
    </>
  );
}
