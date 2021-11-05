import Header from './Header';
import { Flex } from '../../../ui';
import Footer from './Footer';
import ViewLayout from '../view-layout/ViewLayout';

// context providers
import { PenProvider } from '../contexts/pen-context';
import { ViewLayoutProvider } from '../view-layout/ViewLayout.context';
import { ToggleConsoleProvider } from '../console/ConsoleToggle.context';
import { ConsoleLogsProvider } from '../console/ConsoleMessages-context';
import { SourceUrlProvider } from '../contexts/source-url.context';
import { CommandLineProvider } from '../console/CommandLine-context';
import MultiProvider from '../../../utils/MultiProvider';

const Pen = ({ match }) => {
   const id = match.params.id;

   return (
      <MultiProvider
         providers={[
            <PenProvider id={id} />,
            <ViewLayoutProvider />,
            <ToggleConsoleProvider />,
            <ConsoleLogsProvider />,
            <SourceUrlProvider />,
            <CommandLineProvider />,
         ]}
      >
         <Flex flexDir="column">
            <Header />

            <ViewLayout />

            <Footer />
         </Flex>
      </MultiProvider>
   );
};

export default Pen;
