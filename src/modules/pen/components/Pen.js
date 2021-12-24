import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ViewLayout from '../view-layout/ViewLayout';
import { db } from '../../../indexedDB';
import Page404 from '../../../components/404';
import Modal from '../../modal/Modal';
import { useLiveQuery } from 'dexie-react-hooks';
import { initialize, usePenDispatch } from '../contexts/pen-context';

// context providers
import { PenProvider } from '../contexts/pen-context';
import { ViewLayoutProvider } from '../view-layout/ViewLayout.context';
import { ToggleConsoleProvider } from '../../console/contexts/ConsoleToggle-context';
import { ConsoleLogsProvider } from '../../console/contexts/ConsoleMessages-context';
import { SourceUrlProvider } from '../contexts/source-url.context';
import { CommandLineProvider } from '../../console/contexts/CommandLine-context';
import { UnsavedChangesProvider } from '../contexts/unsaved-changes-context';
import MultiProvider from '../../../utils/MultiProvider';
import { ToggleOutputProvider } from '../contexts/toggle-output-context';

const providers = [
   <PenProvider />,
   <UnsavedChangesProvider />,
   <ViewLayoutProvider />,
   <ToggleConsoleProvider />,
   <ConsoleLogsProvider />,
   <SourceUrlProvider />,
   <CommandLineProvider />,
   <ToggleOutputProvider />,
];

// This component receives information from IDB and renders the appropriate response
function PenContent({ content }) {
   const dispatch = usePenDispatch();

   // initialize pen
   useEffect(() => {
      if (content && !content.error) dispatch(initialize(content));
   }, [content, dispatch]);

   // Show the appropriate component if there is no content
   if (!content) return null;
   if (content.error) return <Page404 />;

   return (
      <div className="flex dir-c">
         <Header />
         <ViewLayout />
         <Footer />
         <Modal />
      </div>
   );
}

const Pen = ({ match }) => {
   const id = match.params.id;

   // get pen info from IDB
   const content = useLiveQuery(async () => {
      try {
         return await db.pens.get(Number(id));
      } catch (error) {
         return { error: true, message: 'not-found' };
      }
   });

   return (
      <MultiProvider providers={providers}>
         <PenContent content={content} />
      </MultiProvider>
   );
};

export default Pen;
