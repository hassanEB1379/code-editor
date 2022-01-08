import {
   faAlignJustify,
   faArrowRight,
   faBan,
   faCheckCircle,
   faExclamationCircle,
   faPenAlt,
   faPlay,
   faSave,
   faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// This file export useful icons

export const CloseIcon = props => <FontAwesomeIcon {...props} icon={faTimes} />;

export const ClearIcon = props => <FontAwesomeIcon {...props} icon={faBan} />;

export const WarningIcon = props => (
   <FontAwesomeIcon
      {...props}
      color="var(--warning)"
      icon={faExclamationCircle}
   />
);

export const ErrorIcon = props => (
   <FontAwesomeIcon
      {...props}
      color="var(--error)"
      icon={faExclamationCircle}
   />
);

export const SuccessIcon = props => (
   <FontAwesomeIcon {...props} color="var(--success)" icon={faCheckCircle} />
);

export const EditIcon = props => (
   <FontAwesomeIcon {...props} size="sm" icon={faPenAlt} />
);

export const MenuIcon = props => (
   <FontAwesomeIcon {...props} icon={faAlignJustify} />
);

export const PlayIcon = props => (
   <FontAwesomeIcon {...props} color="var(--success)" icon={faPlay} />
);

export const BackIcon = props => (
   <FontAwesomeIcon {...props} icon={faArrowRight} />
);

export const SaveIcon = props => <FontAwesomeIcon {...props} icon={faSave} />;
