import { useCallback, useEffect } from 'react';
import Header from './Header';
import { Flex } from '../../../ui';
import Footer from './Footer';
import ViewLayout from '../view-layout/ViewLayout';
import { db } from '../../../indexedDB';
import { useIDBFetch } from '../../../hooks/useIDBFetch';
import Page404 from '../../../components/404';

// context providers
import { PenProvider, usePenDispatch } from '../contexts/pen-context';
import { ViewLayoutProvider } from '../view-layout/ViewLayout.context';
import { ToggleConsoleProvider } from '../../console/contexts/ConsoleToggle-context';
import { ConsoleLogsProvider } from '../../console/contexts/ConsoleMessages-context';
import { SourceUrlProvider } from '../contexts/source-url.context';
import { CommandLineProvider } from '../../console/contexts/CommandLine-context';
import { UnsavedChangesProvider } from '../contexts/unsaved-changes-context';
import MultiProvider from '../../../utils/MultiProvider';

const providers = [
   <PenProvider />,
   <UnsavedChangesProvider />,
   <ViewLayoutProvider />,
   <ToggleConsoleProvider />,
   <ConsoleLogsProvider />,
   <SourceUrlProvider />,
   <CommandLineProvider />,
];

// This component receives information from IDB and renders the appropriate response
function PenContent({ id }) {
   const dispatch = usePenDispatch();

   // get pen info from IDB
   const query = useCallback(() => db.pens.get(Number(id)), [id]);
   const { error, pending, response } = useIDBFetch(query);

   useEffect(() => {
      dispatch({ type: 'initialize', payload: response });
   }, [response, dispatch]);

   // show nothing when status is pending
   if (pending) return null;

   // show 404 page if pen not exist
   if (error) return <Page404 />;

   return (
      <Flex flexDir="column">
         <Header />

         <ViewLayout />

         <Footer />
      </Flex>
   );
}

const Pen = ({ match }) => {
   const id = match.params.id;

   return (
      <MultiProvider providers={providers}>
         <PenContent id={id} />
      </MultiProvider>
   );
};

export default Pen;
