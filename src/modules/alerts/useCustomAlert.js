import { useShowAlert } from './AlertsProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCheckCircle,
   faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

export function useCustomAlert() {
   const showAlert = useShowAlert();

   function showSuccessAlert(msg) {
      showAlert('success', msg, {
         icon: (
            <FontAwesomeIcon size="lg" color="#37F900" icon={faCheckCircle} />
         ),
      });
   }

   function showWarningAlert(msg) {
      showAlert('warning', msg, {
         icon: (
            <FontAwesomeIcon
               size="lg"
               color="#fbc803"
               icon={faExclamationCircle}
            />
         ),
      });
   }

   // other alert type ...

   return { showSuccessAlert, showWarningAlert };
}
