import { useShowAlert } from './AlertsProvider';

import { ErrorIcon, SuccessIcon, WarningIcon } from '../../ui/icons/icons';

export function useCustomAlert() {
   const showAlert = useShowAlert();

   function showSuccessAlert(msg) {
      showAlert('success', msg, {
         icon: <SuccessIcon size="lg" />,
      });
   }

   function showWarningAlert(msg) {
      showAlert('warning', msg, {
         icon: <WarningIcon size="lg" />,
      });
   }

   function showErrorAlert(msg) {
      showAlert('error', msg, {
         icon: <ErrorIcon size="lg" />,
      });
   }

   // other alert type ...

   return { showSuccessAlert, showWarningAlert, showErrorAlert };
}
